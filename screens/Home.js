import React from 'react';
import {StyleSheet, Text, View, Alert, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//Location
import * as Location from 'expo-location';

// Interactors
import { interactor as getContentInteractor } from '../integration/domain/GetContentInteractor';
import { interactor as getBusinessesInteractor } from './domain/GetBusinessesInteractor';

//Redux 
import * as actions from '../store/index';
import { connect } from 'react-redux';

//Firebase
import { app } from '../src/Config';

//Components
import Card from '../components/RestaurantCard';

class Home extends React.Component{
    state = {
        latitude: null,
        longitude: null,
        status: null,
        isLoading: true,
        dataCountEnd: 10,
        dataCountStart: 0,
    }
    
    saveDataLocally = async (data) => {
        try{
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem('restaurants', jsonData);
        }
        catch(error){
            console.log(error);
        }
    }

    getDataLocally = async () => {
        try{
            const data = await AsyncStorage.getItem('restaurants');
            return data !== null ? JSON.parse(data) : null;
        }
        catch(error){
            console.log(error);
        }
    }

    componentDidMount = async () => {
        //Did User Change Location?
        //Set User's Location Permission
        const { status } = await Location.requestPermissionsAsync();
        if(status !== "granted"){
            Alert.alert("This Application Requires Location Permissions To Function Properly. Please Change Your Permission in Settings");
            this.setState({status: "granted"});
        }
        let location = await Location.getLastKnownPositionAsync();
        this.toLongitudeLatitude(location);

        //Fetch Data then save to redux
        if(this.state.longitude !== null && this.state.latitude !== null && this.getDataLocally() === null){
            if (!this.props.content) {
              const latitude = this.state.latitude;
              const longitude = this.state.longitude;
              Promise
                .all([
                  getContentInteractor(latitude, longitude),
                ]) 
                .then(([content]) => {
                  this.props.storeContent(content);
                })
                .then(() => {
                    this.saveDataLocally(this.props.content);
                })
          }
        }
        //If we have local data, we want to save that local data to redux
        else{
            const data = await this.getDataLocally();
            this.props.storeContent(data);
        }
    }

    //Obtain the latitude and longitude of last known location
    toLongitudeLatitude = (location) => {
        if(location === null || location === undefined){
            return;
        }
        this.setState({latitude: location.coords.latitude});
        this.setState({longitude: location.coords.longitude});
    }

    //Load More entry on flatlist end
    handleLoadMore = () => {
        this.setState({dataCountEnd: this.state.dataCountEnd + 10});
    }
 
    render(){
        if(this.props.content === null){
            return(
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <Text style={styles.header}>Restaurants</Text>
                <FlatList
                    data={getBusinessesInteractor(this.props.content.businesses).slice(0, this.state.dataCountEnd)}
                    extraData={getBusinessesInteractor(this.props.content.businesses)}
                    renderItem={({ item }) =>
                        <Card
                            {...this.props} 
                            name={item.restaurantName} 
                            image={item.image} 
                            location={item.location}
                        />
                    }
                    keyExtractor={(item) => item.restaurantID}
                    onEndReached={this.handleLoadMore}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      content: state.content,
    };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        storeContent: (content) => dispatch(actions.storeContent(content)),
    };
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: '5%',
        marginLeft: '3%'
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
