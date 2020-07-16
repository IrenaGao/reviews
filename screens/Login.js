import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    TouchableOpacity
 } from 'react-native';

export default class Login extends React.Component {
    state={
        username:"",
        password:""
    }
    
    render(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>REVIEWS</Text>
            
            <View style={styles.inputContainer}>
                <TextInput  
                    style={styles.inputText}
                    placeholder="Username" 
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({username:text})}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password" 
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({password:text})}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.forgot}>Sorry if the color scheme is terrible...</Text>
            </View>
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