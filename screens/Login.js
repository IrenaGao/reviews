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

export default class Login extends React.Component {
    state={
        email:"",
        password:""
    }

    handleLogin = () => {
        const { email, password } = this.state
        app.auth().signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Home'))
            .catch(error => console.log(error)) //this.setState({ errorMessage: error.message })
    }
    
    render(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>REVIEWS</Text>
            
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

            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    autoCapitalize="none"
                    placeholder="Password" 
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({password:text})}
                />
            </View>

            <TouchableOpacity 
                style={styles.loginButton}
                onPress={this.handleLogin}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Forgot")}>
                <Text style={styles.otherOptionsText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("Register")}>
                <Text style={styles.otherOptionsText}>Don't have an account? Register here!</Text>
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
        fontSize:50,
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
    otherOptionsText: {
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