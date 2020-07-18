import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    TouchableOpacity
 } from 'react-native';

 //Firebase imports 
import { app } from '../src/Config';
import 'firebase/firestore';

export default class Forgot extends React.Component {
    state={
        email:"",
    }
    
    render(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password?</Text>
            
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Enter your email so we can set you a password reset link.</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput  
                    autoCapitalize="none"
                    style={styles.inputText}
                    placeholder="Email" 
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({email:text})}
                />
            </View>

            <TouchableOpacity 
                style={styles.loginButton}>
                <Text style={styles.loginText}>Send Link</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        backgroundColor: '#4A00A9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontWeight:"bold",
        fontSize:40,
        color:"white",
        marginBottom:40
    },
    subtitleContainer: {
        flex: 1,
        backgroundColor: '#4A00A9',
        alignItems: 'center',
        justifyContent: 'flex-start', 
    },
    subtitle:{
        fontWeight:"bold",
        fontSize:20,
        color:"white",
        marginBottom:40
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
    forgot: {
        fontSize:15,
        color:"#E6E6E6"
    },
    loginButton: {
        width:"50%",
        backgroundColor:"#8093FF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10,
    },
    loginText: {
        fontSize: 20,
        color:"white"
    }
});