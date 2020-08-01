import React from 'react';
import {StyleSheet, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    Keyboard } from 'react-native';

import { connect } from 'react-redux';

import Slider from '@react-native-community/slider'

//Interactors
import { interactor as getSingleBusinessInteractor } from './domain/GetSingleBusinessInteractor';

class WriteReview extends React.Component {
    state={
        name:""
    }

    componentDidMount = () => {
        console.log(this.props.content.businesses)
        const restaurant = getSingleBusinessInteractor(this.props.content.businesses, getId(this.props));
        this.setState({name: restaurant.name}); 
        console.log(restaurant.name)
    }

    render() {
        return (
            <ScrollView styles={styles.container}>
                <Text style={styles.header}>Write a Review</Text>

                <TouchableOpacity 
                    style={styles.header}
                    onPress={ () => this.props.navigation.goBack()}>
                    <Text style={styles.loginText}>Go Back to {this.state.name}</Text>
                </TouchableOpacity>

                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: '5%',
        marginLeft: '3%' 
    }

})

const mapStateToProps = (state) => {
    return {
      content: state.content,
    };
  };

function getId(props){
    return(props.route.params?.id);
}
export default connect(mapStateToProps)(WriteReview)