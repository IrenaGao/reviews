import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

export default class HomeItem extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text>{this.props.name}</Text>
                    <Text>{this.props.location}</Text>
                    <Image source={this.props.image} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
