import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
    ScrollView,
    TextInput,
    Keyboard,
    TouchableOpacity
} from 'react-native';

// import screens
// import Register from './Register';
// import Login from './Login';
// import { createStackNavigator, createAppContainer } from 'react-navigation';  

export default class Home extends React.Component {
    render() {
        return (
            <View>
                <Text style = {styles.header}>
                    Welcome to Reviews! 
                </Text>
                <TouchableOpacity
                    style={styles.signupbutton}
                    onPress = {() => this.props.navigation.navigate("Register")}
                >
                    <Text>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginbutton}
                    // onPress = {() => this.props.navigation.navigate("Login")}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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