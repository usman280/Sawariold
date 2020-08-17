import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import firebase from "react-native-firebase";

export default class testing extends Component {
  notifica = () => {
    console.log("Triggered Scheduel");
    console.log();
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

  ok = () => {
    console.log("runnning");
  };



  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={this.notifica}>
          <Text> Hello </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
