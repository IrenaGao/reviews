import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

export default class Card extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Image src={this.props.image} />
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
