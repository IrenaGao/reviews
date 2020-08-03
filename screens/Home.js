import React from 'react';
import {StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//Location
import * as Location from 'expo-location';

// Interactors
import { interactor as getContentInteractor } from '../integration/domain/GetContentInteractor';
import { interactor as getBusinessesInteractor } from './domain/GetBusinessesInteractor';
import { interactor as getRestaurantInteractor } from './domain/getRestaurantInteractor';

//Redux 
import * as actions from '../store/index';
import { connect } from 'react-redux';

//Search Bar
import { SearchBar } from 'react-native-elements';

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
        hadFetch: false,
        search: '',
        text: '',
        filteredNames: '',
        dataCountEnd: 10,
        dataCountStart: 0,
    };
    arrayHolder = [];

    updateSearch = (search) => {
        this.setState({ search });
        let text = search.toLowerCase();
        let restaurants = getRestaurantInteractor(this.props.content.businesses);
        const filteredNamesTemp = restaurants.filter((item) => {
            return item.name.toLowerCase().match(text);
        })
        this.setState({
            filteredNames: filteredNamesTemp
        });
    };
        
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
        let location = await Location.getCurrentPositionAsync();
        this.toLongitudeLatitude(location);

        //Fetch Data then save to redux
        if(this.state.longitude !== null && this.state.latitude !== null && await this.getDataLocally() === null){
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
            .catch((error) => {
                console.error(error);
            });
          }
        }
        //If we have local data, we want to save that local data to redux
        else{
            const data = await this.getDataLocally();
            this.props.storeContent(data);
        }
    }

    componentWillUnmount = () => {
        this.setState = (state, callback)=>{
            return;
        };
    }

    //Obtain the latitude and longitude of last known location
    toLongitudeLatitude = (location) => {
        if(location === null || location === undefined){
            return;
        }
        this.setState({latitude: location.coords.latitude});
        this.setState({longitude: location.coords.longitude});
    }

    _onPressSearchButton = function() {
        this.refs.searchbar.blur();
    }

    handleLoadMore = () => {
        this.setState({dataCountEnd: this.state.dataCountEnd + 10});
    }
 
    render(){
        const { search } = this.state;
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
                <SearchBar
                    round   
                    lightTheme
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    onBlur={Keyboard.dismiss}
                    onSearchButtonPress={this._onPressSearchButton}
                />
                <View>
                    <FlatList 
                        data={this.state.filteredNames}
                        renderItem={({ item }) =>
                            <Card 
                                {...this.props}
                                name={item.name}
                                image={item.image}
                                location={item.location}
                                distance={item.distance}
                                // category={item.category}
                            />
                        }
                        keyExtractor={(item) => item.id} 
                    />
                </View>
                <FlatList
                    data={getBusinessesInteractor(this.props.content.businesses).slice(0, this.state.dataCountEnd)}
                    extraData={getBusinessesInteractor(this.props.content.businesses)}
                    renderItem={({ item }) =>
                        <Card
                            {...this.props} 
                            id={item.restaurantID}
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
