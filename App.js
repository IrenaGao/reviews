import React  from 'react';
import { StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';

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
import RestaurantOverview from './screens/RestaurantOverview';
import { SideDrawer } from './components/SideDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Creating Navigation Stacks
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  state = {
    uid: null,
    isLoading : true,
    userName: null,
    userEmail: null,
    profilePic: null,
  }

  componentDidMount = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./photos/profile.png'),
      ])
    ])
    app.auth().onAuthStateChanged(async user => {
      if(user){
       this.setState({uid: app.auth().currentUser?.uid});
      }
      else{
        this.setState({uid : null});
        this.setState({userName: null});
        this.setState({userEmail: null});
      }

      if(this.state.uid !== null){
        await app.firestore().doc('users/' + this.state.uid).get({source: 'default'})
          .then(user => {
            this.setState({userName: user.get('userName')});
            this.setState({userEmail: user.get('email')});
          })
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
      return homeStack(this.state);
    }
  }
}

function HomeStackScreen(state) {
  const HomeStack = () => (
    <Drawer.Navigator 
      screenOptions={{headerShown: false}}
      drawerContent={(props) => <SideDrawer {...props} defaultPic={require('./photos/profile.png')} handleLogout={handleLogout} profilePic={state.profilePic} userName={state.userName} userEmail={state.userEmail} />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  )
  return(
    HomeStack
  );
}

function homeStack(state){
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="homeStack" component={HomeStackScreen(state)} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="RestaurantOverview" component={RestaurantOverview} unmountOnBlur={true} options={{ unmountOnBlur: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

async function handleLogout(props){
  await app.auth().signOut()
    .then(() => props.navigation.navigate('Home'));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

