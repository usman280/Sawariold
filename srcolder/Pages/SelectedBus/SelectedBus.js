import React, { Component } from "react";
import SingleBus from "./SingleBus";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationEvents } from "react-navigation";
import { View, TouchableOpacity, Text } from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

class SelectedBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numofseats: 1,
      Bus_Number: null,
      Departure_Time: null,
      Arrival_Time: null,
      Rating: null,
      Company_Name: null,
      Total_Amount: null,
      Trip_Time: null,
      mytoken: null,
      myid: null
    };
  }

  Fetch() {
    let BusNumber = this.props.navigation.getParam("Bus_Number", "NO-ID");
    let DepartureTime = this.props.navigation.getParam(
      "Departure_Time",
      "NO-ID"
    );
    let ArrivalTime = this.props.navigation.getParam("Arrival_Time", "NO-ID");
    let TripTime = this.props.navigation.getParam("Trip_Time", "NO-ID");
    let TotalAmount = this.props.navigation.getParam("Total_Amount", "NO-ID");
    let BusRating = this.props.navigation.getParam("Rating", "NO-ID");
    let CompanyName = this.props.navigation.getParam("Company_Name", "NO-ID");
    this.setState({
      Bus_Number: BusNumber,
      Departure_Time: DepartureTime,
      Arrival_Time: ArrivalTime,
      Rating: BusRating,
      Total_Amount: TotalAmount,
      Trip_Time: TripTime,
      Company_Name: CompanyName
    });

    console.log("Times??");
  }

  static navigationOptions = {
    title: "Bus Details"
  };

  decrementSeat = () => {
    if (this.state.numofseats != 1) {
      this.setState({ numofseats: this.state.numofseats - 1 });
    }
  };

  incrementSeat = () => {
    if (this.state.numofseats != 10) {
      this.setState({ numofseats: this.state.numofseats + 1 });
    }
  };

  async getidandtoken() {
    try {
      await AsyncStorage.getItem("fcmToken").then(res => {
        this.setState({ mytoken: res });
      });
    } catch (e) {}

    try {
      await AsyncStorage.getItem("myid").then(res => {
        this.setState({ showRealApp: res });
      });
    } catch (e) {}
  }

  bashu = () => {
    const AuthData = {
      id: this.state.myid,
      token: this.state.mytoken
    };

    axios
      .post("http://192.168.1.242:5000/api/users/notify", AuthData)
      .then(res => res.data)
      .then(data => {
        console.log("triggered");
      });

    console.log(this.state.mytoken);
    var total = this.state.numofseats * this.state.Total_Amount;
    var fbill = (total * 75) / 100;
    var ebill = (total * 85) / 100;
    var cbill = (total * 90) / 100;
    this.props.navigation.navigate("PaymentOptions", {
      realbill: total,
      foreebill: fbill,
      easypaisabill: ebill,
      cardbill: cbill
    });
  };

  render() {
    return (
      <View>
        <NavigationEvents
          onDidFocus={() => {
            this.getidandtoken();
            this.Fetch();
          }}
        />

        <View
          style={{
            flexDirection: "row",
            height: responsiveHeight(10),
            backgroundColor: "#05004E",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({
                Bus_Number: null,
                Departure_Time: null,
                Arrival_Time: null,
                Rating: null,
                Total_Amount: null,
                Trip_Time: null,
                Company_Name: null
              });
              this.props.navigation.navigate("BusesList");
            }}
          >
            <AntDesign
              name="arrowleft"
              size={responsiveHeight(3)}
              color="#fff"
              style={{ paddingLeft: responsiveWidth(2) }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              marginLeft: responsiveHeight(2),
              fontSize: responsiveHeight(3),
              paddingLeft: responsiveWidth(27.5)
            }}
          >
            Bus Details
          </Text>
        </View>
        <SingleBus
          Bus_Number={this.state.Bus_Number}
          Departure_Time={this.state.Departure_Time + ":00"}
          Arrival_Time={this.state.Arrival_Time + ":00"}
          Remaining_Seats="10"
          Trip_Time={this.state.Trip_Time + "hours"}
          Total_Amount={this.state.Total_Amount}
          Rating={this.state.Rating}
          Company_Name={this.state.Company_Name}
          seatNumbers={this.state.numofseats}
          onMinusPress={this.decrementSeat}
          onPlusPress={this.incrementSeat}
          onPress={this.bashu}
        />
      </View>
    );
  }
}
export default SelectedBus;
