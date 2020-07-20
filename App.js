import React  from 'react';
import { StyleSheet, View } from 'react-native';

//Firebase imports 
import { app } from './src/Config';
import 'firebase/firestore';

//Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer  from './store/reducer';

const store = createStore(appReducer);

//Import Screens
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import Forgot from './screens/Forgot';

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
    if(this.state.loading === true){
      return null;
    }
    else{
      return homeStack();
    }
  }
}

function homeStack(){
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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

