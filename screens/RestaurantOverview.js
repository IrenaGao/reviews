import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { connect } from 'react-redux';

//Interactors
import { interactor as getSingleBusinessInteractor } from './domain/GetSingleBusinessInteractor';

class RestaurantOverview extends React.Component{
    state = {
        name: '',
        image: "",
        price: '',
        location: '',
        distance: '',
        isLoading: true,
    }
    
    componentDidMount = () => {
        const restaurant = getSingleBusinessInteractor(this.props.content.businesses, getId(this.props));
        this.setState({distance: (restaurant.distance * 0.000621371).toFixed(1), image: restaurant.image, price: restaurant.price, name: restaurant.name, location: restaurant.location}); 
        this.setState({isLoading: false});       
    }
    
    render(){
        if(this.state.isLoading === true){
            return(
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return(
            <View style={styles.containter}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: this.state.image}} />
                </View>
                <View style={styles.header}>
                    <Text style={{fontWeight: 'bold', fontSize: 25}}>{this.state.name}</Text>
                    <View>
                        <Text>{this.state.location}</Text>
                        <Text>{this.state.distance} miles away</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    header:{
        marginTop: '3%',
        marginLeft: '2%',
    },
    imageContainer:{
        width: '100%',
        height: '55%',
    },
    image:{
        width: '100%',
        height: '100%',
    },
})
const mapStateToProps = (state) => {
    return {
      content: state.content,
    };
  };

function getId(props){
    return(props.route.params?.id);
}
export default connect(mapStateToProps)(RestaurantOverview)