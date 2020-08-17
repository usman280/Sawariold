import React from 'react';
import { Dimensions, View } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Settings from '../NavigationScreens/Settings';
import MenuDrawer from './MenuDrawer';
import MyTrips from '../NavigationScreens/MyTrips';
import Payments from '../NavigationScreens/Payments';

import BusesList from '../src/BusesList';
import CustomMapView from '../src/CustomMapView';
import SelectedBus from '../src/SelectedBus';
import PaymentOptions from '../src/PaymentOptions';
import Preferences from '../src/Preferences';
import ChoosePreferences from '../src/ChoosePreferences';
import SignupPage from '../src/SignupPage';
import MyMap from '../src/MyMap';
import Search from '../src/Search';

const WIDTH = Dimensions.get('window').width;

// DrawerNavigator.navigationOptions = ({ navigation }) => ({
//     drawerLockMode: navigation.state.index === 0 ? 'unlocked' : 'locked-closed',
//   });


const DrawerConfig = {

    drawerLockMode: 'locked-closed',
    drawerWidth: WIDTH * 0.75,
    contentComponent: ({ navigation }) => {
        return (
            <View style={{ flex: 1 }}>
                <MenuDrawer navigation={navigation} />
            </View>
        );
    }
}


const DrawerNavigator = createDrawerNavigator({

    CustomMapView: {
        screen: CustomMapView
    },
    SignupPage: {
        screen: SignupPage
    },
    MyTrips: {
        screen: MyTrips
    },
    Preferences: {
        screen: Preferences
    },
    Search: {
        screen: Search
    },
    ChoosePreferences: {
        screen: ChoosePreferences
    },
    Payments: {
        screen: Payments
    },
    Settings: {
        screen: Settings
    },
    MyMap: {
        screen: MyMap
    },
    BusesList: {
        screen: BusesList
    },
    SelectedBus: {
        screen: SelectedBus,
    },
    PaymentOptions: {
        screen: PaymentOptions,
    }
},
    DrawerConfig
);



export default createAppContainer(DrawerNavigator);