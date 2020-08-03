import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';


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
                <FontAwesome.Button 
                    name="chevron-left" 
                    color="black"
                    backgroundColor="white"
                    marginTop={15}
                    onPress={() => this.props.navigation.goBack()}> 
                    <Text style={{fontWeight:'bold', fontSize:26}}>Restaurants</Text>
                </FontAwesome.Button>

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

                <View style={styles.centeredContainer}>
                    <TouchableOpacity 
                        style={styles.writeButton} 
                        onPress = {() => this.props.navigation.navigate("WriteReview", { id : getId(this.props) })}>
                        <Text style={styles.writeText}>Write a Review</Text>    
                    </TouchableOpacity>
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
    centeredContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    writeButton:{
        width:"50%",
        backgroundColor:"red",
        borderRadius:20,
        height:30,
        marginTop:10,
        marginBottom:10,
    },
    writeText:{
        color:"white",
        fontWeight: 'bold', 
        fontSize: 20, 
        textAlign:"center", 
        textAlignVertical:"center"
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
export default connect(mapStateToProps)(RestaurantOverview)