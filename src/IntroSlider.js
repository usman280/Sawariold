import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';

export default class IntroSlider extends Component {


    _onDone = () => {
        try {
            AsyncStorage.setItem('@storage_Key', JSON.stringify(true));
        } catch (e) {
        }
        this.props.navigation.navigate('LoginPage');
    };

    _onSkip = () => {
        try {
            AsyncStorage.setItem('@storage_Key', JSON.stringify(true));
        } catch (e) {
        }
        this.props.navigation.navigate('LoginPage');
    };

    render() {
        return (
            <AppIntroSlider
                slides={slides}
                onDone={this._onDone}
                showSkipButton={true}
                onSkip={this._onSkip}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginTop: 16,
    },
});


const slides = [
    {
        key: 's3',
        title: 'Great Offers',
        titleStyle: styles.title,
        text: 'Enjoy Great offers on our all services',
        image: {
            uri: 'https://aboutreact.com/wp-content/uploads/2018/08/discount1.png',
        },
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    },
    {
        key: 's4',
        title: 'Best Deals',
        titleStyle: styles.title,
        text: ' Best Deals on all our services',
        image: {
            uri: 'https://aboutreact.com/wp-content/uploads/2018/08/best_deals1.png',
        },
        imageStyle: styles.image,
        backgroundColor: '#3395ff',
    },
    {
        key: 's5',
        title: 'Bus Booking',
        titleStyle: styles.title,
        text: 'Enjoy Travelling on Bus with flat 100% off',
        image: {
            uri:
                'https://aboutreact.com/wp-content/uploads/2018/08/bus_ticket_booking.png',
        },
        imageStyle: styles.image,
        backgroundColor: '#f6437b',
    },
];