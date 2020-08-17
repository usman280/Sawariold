import React, { Component, Fragment } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { sourceName, destinationeName } from "../actions/BusesListAction";

var location = [
  {
    name: "karachi",
    coordinate: {
      latitude: 24.8667795,
      longitude: 67.0311286
    }
  },
  {
    name: "hyderabad",
    coordinate: {
      latitude: 25.3801,
      longitude: 68.375
    }
  },
  {
    name: "multan",
    coordinate: {
      latitude: 30.1979793,
      longitude: 71.4724978
    }
  },
  {
    name: "lahore",
    coordinate: {
      latitude: 31.5656079,
      longitude: 74.3141775
    }
  },
  {
    name: "peshawar",
    coordinate: {
      latitude: 34.0123846,
      longitude: 71.5787458
    }
  },
  {
    name: "islamabad",
    coordinate: {
      latitude: 33.6357394,
      longitude: 72.9230467
    }
  },
  {
    name: "quetta",
    coordinate: {
      latitude: 30.1891852,
      longitude: 67.0184433
    }
  },
  {
    name: "gilgit",
    coordinate: {
      latitude: 35.9208102,
      longitude: 74.314044
    }
  }
];

var firstvalue = null;

class DropDown extends Component {
  componentDidMount() {
    try {
      AsyncStorage.getItem("@number").then(res => {
        var value = res;
        this.setState({ phoneNumber: value });
      });
    } catch (e) {}
  }

  getcord = () => {
    console.log(this.state.selectedItems);
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      show: false,
      pushitem: null,
      latitude: null,
      longitude: null,
      phoneNumber: null,
      latitude1: null,
      longitude1: null,
      firstname: null,
      secondname: null
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <SearchableDropdown
            onItemSelect={item => {
              const itemsselected = this.state.selectedItems;
              itemsselected.push(item);

              firstvalue = item;
              this.setState({ show: true, pushitem: item });

              this.props.sourceName(item.name);

              var previousdata = location;

              this.setState({
                latitude: item.coordinate.latitude,
                firstname: item.name,
                longitude: item.coordinate.longitude
              });

              var rebels = location.filter(function(city) {
                return city.name !== item.name;
              });
              if (firstvalue !== null) {
                location.push(firstvalue);
                firstvalue = null;
              }

              location = rebels;
              if (location.length < 7) {
                location = previousdata;
              }

              this.setState({ selectedItems: itemsselected });
            }}
            containerStyle={{
              marginHorizontal: 20,
              paddingHorizontal: 10
            }}
            itemStyle={{
              padding: 12,
              borderWidth: 1,
              borderTopWidth: 0,
              borderColor: "#000",
              backgroundColor: "#fff"
            }}
            itemTextStyle={{ color: "#222" }}
            itemsContainerStyle={{ maxHeight: 180 }}
            items={location}
            defaultIndex={0}
            resetValue={false}
            textInputProps={{
              placeholder: "  From",
              underlineColorAndroid: "transparent",
              style: {
                marginTop: 10,
                padding: 12,
                borderWidth: 2,
                borderColor: "#000"
              }
            }}
            listProps={{
              nestedScrollEnabled: true
            }}
          />
        </View>

        <View>
          {this.state.show ? (
            <SearchableDropdown
              onItemSelect={item => {
                const itemsselected = this.state.selectedItems;
                itemsselected.push(item);
                secondvalue = item;

                this.props.destinationeName(item.name);

                this.setState({
                  secondname: item.name,
                  latitude1: item.coordinate.latitude,
                  longitude1: item.coordinate.longitude
                });

                let source = {
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitude1: this.state.latitude1,
                  longitude1: this.state.longitude1,
                  number: this.state.phoneNumber
                };

                this.props.navigation.navigate("BusesList", source);

                this.setState({ selectedItems: itemsselected, show: false });
                location.push(this.state.pushitem);
                console.log("kuch h kia", firstvalue);
                console.log("state wala value", this.state.pushitem);
              }}
              containerStyle={{
                marginHorizontal: 20,
                paddingHorizontal: 10
              }}
              itemStyle={{
                padding: 12,
                borderWidth: 1,
                borderTopWidth: 0,
                borderColor: "#000",
                backgroundColor: "#fff"
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 180 }}
              items={location}
              resetValue={false}
              textInputProps={{
                placeholder: "To",
                underlineColorAndroid: "transparent",
                style: {
                  marginTop: 10,
                  padding: 12,
                  borderWidth: 2,
                  borderColor: "#000"
                }
              }}
              listProps={{
                nestedScrollEnabled: true
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  buseslist: state.buseslist
});

const mapDispatchToProps = {
  sourceName,
  destinationeName
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDown);
