import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import LoginPage from './src/LoginPage';
import IntroSlider from './src/IntroSlider';
import SplashScreen from './src/SplashScreen';
import DrawerNavigator from './components/DrawerNavigator';
import firebase from 'react-native-firebase';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { PermissionsAndroid, Platform } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  SplashScreen: SplashScreen,
  IntroSlider: IntroSlider,
  LoginPage: LoginPage,
  DrawerNavigator: DrawerNavigator,
},
  {
    initialRouteName: 'SplashScreen',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {

  reqPermit = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then((res) => {
      if (res.toString() === "granted") {
        console.log("Permission Granted");
      } else {
        console.log("Asking for Permission....");
      }
    }
    )
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
    this.setState({ mytoken: fcmToken });
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
    }
  }

  async createNotificationListeners() {

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;

      const localNotification = new firebase.notifications.Notification({
        sound: 'sampleaudio',
        show_in_background: true,
      })
        .setSound('sampleaudio.wav')
        .setNotificationId(notification.notificationId)
        .setTitle(title)
        .setBody(body)
        .android.setSmallIcon('@drawable/icon_liked')
        .android.setColor('#000000')
        .android.setPriority(firebase.notifications.Android.Priority.Max);

      //firebase.notifications().removeAllDeliveredNotifications();
      const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotification_default_channel', 'Sawari', firebase.notifications.Android.Importance.Max)
        .setDescription('Demo app description')
        .setSound('sampleaudio.wav')


      firebase.notifications().android.createChannel(channel);

      //if (Platform.Version > 25) {
        localNotification.android.setChannelId('fcm_FirebaseNotification_default_channel');
      //}
      // else {
      //   localNotification
      // }

      firebase.notifications().android.getChannels().then ( res=> {
        console.log("channels :",res);
      })

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });




    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;

    });

    this.my = firebase.notifications().getInitialNotification()
      .then((notification) => {
        console.log("ye ara ha??",notification);
  });
}


  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  componentDidMount() {
    this.reqPermit();
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
    this.messageListener;
    this.my;
    if (this.unsubscribe) this.unsubscribe();
  }



  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

const AppContainer = createAppContainer(AppNavigator);
