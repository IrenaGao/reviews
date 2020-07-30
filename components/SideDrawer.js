import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

export function SideDrawer(props){
    if(props.userName === undefined && props.userEmail === undefined){
        return(
            <View style={styles.container}>
                <View style={styles.authenticate}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    console.log(props.userName)
    return(
        <View style={styles.container}>
            <Text>{props.userName}</Text>
            <Text>{props.userEmail}</Text>
            <TouchableOpacity style={{marginTop: 200}} onPress={() => props.handleLogout()}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    authenticate:{
        marginTop: 100
    }
})