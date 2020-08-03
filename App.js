import React  from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Asset } from 'expo-asset';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

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
    private: false,
    reviewsNumber: 0,
  }

  componentDidMount = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./photos/profile.png'),
      ])
    ])
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
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

      const profilePicture = await AsyncStorage.getItem("profilePic");
      if(profilePicture !== null){
        this.setState({profilePic: profilePicture});
      }

      if(this.state.isLoading === true){
        this.setState({isLoading: false});
      }
    }) 
  }

  componentWillUnmount = () => {
    this.setState = (state, callback)=>{
        return;
    };
  }
  savePictureLocally = (uri) => {
    AsyncStorage.setItem("profilePic", uri);
  }
  uploadFromGallery = async (uri) => {
      console.log("uploading");
      const response = await fetch(uri);
      const blob = await response.blob();
      let ref = app.storage().ref("profiles/" + this.state.uid + "/profile-photo");
      ref.put(blob).then(() => {
        ref.getDownloadURL().then(cloudUri => {
          app.firestore().doc('profile/' + this.state.uid).set({
            numberOfReviews : this.state.reviewsNumber, 
            private : this.state.private, 
            pictureCloud : cloudUri, 
            pictureLocal : uri,
          })
        })
      })
      .then(() => this.savePictureLocally(uri))
      .then(() => this.setState({profilePic: uri}))
    }
    
    _pickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          await this.uploadFromGallery(result.uri)
        }
      } catch (E) {
        console.log(E);
      }
    };
  
  render(){
    if(this.state.loading === true){
      return null;
    }
    else{
      return homeStack(this.state, this._pickImage);
    }
  }
}

function HomeStackScreen(state, _pickImage) {
  const HomeStack = () => (
    <Drawer.Navigator 
      screenOptions={{headerShown: false}}
      drawerContent={(props) => 
        <SideDrawer 
          {...props} 
          pickImage={_pickImage} 
          defaultPic={require('./photos/profile.png')} 
          handleLogout={handleLogout} 
          profilePic={state.profilePic} 
          userName={state.userName} 
          userEmail={state.userEmail} />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  )
  return(
    HomeStack
  );
}

function homeStack(state, _pickImage){
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="homeStack" component={HomeStackScreen(state, _pickImage)} />
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

