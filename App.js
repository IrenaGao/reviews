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
import { SideDrawer } from './components/SideDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Creating Navigation Stacks
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  // uid = app.auth().currentUser?.uid;
  // ref = app.firestore().doc('/users/' + this.uid);

  state = {
    isLoading : true,
    uid: undefined,
    userName: null,
    userEmail: null,
  }

  componentDidMount = async () => {
    app.auth().onAuthStateChanged(async user => {
      if(user){
       this.setState({uid: app.auth().currentUser?.uid});
       this.setState({user: user});
       console.log("uid: " + this.state.uid)
       console.log("user: " + this.state.user)
      }
      // else{
      //   this.setState({user : null});
      // }

      if(this.state.isLoading === true){
        this.setState({isLoading: false});
      }
    }) 

    if(this.state.uid !== undefined){
      await app.firestore().doc('/users/' + this.uid).get({source: 'default'})
      .then(user => {
        this.setState({userName: user.userName});
        this.setState({userEmail: user.userEmail});
      });
      console.log("Logged in as " + this.state.userName)
    }
  }

  render(){
    if(this.state.loading === true){
      return null;
    }
    else{
      return appStack(this.state);
    }
  }
}

function homeStack(state){
  return (
    <Provider store={store}>
        <Drawer.Navigator 
          screenOptions={{headerShown: false}} 
          drawerContent={(props) => <SideDrawer {...props} 
            handleLogout={handleLogout} 
            userName={state.userName} 
            userEmail={state.userEmail} />}>
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    </Provider>
  )
}

function appStack(state){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="homeStack" component={homeStack} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

async function handleLogout(){
  await app.auth().signOut();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

