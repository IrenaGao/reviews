import React from 'react';
import { StyleSheet, 
    Text, 
    View, 
    Alert,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { app } from '../src/Config';

db = app.firestore()

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: ""
        };
    }

    handleRegister = async () => {
        const {email, password, username} = this.state

        const userNameRef = db.collection('users');
        const snapshot = await userNameRef.where('userName', '==', username).get();
        if (snapshot.empty) {
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
        } else {
            Alert.alert('Username is taken.');
            return;
        };
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.header}>Registration</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput  
                        style={styles.textInput}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="Email"
                        maxLength={20}
                        onChangeText={email => this.setState({email:email})}                        
                        value={this.state.email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Username"
                        maxLength={20}
                        onChangeText={username => this.setState({username:username})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput  
                        secureTextEntry
                        autoCapitalize="none"
                        style={styles.textInput}
                        placeholder="Password"
                        maxLength={20}
                        onChangeText={password => this.setState({password:password})}                        
                        value={this.state.password}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 40,
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
        fontWeight: 'bold',
    },
    inputContainer: {
        paddingTop: 10,
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