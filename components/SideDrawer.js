import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

export function SideDrawer(props){
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
            <View style={styles.imageContainer}>
                {props.profilePic === null ? <Image source={props.defaultPic} /> : <Image source={props.profilePic} />}
            </View>
            <View style={styles.header}>
                <Text style={styles.headerUserName}>{props.userName}</Text>
                <Text style={styles.headerUserEmail}>{props.userEmail}</Text>
            </View>
            <Drawer.Section>
                <DrawerItem
                    icon={({color, size}) => (
                        <Ionicons 
                            name="ios-home"
                            color={color}
                            size={22}
                        />
                    )}
                    label="Home"
                    onPress={() => props.navigation.navigate("Home")}
                />
                <DrawerItem
                    icon={({color, size}) => (
                        <Ionicons 
                            name="ios-person"
                            color={color}
                            size={22}
                        />
                    )}
                    label="Profile"
                    onPress={() => props.navigation.navigate("Home")}
                />
            </Drawer.Section>
                <Drawer.Section style={styles.bottom}>
                    <DrawerItem 
                        style={styles.bottomDrawerSection}
                        icon={({color, size}) => (
                            <Ionicons
                            name="ios-exit" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Log Out"
                        onPress={async () =>  await props.handleLogout(props)}
                    />
                </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    imageContainer: {
        marginLeft: '2%'
    },
    header: {
        marginLeft: '5%',
        marginTop: '10%',
    },
    headerUserName:{
        fontWeight: 'bold',
        fontSize: 20
    },
    headerUserEmail:{
        fontWeight: '100',
        fontSize: 12,
        color: 'grey',
    },
    authenticate:{
        marginTop: 100
    },
    bottom: {
        bottom: 0,
        position: 'absolute',
        left: 0,
        right: 0,
    }
})