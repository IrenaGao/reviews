import React from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';

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
import HomeCard from './HomeLayer/Home';

class Home extends React.Component{
    state = {
        latitude: null,
        longitude: null,
        status: null,
        isLoading: true,
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
        console.log(this.state.longitude);

        //Fetch Data
        if(this.state.longitude !== null && this.state.latitude !== null){
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
          }
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
                <HomeCard cardConfigs={getBusinessesInteractor(this.props.content.businesses)} />
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
        justifyContent: "center"
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
