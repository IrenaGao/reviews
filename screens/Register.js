import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
    ScrollView,
    TextInput,
    Keyboard,
    TouchableOpacity
} from 'react-native';

//Firebase imports 
import { app } from '../src/Config';
import 'firebase/firestore';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: ""
            // isRegistered: false
        };
    }

    handleRegister = () => {
        const {email, password, username} = this.state

        let rootRef = app.database().ref();
        rootRef
        .child('users')
        .orderByChild('userName')
        .equalTo(username)
        .once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                let userData = snapshot.val();
                console.log(userData);
                Alert.alert('Username is taken.');
                return userData;
            } else {
                app
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        app.firestore().doc('users/' + userCredential.user?.uid).set({
                            email: email,
                            userName: username,
                            password: password
                        })
                        this.props.navigation.navigate('Home');
                        console.log('User account created');
                    })
                    .catch(error => console.log(error));
            }
        });

        // app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        //     .then((userCredential) => {
        //         app.firestore().doc('users/' + userCredential.user?.uid).set({
        //             email: this.state.email,
        //             userName: this.state.username,
        //             password: this.state.password
        //         })
        //         console.log('User account created');
        //     })
        // app.auth()
        //     .createUserWithEmailAndPassword(this.state.email, this.state.password)
        //     .then( function(user) {
        //         // var ref = firebase.database().ref("users").child(user.uid).set({
        //         //     email: user.email,
        //         //     uid: user.uid
        //         // });
        //         console.log(this.state.email, this.state.password)
        //         console.log("hi")
        //     })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.header}>Registration</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput  
                        style={styles.textInput}
                        placeholder="Your email"
                        maxLength={20}
                        onChangeText={email => this.setState({email:email})}                        
                        value={this.state.email}
                        onBlur={Keyboard.dismiss}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Your username"
                        maxLength={20}
                        onChangeText={username => this.setState({username:username})}
                        value={this.state.username}
                        onBlor={Keyboard.dismiss}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput  
                        style={styles.textInput}
                        placeholder="Your password"
                        maxLength={20}
                        onChangeText={password => this.setState({password:password})}                        
                        value={this.state.password}
                        onBlur={Keyboard.dismiss}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress = {this.handleRegister}
                    >
                        <Text style={styles.saveButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: '#F5FCFF',
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingTop: 15
    },
    saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
});