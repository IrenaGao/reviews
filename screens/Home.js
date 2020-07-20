import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';

//Location
import * as Location from 'expo-location';

// Interactors
import { interactor as getContentInteractor } from '../integration/domain/GetContentInteractor';

//Redux 
import * as actions from '../store/index';
import { connect } from 'react-redux';

class Home extends React.Component{
    state = {
        latitude: null,
        longitude: null,
        status: null,
        isLoading: true,
        hadFetch: false,
    }
    
    componentDidMount =  async () => {
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
        if(this.state.isLoading === false){
            this.setState({isLoading: true});
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
        return(
            <View>
                <Text>Home</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
