import React from 'react';
import { View } from 'react-native';

//Import Components
import HomeItem from './HomeItem/HomeItem';

export default class Home extends React.Component{
    render(){
        const item = this.props.cardConfigs.map(config => {
            return(
                <HomeItem 
                    key={config.restaurantID} 
                    name={config.restaurantName}
                    image={config.image}
                    location={config.location} 
                />
            );
        })
        return(
            <View style={{flex: 1}}>
                {item}
            </View>
        )
    }
}