import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    TouchableOpacity,
    Alert
 } from 'react-native';

import { app } from '../src/Config';
db = app.firestore()

export default class Forgot extends React.Component {
    state={
        email:"",
    }
    
    handleReset = async () => {
        const { email } = this.state
       
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();
        if (snapshot.empty) {
            Alert.alert("There is no account associated with this email.")
        }
        else {
            app.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Email successfully sent.")
                this.props.navigation.navigate('Login')
            })
            .catch(error => Alert.alert(error.message)); //console.log(error)
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Forgot your password?</Text>
                <Text style={styles.subtitle}>Enter your email address and we'll
                    send instructions for resetting your password.</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput  
                        style={styles.inputText}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="Email" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({email:text})}
                    />
                </View>
    
                <TouchableOpacity 
                    style={styles.resetButton}
                    onPress={this.handleReset}>
                    <Text style={styles.resetText}>Confirm Email</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4A00A9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontWeight:"bold",
        fontSize:40,
        color:"white",
        textAlign:"center",
        marginBottom:20
    },
    subtitle:{
        fontSize:20,
        color:"white",
        marginHorizontal:20,
        marginBottom:20
    },
    inputContainer: {
        width:"80%",
        backgroundColor:"#CEA9FF",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20  
    },
    inputText: {
        height:50,
        color:"#757575"
    },
    resetButton: {
        width:"50%",
        backgroundColor:"#8093FF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:40,
    },
    resetText: {
        fontSize: 20,
        color:"white"
    }
});