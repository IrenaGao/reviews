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
  uid = app.auth().currentUser?.uid;
  ref = app.firestore().doc('/users/' + this.uid);

  state = {
    isLoading : true,
    user: null,
    userName: null,
    userEmail: null,
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

    if(this.uid !== undefined){
      await app.firestore().doc('/users/' + this.uid).get({source: 'default'})
      .then(user => {
        this.setState({userName: user.userName});
        this.setState({userEmail: user.userEmail});
      })
    }
  }

  render(){
    if(this.state.loading === true){
      return null;
    }
    else{
      return homeStack(this.state);
    }
  }
}

function homeStack(state){
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={(props) => <SideDrawer {...props} handleLogout={handleLogout} userName={state.userName} userEmail={state.userEmail} />}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Forgot" component={Forgot} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
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

