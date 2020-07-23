import React from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';

//Location
import * as Location from 'expo-location';

// Interactors
import { interactor as getContentInteractor } from '../integration/domain/GetContentInteractor';

//Redux 
import * as actions from '../store/index';
import { connect } from 'react-redux';

//Firebase
import { app } from '../src/Config';

class Home extends React.Component{
    state = {
        latitude: null,
        longitude: null,
        status: null,
        isLoading: true,
        hadFetch: false,
    }
    
    componentDidMount =  async () => {
        //Did User Change Location?
        //Set User's Location Permission
        const { status } = await Location.requestPermissionsAsync();
        if(status !== "granted"){
            Alert.alert("This Application Requires Location Permissions To Function Properly. Please Change Your Permission in Settings");
            this.setState({status: "granted"});
        }
        let location = await Location.getLastKnownPositionAsync();
        this.toLongitudeLatitude(location);

        //Fetch Data
        if(this.state.longitude !== null && this.state.latitude !== null && this.state.hadFetch === false){
            if (!this.props.content) {
              const latitude = this.state.latitude;
              const longitude = this.state.longitude;
              Promise
                .all([
                  getContentInteractor(latitude, longitude),
                ]) 
                .then(([content]) => {
                  this.props.storeContent(content);
                  this.setState({hadFetch: true});
                })
          }
        }
        if(this.state.isLoading){
            this.setState({isLoading: false});
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
        if(this.state.isLoading === true){
            return(
                <View><Text>Loading...</Text></View>
            )
        }
        return(
            <View style={styles.container}>
                <Text style={{textAlign: 'center'}}>Home Screen</Text>
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
