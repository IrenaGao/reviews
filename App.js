import React  from 'react';
import { StyleSheet, Text, View} from 'react-native';

//Firebase imports 
import { app } from './src/Config';
import 'firebase/firestore';

//Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Import Screens
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import Forgot from './screens/Forgot';

import getEnvVars from './environment';
const { yelpFusionKey } = getEnvVars();


//Creating Navigation Stacks
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class App extends React.Component {
  uid = app.auth().currentUser?.uid;
  ref = app.firestore().doc('/users/' + this.uid);

  state = {
    isLoading : true,
    user: null,
  }

  componentDidMount = async () => {
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

  render(){
    // if(this.state.loading === true){
       return homeStack();
    // }
    // if(this.state.user !== null){
    //   return homeStack();
    // }
    // else{
    //   return loginStack();
    // }
    // return (
    //   <View style={styles.container}>
    //     <Text>Open up App.js to start working on your app!</Text>
    //   </View>
    // );
  }
}

function homeStack(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// function loginStack(){
//   return(
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="Login" component={Login} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
