import React from 'react';
import {StyleSheet, 
    Text, 
    View,
    ScrollView, 
    Keyboard, 
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'

//Interactors
import { interactor as getSingleBusinessInteractor } from './domain/GetSingleBusinessInteractor';

class WriteReview extends React.Component {
    state={
        name:"",
        safety:50,
        fairness: 50
    }

    componentDidMount = () => {
        console.log(this.props.content.businesses)
        const restaurant = getSingleBusinessInteractor(this.props.content.businesses, getId(this.props));
        this.setState({name: restaurant.name}); 
        console.log(restaurant.name)
    }



    render() {
        return (
            <View styles={{flex:1}}>
                <FontAwesome.Button 
                    name="chevron-left" 
                    color="black"
                    backgroundColor="white"
                    marginTop={15}
                    onPress={() => this.props.navigation.goBack()}> 
                    <Text style={styles.header}>{this.state.name}</Text>
                </FontAwesome.Button>

                <ScrollView>
                    <View style={styles.ratingContainer}>
                        <View styles={{width:100}}>
                            <Text styles={{textAlign:'right'}}>Safety</Text>
                        </View>
                        <View>
                            <Slider
                                style={{width:250, height:40}}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                value={50}
                                onValueChange={val => this.setState({safety:val})}
                            />
                        </View>
                        <View>
                            <Text>{this.state.safety}</Text>
                        </View>
                    </View>
                    <View styles={{justifyContent:'center'}}>
                        <TextInput 
                            style={{height:40, width:250, marginLeft:80}}
                            placeholder="Add a comment..."
                            underlineColorAndroid='green'/>
                    </View>
                    
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        fontWeight: 'bold',
        fontSize: 26
    },
    ratingContainer:{
        flexDirection: 'row', 
        justifyContent:'flex-start',
        alignItems:'center',
        marginLeft:25
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