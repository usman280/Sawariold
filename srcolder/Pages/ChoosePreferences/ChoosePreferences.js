import React from "react";
import { View, ActivityIndicator } from "react-native";
import SingleCheckBox from "./SingleCheckBox";
import ButtonField from "../../components/ButtonField";
import axios from "axios";

class ChoosePreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AC: false,
      NONAC: false,
      Wifi: false,
      TV: false,
      mobilenumber: "",
      loading: false
    };
  }

  componentDidMount() {
    let valle = this.props.navigation.getParam("op", "null");
    this.setState({
      mobilenumber: valle
    });
  }

  addPreferences = () => {
    this.setState({ loading: true });
    const preferences = {
      number: JSON.parse(this.state.mobilenumber),
      ac: this.state.AC,
      wifi: this.state.Wifi,
      tv: this.state.TV
    };

    axios
      .post("http://192.168.1.231:5000/api/users/preferences", preferences)
      .then(res => res.data)
      .then(data => {
        if (data.msg == "success") {
          this.props.navigation.navigate("CustomMapView");
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false });
        }
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SingleCheckBox
            checked={this.state.AC}
            onPress={() => this.setState({ AC: !this.state.AC, NONAC: false })}
            title="AC"
          />
          <SingleCheckBox
            checked={this.state.NONAC}
            onPress={() =>
              this.setState({ NONAC: !this.state.NONAC, AC: false })
            }
            title="Non-AC"
          />
          <SingleCheckBox
            checked={this.state.Wifi}
            onPress={() => this.setState({ Wifi: !this.state.Wifi })}
            title="Wifi"
          />
          <SingleCheckBox
            checked={this.state.TV}
            onPress={() => this.setState({ TV: !this.state.TV })}
            title="TV"
          />

          <ButtonField onPress={() => this.addPreferences()} buttonText="Go" />
        </View>
      );
    }
  }
}
export default ChoosePreferences;
