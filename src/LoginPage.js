import React, { Component } from "react";
import { Text, View, Keyboard, ActivityIndicator, AppState } from "react-native";
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';
import PhoneCodeInput from "../components/PhoneCodeInput";
import PhoneNumberInput from '../components/PhoneNumberInput';
import { fetchUserData, setnumber } from "../actions/authActions";
import { connect } from "react-redux";

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      phoneNumber: "+92",
      message: "",
      codeInput: "",
      user: null,
      confirmResult: null,
      loading: false,
    };
  }


  signIn = () => {
    const { phoneNumber } = this.state;
    if (phoneNumber !== null && phoneNumber.length == 13) {
      this.setState({ message: "Sending code ..." });
      firebase.auth().signInWithPhoneNumber(phoneNumber).then(confirmResult => {
        this.setState({ confirmResult, message: "Code has been sent" });
        this.props.setnumber(this.state.phoneNumber);
      });
    }
    else {
      this.setState({ message: "Please enter valid number" });
    }
  }

  confirmCode = () => {

    const { codeInput, confirmResult } = this.state;

    const ab = {
      phonenumber: this.state.phoneNumber
    };

    this.props.fetchUserData(ab, () => {

      if (this.props.auth.user.name !== undefined) {

        if (confirmResult && codeInput.length) {

          this.setState({ loading: true });
          confirmResult.confirm(codeInput).then(user => {

            this.setState({ message: "",  });
            AsyncStorage.setItem('@number', JSON.stringify(this.state.phoneNumber));
            AsyncStorage.setItem('@userlogindata', JSON.stringify(this.props.auth.user));
            this.props.navigation.navigate('DrawerNavigator');
            this.setState({ confirmResult: null, loading: false, phoneNumber:'+92', codeInput:'' });
          })
            .catch(error =>
              this.setState({ message: `Code Confirm Error`, loading: false })
            );
        }
      }
      else {
        confirmResult.confirm(codeInput).then(user => {

          this.setState({ message: "" });
          AsyncStorage.setItem('@number', JSON.stringify(this.state.phoneNumber));
          this.props.navigation.navigate('SignupPage');
          this.setState({ confirmResult: null, loading: false , phoneNumber:'+92', codeInput:''})
        })
          .catch(error =>
            this.setState({ message: `Code Confirm Error`, loading: false , })
          );
      }
    });
  };

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <PhoneNumberInput
        onChangeText={value => this.setState({ phoneNumber: value })}
        placeholder={"Phone number ... "}
        value={phoneNumber}
        onPress={() => {
          Keyboard.dismiss();
          this.signIn();
        }}
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
        onPress={() => {
          Keyboard.dismiss();
          this.confirmCode();
        }}
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

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  fetchUserData, setnumber
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

