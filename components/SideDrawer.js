import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

export function SideDrawer(props){
    console.log(props.userName);
    if(props.userName === null && props.userEmail === null){
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
    return(
        <View style={styles.container}>
            <Text>{props.userName}</Text>
            <Text>{props.userEmail}</Text>
            <TouchableOpacity style={{marginTop: 200}} onPress={async () => await props.handleLogout(props)}>
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