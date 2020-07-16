import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
    ScrollView,
    TextInput
} from 'react-native';

//Firebase imports 
import { app } from '../src/Config';
import 'firebase/firestore';

export default class Register extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.header}>Settings</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput  
                        style={styles.textInput}
                        placeholder="Your name"
                        maxLength={20}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: '#F5FCFF',
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingTop: 15
    }
});