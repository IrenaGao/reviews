import React from 'react';
import {StyleSheet, Text, View, Alert, FlatList} from 'react-native';

//Location
import * as Location from 'expo-location';

// Interactors
import { interactor as getContentInteractor } from '../integration/domain/GetContentInteractor';
import { interactor as getRestaurantInteractor } from './domains/getRestaurantInteractor';

//Redux 
import * as actions from '../store/index';
import { connect } from 'react-redux';

//Search Bar
import { SearchBar } from 'react-native-elements';
import Card from '../components/RestaurantCard';
import {
    ScrollView,
    TextInput,
    Keyboard,
    TouchableOpacity
} from 'react-native';

class Home extends React.Component{
    state = {
        latitude: null,
        longitude: null,
        status: null,
        isLoading: true,
        hadFetch: false,
        search: '',
        text: '',
        filteredNames: ''
    };
    arrayHolder = [];

    updateSearch = (search) => {
        this.setState({ search });
        console.log(search);
        let text = search.toLowerCase();
        let restaurants = getRestaurantInteractor(this.props.content.businesses);
        const filteredNamesTemp = restaurants.filter((item) => {
            return item.name.toLowerCase().match(text);
        })
        this.setState({
            filteredNames: filteredNamesTemp
        });
        console.log(this.state.filteredNames);
    };
    
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
            .catch((error) => {
                console.error(error);
            });
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

    _onPressSearchButton = function() {
        this.refs.searchbar.blur();
    }
    
    render(){
        const { search } = this.state;
        return(
            <ScrollView keyboardShouldPersistTaps='never'>
                <Text style = {styles.header}>
                    Welcome to Reviews! 
                </Text>
                <SearchBar
                    round   
                    lightTheme
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    onBlur={Keyboard.dismiss}
                    onSearchButtonPress={this._onPressSearchButton}
                />
                <TouchableOpacity
                    style={styles.signupbutton}
                    onPress = {() => this.props.navigation.navigate("Register")}
                >
                    <Text>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginbutton}
                    onPress = {() => this.props.navigation.navigate("Login")}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <View>
                <FlatList 
                    data={this.state.filteredNames}
                    renderItem={({ item }) =>
                        <Card
                            {...this.props}
                            name={item.name}
                            image={item.image}
                            location={item.location}
                            distance={item.distance}
                            // category={item.category}
                        />
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            </ScrollView>
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
    header: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 150,
        fontWeight: 'bold'
    },
    signupbutton: {
        marginTop: 100,
        borderStyle: 'solid',
        marginLeft: "40%"
    },
    loginbutton: {
        marginTop: 25,
        marginLeft: '40%'
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
