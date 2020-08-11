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

class WriteReview extends React.Component {
    state={
        name:"",
        // TODO: make array of rating types, with each element containing a value and a comment
        safetyValue:50,
        safetyComment:"",

        fairnessValue: 50,
        fairnessComment:"",

        healthValue:50,
        healthComment:""
    }

    componentDidMount = () => {
        const restaurant = getSingleBusinessInteractor(this.props.content.businesses, getId(this.props));
        this.setState({name: restaurant.name}); 
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
                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderTextView}>
                            <Text styles={{textAlign:'right'}}>Safety</Text>
                        </View>
                        <View style={{flex:4, justifyContent: "center"}}>
                            <Slider
                                style={{flex:1, width:'100%', height:40}}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                value={50}
                                onValueChange={val => this.setState({safetyValue:val})}
                            />
                        </View>
                        <View style={styles.sliderTextView}>
                            <Text>{this.state.safetyValue}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.commentContainer}>
                        <View style={{flex:1}}/>

                        <AutoGrowingTextInput 
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            onEndEditing={e => {
                                Keyboard.dismiss
                                this.setState({safetyComment:e.nativeEvent.text})
                            }}
                        />
                    </View>


                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderTextView}>
                            <Text styles={{textAlign:'right'}}>Fairness</Text>
                        </View>
                        <View style={{flex:4, justifyContent: "center"}}>
                            <Slider
                                style={{flex:1, width:'100%', height:40}}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                value={50}
                                onValueChange={val => this.setState({fairnessValue:val})}
                            />
                        </View>
                        <View style={styles.sliderTextView}>
                            <Text>{this.state.fairnessValue}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.commentContainer}>
                        <View style={{flex:1}}/>

                        <AutoGrowingTextInput 
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            onEndEditing={e => {
                                Keyboard.dismiss
                                this.setState({fairnessComment:e.nativeEvent.text})
                            }}
                        />
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderTextView}>
                            <Text styles={{textAlign:'right'}}>Health</Text>
                        </View>
                        <View style={{flex:4, justifyContent: "center"}}>
                            <Slider
                                style={{flex:1, width:'100%', height:40}}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                value={50}
                                onValueChange={val => this.setState({healthValue:val})}
                            />
                        </View>
                        <View style={styles.sliderTextView}>
                            <Text>{this.state.healthValue}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.commentContainer}>
                        <View style={{flex:1}}/>

                        <AutoGrowingTextInput 
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            onEndEditing={e => {
                                Keyboard.dismiss
                                this.setState({healthComment:e.nativeEvent.text})
                                console.log(this.state.healthComment)
                            }}
                        />
                    </View>
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