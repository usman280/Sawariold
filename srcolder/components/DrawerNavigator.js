import React from 'react';
import { Dimensions, View } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Settings from '../NavigationScreens/Settings';
import MenuDrawer from './MenuDrawer';
import MyTrips from '../NavigationScreens/MyTrips';
import Payments from '../NavigationScreens/Payments';
import EnterLocations from '../Pages/EnterLocations/EnterLocations';
import MyMap from '../Pages/MyMap/MyMap';
import BusesList from '../Pages/BusesList/BusesList';
import CustomMapView from './CustomMapView';
import SelectedBus from '../Pages/SelectedBus/SelectedBus';
import PaymentOptions from '../Pages/PaymentOptions/PaymentOptions';
import FilterPage from '../Pages/FilterPage/FilterPage';
import SortPage from '../Pages/SortPage/SortPage';
import Preferences from '../Pages/Preferences/Preferences';
import ChoosePreferences from '../Pages/ChoosePreferences/ChoosePreferences';
import SignupPage from '../Pages/SignUpPage/SignupPage';
import DropDown from '../Pages/DropDown/DropDown';

const WIDTH = Dimensions.get('window').width;


const DrawerConfig = {
    
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
    MyTrips: {
        screen: MyTrips
    },
    Preferences: {
        screen: Preferences
    },
    SignupPage: {
        screen: SignupPage
    },
    DropDown: {
        screen: DropDown
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
    EnterLocations: {
        screen: EnterLocations
    },
    MyMap: {
        screen: MyMap
    },
    BusesList: {
        screen: BusesList
    },
    FilterPage: {
        screen: FilterPage
    },
    SortPage: {
        screen: SortPage
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