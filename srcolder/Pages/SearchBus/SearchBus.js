import React, { Component } from 'react';
import { View, InteractionManager } from 'react-native';
import DrawerNavigator from '../../components/DrawerNavigator';

class SearchBus extends Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <DrawerNavigator />
            </View>
        );
    };
};

export default SearchBus;