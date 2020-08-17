import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  PermissionsAndroid
} from "react-native";
import axios from "axios";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
import PhoneCodeInput from "../../components/PhoneCodeInput";
import PhoneNumberInput from "../../components/PhoneNumberInput";

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      phoneNumber: "+92",
      message: "",
      codeInput: "",
      user: null,
      confirmResult: null,
      name: null,
      email: null,
      loading: false,
      mytoken: null,
      myid: null,
      userfound: null
    };
  }

  async componentDidMount() {
    this.checkUser();
    this.reqPermit();
    this.checkPermission();
    this.createNotificationListeners();
  }

  async reqPermit() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(res => {
      if (res.toString() === "granted") {
        this._getLocation();
      }
    });
  }

  checkUser = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user && this.state.loading == false) {
        console.log(user.phoneNumber);
        this.props.navigation.navigate("DrawerNavigator");
      }
    });
  };

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
    this.messageListener;
    this.my;
    if (this.unsubscribe) this.unsubscribe();
  }

  static navigationOptions = {
    header: null
  };

  signIn = () => {
    const { phoneNumber } = this.state;
    if (phoneNumber !== null && phoneNumber.length == 13) {
      this.setState({ message: "Sending code ..." });

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber)
        .then(confirmResult =>
          this.setState({ confirmResult, message: "Code has been sent" })
        );
    } else {
      this.setState({ message: "Please enter valid number" });
    }
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;
    if (confirmResult && codeInput.length) {
      this.setState({ loading: true });
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({ message: "" });
          const AuthData = {
            phonenumber: this.state.phoneNumber
          };
          AsyncStorage.setItem(
            "@number",
            JSON.stringify(this.state.phoneNumber)
          );

          axios
            .post("http://192.168.1.231:5000/api/users/otplogin", AuthData)
            .then(res => res.data)
            .then(data => {
              if (data.found == "found") {
                this.props.navigation.navigate("DrawerNavigator");
                this.setState({ loading: false, confirmResult: null });
              } else {
                this.props.navigation.navigate("SignupPage", {
                  abc: this.state.phoneNumber,
                  qwe: this.state.mytoken
                });
              }
            });
        })
        .catch(error => this.setState({ message: `Code Confirm Error` }));
    }
  };

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  reqPermit = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(res => {
      if (res.toString() === "granted") {
        console.log("Permission Granted");
      } else {
        console.log("Asking for Permission....");
      }
    });
  };

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    console.log("fcmToken:", fcmToken);
    this.setState({ mytoken: fcmToken });
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      //console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;

        const localNotification = new firebase.notifications.Notification({
          sound: "sampleaudio",
          show_in_foreground: true
        })
          .setSound("sampleaudio.wav")
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId("fcm_FirebaseNotifiction_default_channel")
          .android.setSmallIcon("@drawable/icon_liked")
          .android.setColor("#000000")
          .android.setPriority(firebase.notifications.Android.Priority.Max);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });

    const channel = new firebase.notifications.Android.Channel(
      "fcm_FirebaseNotifiction_default_channel",
      "Demo app name",
      firebase.notifications.Android.Importance.High
    )
      .setDescription("Demo app description")
      .setSound("sampleaudio.wav");
    firebase.notifications().android.createChannel(channel);

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
      });

    this.my = firebase
      .notifications()
      .getInitialNotification()
      .then(notification => {
        console.log("App is killed", notification);
      });
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      console.log("JSON.stringify:", JSON.stringify(message));
    });
  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <PhoneNumberInput
        onChangeText={value => this.setState({ phoneNumber: value })}
        placeholder={"Phone number ... "}
        value={phoneNumber}
        onPress={this.signIn}
      />
    );
  }

  renderMessage = () => {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text
        style={{
          padding: 5,
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center"
        }}
      >
        {message}
      </Text>
    );
  };

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <PhoneCodeInput
        onChangeText={value => this.setState({ codeInput: value })}
        placeholder={"Code ... "}
        value={codeInput}
        onPress={this.confirmCode}
      />
    );
  }

  showLoading() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  render() {
    const { user, confirmResult, loading } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {loading && this.showLoading()}
      </View>
    );
  }
}

export default LoginPage;
