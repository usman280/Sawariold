import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PrePaidBooking from './PrePaidBooking';

class DigitallyBookedConfirmation extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <PrePaidBooking />
            </View>
        );
    }
};

export default DigitallyBookedConfirmation;