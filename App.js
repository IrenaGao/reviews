import React  from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';

//Firebase imports 
import { app } from './src/Config';
import 'firebase/firestore';
import * as Location from 'expo-location';

//Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Interactors
import { interactor as getContentInteractor } from './integration/domain/GetContentInteractor';


//Import Screens
// import Home from './screens/Home';
// import Register from './screens/Register';
// import Login from './screens/Login';

//Creating Navigation Stacks
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class App extends React.Component {
  uid = app.auth().currentUser?.uid;
  ref = app.firestore().doc('/users/' + this.uid);

  state = {
    isLoading : true,
    user: null,
    status: null,
    latitude: null,
    longitude: null,
  }

  componentDidMount = async () => {
    //Set User's Location Permission
    const { status } = await Location.requestPermissionsAsync();
    if(status !== "granted"){
      //Potention bug when user reject permission needa fix in future
      Alert.alert("This Application Requires Location Permissions To Function Properly. Please Change Your Permission in Settings");
      this.setState({status: "granted"});
    }

    let location = await Location.getLastKnownPositionAsync();
    this.toLongitudeLatitude(location);

    //Fetch Content
    if(this.state.longitude !== null && this.state.latitude !== null){
        if (!this.props.content) {
          const latitude = this.state.latitude;
          const longitude = this.state.longitude;
          Promise
            .all([
              getContentInteractor(latitude, longitude),
            ]) //Need to add redux stuff here
      }
    }

    app.auth().onAuthStateChanged(async user => {
      if(user){
       let uid = app.auth().currentUser?.uid;
       this.setState({user: user});
      }
      else{
        this.setState({user : null});
      }

      if(this.state.isLoading === true){
        this.setState({isLoading: false});
      }
    })
  }

  //Obtain the latitude and longitude of last known location
  toLongitudeLatitude = (location) => {
    if(location === null || location === undefined){
      return;
    }
    let text = JSON.stringify(location);
    this.setState({latitude: text.coords.latitude});
    this.setState({longitude: text.coords.longitude});
  }

  render(){
    // if(this.state.loading === true){
    //   return null;
    // }
    // if(this.state.user !== null){
    //   return homeStack();
    // }
    // else{
    //   return loginStack();
    // }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

function homeStack(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function loginStack(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
