import React from 'react';
import {StyleSheet, 
    Text, 
    View,
    ScrollView, 
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

//Interactors
import { interactor as getSingleBusinessInteractor } from './domain/GetSingleBusinessInteractor';
import { $CombinedState } from 'redux';

class WriteReview extends React.Component {
    state={
        name:"",
        ratings:[
            {category:"Safety", value:50, comment:""},
            {category:"Fairness", value:50, comment:""},
            {category:"Health", value:50, comment:""},
        ]
    }

    componentDidMount = () => {
        const restaurant = getSingleBusinessInteractor(this.props.content.businesses, getId(this.props));
        this.setState({name: restaurant.name}); 
    }

    updateRatingValue(idx, update){
        var ratings = this.state.ratings
        ratings[idx].value = update
        return ratings
    }

    renderRating(idx){
        return (
            <View>
                <View style={styles.sliderContainer}>
                    <View style={styles.sliderTextView}>
                        <Text styles={{textAlign:'right'}}>
                            {this.state.ratings[idx].category}
                        </Text>
                    </View>
                    <View style={{flex:4, justifyContent: "center"}}>
                        <Slider
                            style={{flex:1, width:'100%', height:40}}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            value={50}
                            onValueChange={val => 
                                this.setState({ratings:this.updateRatingValue(idx, val)})}
                        />
                    </View>
                    <View style={styles.sliderTextView}>
                        <Text>{this.state.ratings[idx].value}</Text>
                    </View>
                </View>
            
                <View style={styles.commentContainer}>
                    <View style={{flex:1}}/>

                    <AutoGrowingTextInput 
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        onEndEditing={e => {
                            Keyboard.dismiss
                            this.state.ratings[idx].comment = e.nativeEvent.text
                        }}
                    />
                </View>     
            </View>      
        )
    }

    render() {
        return (
            <View>
                <FontAwesome.Button 
                    name="chevron-left" 
                    color="black"
                    backgroundColor="white"
                    marginTop={15}
                    onPress={() => this.props.navigation.goBack()}> 
                    <Text style={styles.header}>{this.state.name}</Text>
                </FontAwesome.Button>

                <ScrollView>
                    {this.state.ratings.map((item, key) => this.renderRating(key))}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        fontWeight: 'bold',
        fontSize: 26
    },
    sliderContainer:{
        flex:1,
        flexDirection: 'row', 
        justifyContent:'flex-start',
        alignItems:'center',
        marginLeft:20
    },
    sliderTextView:{
        flex:1, 
        justifyContent: "center", 
        alignItems:"center"
    },
    commentContainer:{
        flex:1,
        flexDirection: 'row', 
        justifyContent:'flex-start',
        alignItems:'center',
        marginHorizontal:20
    },
    commentInput:{
        flex:4,
        backgroundColor:'white',
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