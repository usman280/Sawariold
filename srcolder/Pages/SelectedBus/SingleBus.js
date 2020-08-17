import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/FontAwesome5";
import ButtonField from "../../components/ButtonField";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const SingleBus = ({
  Bus_Number,
  onMinusPress,
  onPlusPress,
  Rating,
  Company_Name,
  Departure_Time,
  Arrival_Time,
  Total_Amount,
  Trip_Time,
  Remaining_Seats,
  onPress,
  seatNumbers
}) => {
  return (
    <View style={{ alignItems: "center", height: responsiveHeight(100) }}>
      <View
        style={{
          alignItems: "center",
          marginTop: responsiveHeight(4),
          marginBottom: responsiveHeight(4),
          height: responsiveHeight(10)
        }}
      >
        <Icon name="bus" size={responsiveHeight(7)} color="#000" />
        <Text
          style={{
            fontSize: responsiveHeight(2.3),
            paddingTop: responsiveHeight(2)
          }}
        >
          {Bus_Number}
        </Text>
      </View>
      <View
        style={{
          height: responsiveWidth(0.75),
          width: responsiveWidth(100),
          backgroundColor: "#D5436A"
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: responsiveWidth(100),
          height: responsiveHeight(10)
        }}
      >
        <View
          style={{
            width: responsiveWidth(25),
            marginLeft: responsiveHeight(2),
            marginVertical: responsiveHeight(1)
          }}
        >
          <View
            style={{
              borderColor: "#000",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: responsiveHeight(2.5),
                padding: responsiveHeight(1),
                color: "#d5436a"
              }}
            >
              Features
            </Text>
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(75),
            flexDirection: "row",
            paddingVertical: responsiveWidth(2),
            paddingHorizontal: responsiveWidth(5),
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{ borderColor: "#000", borderRadius: 15, borderWidth: 1 }}
          >
            <Text
              style={{
                padding: responsiveHeight(1),
                color: "#d5436a",
                fontSize: responsiveHeight(2.3)
              }}
            >
              {Rating}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: responsiveWidth(2)
            }}
          >
            <Icon name="star" color="#000" size={responsiveHeight(3)} />
            <Icon name="star" color="#000" size={responsiveHeight(3)} />
            <Icon name="star" color="#000" size={responsiveHeight(3)} />
            <Icon name="star" color="#000" size={responsiveHeight(3)} />
            <Icon name="star" color="#000" size={responsiveHeight(3)} />
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#000",
          width: responsiveWidth(100),
          height: responsiveWidth(0.5)
        }}
      />

      <View
        style={{
          flexDirection: "row",
          width: responsiveWidth(100),
          justifyContent: "space-between",
          height: responsiveHeight(32)
        }}
      >
        <View
          style={{
            width: responsiveWidth(70),
            paddingHorizontal: responsiveHeight(1.5),
            paddingTop: responsiveHeight(2),
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: responsiveHeight(2.5), letterSpacing: 2 }}>
            {Company_Name}
          </Text>

          <View>
            <Text
              style={{
                paddingTop: responsiveHeight(2.3),
                fontSize: responsiveHeight(2.5)
              }}
            >
              Trip Time: {Trip_Time}
            </Text>
            <Text style={{ fontSize: responsiveHeight(2.3) }}>
              Remaining Seats: {Remaining_Seats}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: responsiveHeight(8)
            }}
          >
            <Icon
              name="first-aid"
              size={responsiveHeight(3)}
              color="#000"
              style={{ paddingHorizontal: responsiveWidth(0.5) }}
            />
            <Icon
              name="tv"
              size={responsiveHeight(3)}
              color="#000"
              style={{ paddingHorizontal: responsiveWidth(0.5) }}
            />
            <Icon
              name="wifi"
              size={responsiveHeight(3)}
              color="#000"
              style={{ paddingHorizontal: responsiveWidth(0.5) }}
            />
            <MaterialCommunityIcon
              name="popcorn"
              size={responsiveHeight(3)}
              color="#000"
              style={{ paddingHorizontal: responsiveWidth(0.5) }}
            />
            <FontAwesome
              name="book"
              size={responsiveHeight(3)}
              color="#000"
              style={{ paddingHorizontal: responsiveWidth(0.5) }}
            />
          </View>
        </View>

        <View
          style={{
            responsiveWidth: responsiveWidth(30),
            alignItems: "center",
            paddingHorizontal: responsiveHeight(2),
            paddingTop: responsiveHeight(2),
            paddingBottom: responsiveHeight(1.5)
          }}
        >
          <View
            style={{
              borderColor: "#000",
              borderRadius: 15,
              borderWidth: 1,
              padding: responsiveHeight(1),
              marginBottom: responsiveHeight(1)
            }}
          >
            <Text style={{ fontSize: responsiveHeight(2.3) }}>
              {" "}
              Rs {Total_Amount}
            </Text>
          </View>

          <View
            style={{
              borderColor: "#000",
              alignItems: "center",
              borderRadius: 15,
              borderWidth: 1,
              marginTop: responsiveHeight(8.5),
              paddingVertical: responsiveHeight(1),
              paddingHorizontal: responsiveHeight(1)
            }}
          >
            <Text style={{ fontSize: responsiveHeight(2.3) }}>
              {Departure_Time}
            </Text>
            <AntDesign
              name="arrowdown"
              size={responsiveHeight(3)}
              color="#000"
            />
            <Text style={{ fontSize: responsiveHeight(2.3) }}>
              {Arrival_Time}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          height: responsiveHeight(0.5),
          backgroundColor: "#000",
          width: responsiveWidth(100)
        }}
      />

      <View
        style={{
          alignItems: "center",
          marginVertical: responsiveHeight(1),
          height: responsiveHeight(20)
        }}
      >
        <Text style={{ fontSize: responsiveHeight(3) }}>Seats</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: responsiveHeight(1)
          }}
        >
          <TouchableOpacity onPress={onMinusPress}>
            <AntDesign
              name="minuscircle"
              size={responsiveHeight(3.5)}
              color="#000"
              style={{ paddingRight: responsiveHeight(2) }}
            />
          </TouchableOpacity>

          <View
            style={{
              borderRadius: 20,
              borderColor: "#000",
              borderWidth: 1,
              paddingVertical: responsiveHeight(1),
              paddingHorizontal: responsiveHeight(8)
            }}
          >
            <Text style={{ fontSize: responsiveHeight(2.5) }}>
              {seatNumbers}
            </Text>
          </View>

          <TouchableOpacity onPress={onPlusPress}>
            <AntDesign
              name="pluscircle"
              size={responsiveHeight(3.5)}
              color="#000"
              style={{ paddingLeft: responsiveHeight(2) }}
            />
          </TouchableOpacity>
        </View>

        <ButtonField onPress={onPress} buttonText="Proceed To Payment" />
      </View>
    </View>
  );
};

export default SingleBus;
