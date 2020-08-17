import React, { Component } from 'react';
import { View, Text} from 'react-native';
import PostPaid from './PostPaid';

class Cash_Confirmation extends Component {
    render() {
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <PostPaid />
            </View>
        );
    }
};

export default Cash_Confirmation;