import React, { Component } from "react";
import { View, ActivityIndicator, ToastAndroid } from "react-native";
import InputField from "../../components/InputField";
import ButtonField from "../../components/ButtonField";
import axios from "axios";
import { NavigationEvents } from "react-navigation";

class SignupPage extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      mobilenumber: null,
      email: null,
      emailValidate: null,
      loading: false,
      mytoken: null
    };
  }

  nameHandler = name => {
    this.setState({ name: name });
  };
  emailHandler = email => {
    this.setState({ email: email });

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      this.setState({ emailValidate: true });
      console.log("Email is Correct");
    }
  };

  receiveNumberandToken = () => {
    let num = this.props.navigation.getParam("abc", null);
    if (num !== null) {
      this.setState({ mobilenumber: num });
    }
    let tok = this.props.navigation.getParam("qwe", null);
    if (tok !== null) {
      this.setState({ mytoken: tok });
    }
  };

  register = () => {
    this.setState({ loading: true });

    const User = {
      name: this.state.name,
      phonenumber: this.state.mobilenumber,
      email: this.state.email,
      token: this.state.mytoken
    };

    if (this.state.mobilenumber != null) {
      if (this.state.emailValidate == true) {
        axios
          .post("http://192.168.1.231:5000/api/users/registermobile", User)
          .then(res => res.data)
          .then(data => {
            if (data.found == "userexist") {
              this.setState({
                loading: false,
                name: null,
                email: null,
                emailValidate: null,
                mobilenumber: null,
                mytoken: null
              });
            } else {
              if (data.msg == "success") {
                this.setState({
                  loading: false,
                  email: null,
                  name: null,
                  mobilenumber: null,
                  mytoken: null
                });
                this.props.navigation.navigate("Preferences");
              }
            }
          });
      } else {
        this.setState({
          loading: false,
          email: null,
          name: null
        });

        ToastAndroid.show("Invalid Details", ToastAndroid.SHORT);
      }
    }
  };

  static navigationOptions = {
    header: null
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#000" size="large" />
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <NavigationEvents onDidFocus={() => this.receiveNumberandToken()} />

          <InputField
            inputname="name"
            autoCapitalize={"words"}
            onChangeText={this.nameHandler}
            value={this.state.name}
            placeholder="Enter Your Full Name"
          />

          <InputField
            value={this.state.email}
            onChangeText={this.emailHandler}
            inputname="email"
            placeholder="Enter Your Email"
          />

          <ButtonField onPress={() => this.register()} buttonText="Sign Up" />
        </View>
      );
    }
  }
}

export default SignupPage;
