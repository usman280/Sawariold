import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, InteractionManager } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { NavigationEvents } from "react-navigation";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default class FilterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
      scrollEnabled: false,
      list: [],
      newdata: [],
      twelvetofour: false,
      fourtoeight: false,
      eighttotwelve: false,
      ac: false,
      nonac: false,
      business: false,
      ratingplus2: false,
      ratingplus3: false,
      ratingplus4: false,
      selectedBox: {
        backgroundColor: "#000",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#000"
      }
    };
  }

  recieveList = () => {

    InteractionManager.runAfterInteractions(() => {
      let mon = this.props.navigation.getParam('abc', null);
      if (mon !== null) {
        this.setState({ list: mon });
      }
    });
  };

  componentDidMount() {
    this.setState({ newdata: this.state.list });
  }

  filterData = () => {

    var filtered = this.state.list;

    if (this.state.twelvetofour === true) {
      filtered = filtered.filter(function (a) {
        return (a.pickuptime <= 4)
      })
    }
    else if (this.state.fourtoeight === true) {
      filtered = filtered.filter(function (a) {
        return (a.pickuptime >= 4 && a.pickuptime <= 8)
      });
    }
    else if (this.state.eighttotwelve === true) {
      filtered = filtered.filter(function (a) {
        return (a.pickuptime >= 8 && a.pickuptime < 12)
      });
    }
    else {
      this.setState({ newdata: this.state.list })
    }

    if (this.state.business === true) {
      filtered = filtered.filter(function (a) {
        return a.Bustype == "BUSINESS";
      });
    }
    else if (this.state.ac === true) {
      filtered = filtered.filter(function (a) {
        return a.Bustype == "AC";
      });
    }
    else if (this.state.nonac === true) {
      filtered = filtered.filter(function (a) {
        return a.Bustype == "NON-AC";
      });
    }
    else {
      this.setState({ newdata: this.state.list });
    }

    if (this.state.ratingplus2 === true) {
      filtered = filtered.filter(function (a) {
        return a.rating > 2
      });
    }
    else if (this.state.ratingplus3 === true) {
      filtered = filtered.filter(function (a) {
        return a.rating > 3
      });
    }
    else if (this.state.ratingplus4 === true) {
      filtered = filtered.filter(function (a) {
        return a.rating > 4;
      });
    }
    else {
      this.setState({ newdata: this.state.list });
    }

    this.props.navigation.navigate('BusesList', { arr: filtered });
  };

  render() {

    return (
      <View>
        <NavigationEvents onDidFocus={() => this.recieveList()} />
        <View
          style={{
            height: responsiveHeight(50),
            width: responsiveWidth(100),
            opacity: 0.1
          }}
        >
          <View style={styles.container}>
            <FlatList
              data={this.state.list}
              renderItem={({ item }) => (
                <View style={{ flex: 1, margin: responsiveHeight(2) }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#000",
                      borderRadius: 10
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          width: "80%",
                          justifyContent: "space-between"
                        }}
                      >
                        <View
                          style={{
                            justifyContent: "center",
                            width: "40%",
                            alignItems: "center",
                            marginTop: responsiveHeight(1),
                            marginLeft: responsiveWidth(4)
                          }}
                        >
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2),
                              color: "#000"
                            }}
                          >
                            {item.Bustraveller}
                          </Text>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2),
                              color: "#000"
                            }}
                          >
                            {item.Bustype}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                            marginBottom: responsiveHeight(0.5)
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            {item.firstaid ? (
                              <FontAwesome5
                                name="first-aid"
                                size={responsiveHeight(3)}
                                color="#d5436a"
                                style={{ marginRight: responsiveHeight(1) }}
                              />
                            ) : null}
                            {item.tv ? (
                              <Entypo
                                name="tv"
                                size={responsiveHeight(3)}
                                color="#d5436a"
                                style={{ marginRight: responsiveHeight(1) }}
                              />
                            ) : null}
                            {item.wifi ? (
                              <Icon
                                name="wifi"
                                size={responsiveHeight(3)}
                                color="#d5436a"
                              />
                            ) : null}
                          </View>

                          <Text
                            style={{
                              fontSize: responsiveHeight(2),
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >
                            Trip time: {item.triptime}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{ width: "20%", padding: responsiveHeight(1) }}
                      >
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "#000",
                            borderRadius: 5,
                            marginVertical: responsiveHeight(1),
                            alignItems: "center",
                            paddingVertical: responsiveHeight(0.5)
                          }}
                        >
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.7),
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >
                            {item.price}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "#000",
                            borderRadius: 5,
                            alignItems: "center",
                            paddingVertical: responsiveHeight(0.5)
                          }}
                        >
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.7),
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >
                            {item.pickuptime}
                          </Text>
                          <Icon name="arrowdown" size={30} color="#000" />
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.7),
                              color: "#000",
                              fontWeight: "bold"
                            }}
                          >
                            {item.dropofftime}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.Busnumber}
              ItemSeparatorComponent={this.renderSeparator}
              scrollEnabled={this.state.scrollEnabled}
            />
          </View>
        </View>

        <View style={{ height: responsiveHeight(50) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: responsiveHeight(5),
              alignItems: "center",
              marginHorizontal: responsiveHeight(2)
            }}
          >
            <TouchableOpacity
              //onPress = { () => console.log(this.state.list)}
              onPress={() => this.props.navigation.navigate("BusesList", { arr: this.state.newdata })}
            >
              <Entypo
                name="circle-with-cross"
                size={responsiveHeight(4)}
                color="#000"
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Filter by</Text>
            <TouchableOpacity onPress={() => this.filterData()}>
              <Text style={styles.headerText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ height: responsiveHeight(0.7), backgroundColor: "#000" }}
          />

          <View
            style={{
              height: responsiveHeight(13),
              justifyContent: "space-around"
            }}
          >
            <Text style={styles.titleStyle}>Departure Time</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {this.state.twelvetofour ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() => {
                    this.setState({
                      twelvetofour: false,
                      fourtoeight: false,
                      eighttotwelve: false
                    });
                  }}
                >
                  <Text style={styles.boxTextStyle}>12:00-4:00</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() => {
                      this.setState({
                        twelvetofour: true,
                        fourtoeight: false,
                        eighttotwelve: false
                      });
                    }}
                  >
                    <Text style={styles.boxTextStyle}>12:00-4:00</Text>
                  </TouchableOpacity>
                )}

              {this.state.fourtoeight ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() =>
                    this.setState({
                      twelvetofour: false,
                      fourtoeight: false,
                      eighttotwelve: false
                    })
                  }
                >
                  <Text style={styles.boxTextStyle}>4:00-8:00</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() =>
                      this.setState({
                        twelvetofour: false,
                        fourtoeight: true,
                        eighttotwelve: false
                      })
                    }
                  >
                    <Text style={styles.boxTextStyle}>4:00-8:00</Text>
                  </TouchableOpacity>
                )}

              {this.state.eighttotwelve ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() =>
                    this.setState({
                      twelvetofour: false,
                      fourtoeight: false,
                      eighttotwelve: false
                    })
                  }
                >
                  <Text style={styles.boxTextStyle}>8:00-12:00</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() =>
                      this.setState({
                        twelvetofour: false,
                        fourtoeight: false,
                        eighttotwelve: true
                      })
                    }
                  >
                    <Text style={styles.boxTextStyle}>8:00-12:00</Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>

          <View
            style={{ height: responsiveHeight(0.7), backgroundColor: "#000" }}
          />

          <View
            style={{
              height: responsiveHeight(13),
              justifyContent: "space-around"
            }}
          >
            <Text style={styles.titleStyle}>Bus Type</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {this.state.ac ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() =>
                    this.setState({ ac: false, business: false, nonac: false })
                  }
                >
                  <Text style={styles.boxTextStyle}>AC</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() =>
                      this.setState({ ac: true, business: false, nonac: false })
                    }
                  >
                    <Text style={styles.boxTextStyle}>AC</Text>
                  </TouchableOpacity>
                )}

              {this.state.business ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() =>
                    this.setState({ ac: false, business: false, nonac: false })
                  }
                >
                  <Text style={styles.boxTextStyle}>Business</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() =>
                      this.setState({ ac: false, business: true, nonac: false })
                    }
                  >
                    <Text style={styles.boxTextStyle}>Business</Text>
                  </TouchableOpacity>
                )}

              {this.state.nonac ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() =>
                    this.setState({ ac: false, business: false, nonac: false })
                  }
                >
                  <Text style={styles.boxTextStyle}>NON-AC</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() =>
                      this.setState({ ac: false, business: false, nonac: true })
                    }
                  >
                    <Text style={styles.boxTextStyle}>NON-AC</Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>

          <View
            style={{ height: responsiveHeight(0.7), backgroundColor: "#000" }}
          />

          <View
            style={{
              height: responsiveHeight(13),
              justifyContent: "space-around"
            }}
          >
            <Text style={styles.titleStyle}>Bus Rating</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {this.state.ratingplus2 ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() =>
                    this.setState({
                      ratingplus2: false,
                      ratingplus3: false,
                      ratingplus4: false
                    })
                  }
                >
                  <Text style={styles.boxTextStyle}>2+ Rating</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() =>
                      this.setState({
                        ratingplus2: true,
                        ratingplus3: false,
                        ratingplus4: false
                      })
                    }
                  >
                    <Text style={styles.boxTextStyle}>2+ Rating</Text>
                  </TouchableOpacity>
                )}

              {this.state.ratingplus3 ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() =>
                    this.setState({
                      ratingplus2: false,
                      ratingplus3: false,
                      ratingplus4: false
                    })
                  }
                >
                  <Text style={styles.boxTextStyle}>3+ Rating</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() =>
                      this.setState({
                        ratingplus2: false,
                        ratingplus3: true,
                        ratingplus4: false
                      })
                    }
                  >
                    <Text style={styles.boxTextStyle}>3+ Rating</Text>
                  </TouchableOpacity>
                )}

              {this.state.ratingplus4 ? (
                <TouchableOpacity
                  style={this.state.selectedBox}
                  onPress={() =>
                    this.setState({
                      ratingplus2: false,
                      ratingplus3: false,
                      ratingplus4: false
                    })
                  }
                >
                  <Text style={styles.boxTextStyle}>4+ Rating</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.boxStyle}
                    onPress={() =>
                      this.setState({
                        ratingplus2: false,
                        ratingplus3: false,
                        ratingplus4: true
                      })
                    }
                  >
                    <Text style={styles.boxTextStyle}>4+ Rating</Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  titleStyle: {
    fontSize: responsiveHeight(3.5),
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center"
  },
  boxStyle: {
    backgroundColor: "#d5436a",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#d5436a"
  },
  headerText: {
    fontSize: responsiveHeight(3.5),
    color: "#000",
    fontWeight: "bold"
  },
  boxTextStyle: {
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(1),
    fontSize: responsiveHeight(2.5),
    fontWeight: "bold",
    color: "#fff"
  }
});
