import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
import firebase from "react-native-firebase";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Axios from "axios";

class PaymentOptions extends Component {
  static navigationOptions = {
    title: "Payment Options"
  };

  notifica = () => {
    let notification = new firebase.notifications.Notification();
    notification
      .setSound("default")
      .setNotificationId("12312321321321")
      .setTitle("Schedueled")
      .setBody("Bus is 10 mins away")
      .android.setChannelId("fcm_FirebaseNotifiction_default_channel")
      .android.setSmallIcon("@drawable/icon_liked")
      .android.setColor("#000000")
      .android.setPriority(firebase.notifications.Android.Priority.Max)
      .setData({
        title: "Schedueled",
        body: "Bus is 15 mins away"
      });

    const date = new Date();

    /* var day = new Date();
         console.log(day); // Apr 30 2000
 
         var nextDay = new Date(day);
         nextDay.setDate(day.getDate()+1);
        nextDay.setTime(5);
         console.log(nextDay); // May 01 2000
         
         console.log("Current time", nextDay.getHours());
 
 
         nextDay.setSeconds(nextDay.getHours() + 10); */
    date.setSeconds(date.getSeconds() + 10);

    firebase
      .notifications()
      .scheduleNotification(notification, {
        fireDate: date.getTime()
      })
      .catch(err => console.error(err));

    firebase
      .notifications()
      .getScheduledNotifications()
      .then(notifications => {
        console.log("logging notifications", notifications);
      });
  };

  render() {
    let amounts = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            height: responsiveHeight(10),
            backgroundColor: "#05004E",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SelectedBus")}
            style={{ paddingLeft: responsiveWidth(3) }}
          >
            <AntDesign
              name="arrowleft"
              size={responsiveHeight(3)}
              color="#fff"
            />
          </TouchableOpacity>
          <View>
            <Text style={{ color: "#fff", fontSize: responsiveHeight(3) }}>
              Payment Options
            </Text>
          </View>

          <View></View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: responsiveHeight(5),
            height: responsiveHeight(100)
          }}
        >
          <View style={{ height: responsiveHeight(8) }}>
            <View style={styles.mainContainer}>
              <Text style={styles.textStyle}>Total Payment</Text>
              <Text style={styles.textStyle}>{amounts.realbill}</Text>
            </View>
          </View>

          <View style={styles.digitalPaymentsContainer}>
            <View style={{ borderRadius: 15, elevation: 1.2 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: responsiveWidth(94),
                  height: responsiveHeight(13)
                }}
                onPress={this.notifica()}
              >
                <View style={styles.discountedAmountMainContainer}>
                  <View style={styles.discountandImageContainer}>
                    <Text style={styles.discountText}>25% Discount</Text>
                    <Image
                      source={require("../../../assets/foree.png")}
                      style={styles.imageStyle}
                    />
                  </View>
                  <View>
                    <Text style={styles.registerlinkStyle}>
                      Don't have a Foree Account ?
                    </Text>
                  </View>
                </View>

                <View style={styles.discountedAmountSubContainer}>
                  <Text style={styles.discountedAmountStyle}>
                    {amounts.foreebill}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: responsiveWidth(94),
                  height: responsiveHeight(13)
                }}
                onPress={this.notifica()}
              >
                <View style={styles.discountedAmountMainContainer}>
                  <View style={styles.discountandImageContainer}>
                    <Text style={styles.discountText}>15% Discount</Text>
                    <Image
                      source={require("../../../assets/ezpaisa.png")}
                      style={styles.imageStyle}
                    />
                  </View>
                  <View>
                    <Text style={styles.registerlinkStyle}>
                      Don't have an EasyPaisa Account ?
                    </Text>
                  </View>
                </View>

                <View style={styles.discountedAmountSubContainer}>
                  <Text style={styles.discountedAmountStyle}>
                    {amounts.easypaisabill}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: responsiveWidth(94),
                  height: responsiveHeight(13)
                }}
                onPress={this.notifica()}
              >
                <View style={styles.discountedAmountMainContainer}>
                  <View style={styles.discountandImageContainer}>
                    <Text style={styles.discountText}>10% Discount</Text>
                    <Entypo
                      name="credit-card"
                      size={responsiveHeight(7)}
                      color="#000"
                    />
                  </View>
                </View>

                <View style={styles.discountedAmountSubContainer}>
                  <Text style={styles.discountedAmountStyle}>
                    {amounts.cardbill}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: responsiveHeight(40), alignItems: "center" }}>
            <View style={{ borderRadius: 15, elevation: 1.2 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: responsiveWidth(94),
                  height: responsiveHeight(13)
                }}
                onPress={this.notifica()}
              >
                <View style={styles.discountedAmountMainContainer}>
                  <View style={styles.discountandImageContainer}>
                    <Text style={styles.discountText}>No Discount</Text>
                    <MaterialCommunityIcons
                      name="cash"
                      size={responsiveHeight(8)}
                      color="#000"
                    />
                  </View>
                </View>

                <View style={styles.discountedAmountSubContainer}>
                  <Text style={styles.discountedAmountStyle}>
                    {amounts.realbill}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    elevation: 1,
    width: responsiveWidth(94),
    alignItems: "center",
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveHeight(5)
  },
  discountedAmountMainContainer: {
    width: responsiveWidth(76),
    paddingHorizontal: responsiveHeight(1),
    paddingVertical: responsiveHeight(1),
    justifyContent: "center"
  },
  discountText: {
    textAlign: "center",
    fontSize: responsiveHeight(2.5),
    color: "#000"
  },

  discountedAmountSubContainer: {
    justifyContent: "center",
    width: responsiveWidth(18),
    alignItems: "center",
    borderLeftColor: "#000",
    borderLeftWidth: 1
  },

  discountedAmountStyle: {
    textAlign: "center",
    fontSize: responsiveHeight(2.5),
    color: "#000"
  },

  registerlinkStyle: {
    fontSize: responsiveHeight(2)
  },

  separator: {
    backgroundColor: "#000",
    width: responsiveWidth(94),
    height: responsiveWidth(1)
  },

  imageStyle: {
    height: responsiveHeight(7),
    width: responsiveWidth(20)
  },

  textStyle: {
    fontSize: responsiveHeight(2.5),
    textAlign: "center",
    color: "#000"
  },
  digitalPaymentsContainer: {
    height: responsiveHeight(50),
    justifyContent: "center",
    alignItems: "center"
  },
  discountandImageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: responsiveHeight(2)
  }
});

export default PaymentOptions;
