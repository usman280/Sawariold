import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BorderLayout from "../../components//BorderLayout";

import AsyncStorage from "@react-native-community/async-storage";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mob: null
    };
  }
  componentDidMount() {
    try {
      AsyncStorage.getItem("@number").then(res => {
        value = res;
        this.setState({ mob: value });
        //console.log(this.state.mobilenumber);
      });
    } catch (e) {}
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <BorderLayout>
          <Text style={styles.alertTextstyle}>
            {" "}
            Do you want to set preferences for the bus ?
          </Text>

          <View style={styles.buttonGroupContainer}>
            <TouchableOpacity style={styles.singleButtonContainer}>
              <Text
                style={styles.buttonText}
                onPress={() => this.props.navigation.navigate("SearchBus")}
              >
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.singleButtonContainer}>
              <Text
                style={styles.buttonText}
                onPress={() => {
                  console.log(this.state.mob);
                  this.props.navigation.navigate("ChoosePreferences", {
                    op: this.state.mob
                  });
                }}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </BorderLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alertTextstyle: {
    textAlign: "center",
    fontSize: responsiveHeight(2.5),
    color: "#05004E"
  },

  buttonGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(2)
  },

  singleButtonContainer: {
    backgroundColor: "#D5436A",
    marginHorizontal: responsiveWidth(5),
    borderRadius: 7
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    fontSize: responsiveHeight(2.5),
    color: "#fff"
  }
});

export default Preferences;
