import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default class RestaurantCard extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: this.props.image}}/>
                </View>
                <View style={styles.description}>
                    <Text>{this.props.name}</Text>
                    <Text style={{fontSize: 10, fontWeight:"100", color:'#D3D3D3'}}>{this.props.location}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        height: 100,
        backgroundColor: 'white',
        elevation: 3,
        flexDirection: 'row',
        flex: 1,
        marginTop: '3%',
        marginLeft: '3%',
        marginRight: '3%',  
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },

    imageContainer:{
        marginLeft: '3%',
        width: 75,
        height: 75,
    },
    image:{
        borderRadius: 50,
        width: '100%',
        height: '100%',
    },
    description:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft: '2%',
    }
})