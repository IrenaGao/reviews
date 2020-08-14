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
            <View style={styles.userInfo}>
                <View style={styles.imageContainer}>
                    {props.profilePic === null ? <Image style={{width: 100, height: 100}} source={props.defaultPic} /> : <Image source={{uri : props.profilePic}} style={{width: 100, height: 100, borderRadius: 100 /2 }} />}
                    <TouchableOpacity style={{position: 'absolute', bottom: 5, right: 10}} onPress={() => props.pickImage()}>
                        <Ionicons name="ios-add-circle" size={26} color={'#a6e3da'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerUserName}>{props.userName}</Text>
                    <Text style={styles.headerUserEmail}>{props.userEmail}</Text>
                </View>
            </View>
            <View style={styles.pages}>
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
            </View>
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
    },
    userInfo: {
        marginTop: '20%',
        elevation: 1,
        backgroundColor: 'white',
        marginBottom: '5%'
    },
    imageContainer: {
        alignSelf: 'flex-start',
        marginLeft: '2%',
    },
    header: {
        marginLeft: '5%',
        marginTop: '10%',
    },
    pages:{
        marginTop: '5%'
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