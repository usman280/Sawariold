import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import DestinationButton from '../components/DestinationButton';
import MenuButton from '../components/MenuButton';
import CurrentLocationButton from '../components/CurrentLocationButton';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import { getMyTrips } from '../actions/authActions';

class CustomMapView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      region: null,
      dummy: undefined,
      numb: null,
    };

  }

  componentDidMount() {
    this._getLocation();
  }
  
  _getLocation() {

    Geolocation.getCurrentPosition(
      (abc) => {
        this.setState({
          region: {
            latitude: abc.coords.latitude,
            longitude: abc.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
          }
        });
      }, (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },

    );
  }

  PinPoint = () => {
    if (this.state.region != null)
      return (
        <View>
          <MapView.Marker coordinate={this.state.region} />
        </View>
      )
  }


  static navigationOptions = {
    header: null,
    drawerLockMode: 'unlocked',
  }
  
  centerMap = () => {

    if (this.state.region !== null) {
      const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;

      this.map.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      })
    }
  }



  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <MenuButton onPress={() => this.props.navigation.openDrawer()} />
        <DestinationButton onPress={() => this.props.navigation.navigate('Search')} />
        <CurrentLocationButton cb={() => { this.centerMap() }} />

        <MapView
          showsUserLocation={true}
          showsMyLocationButton={false}
          style={styles.map}
          ref={(map) => { this.map = map }}
          rotateEnabled={true}
          zoomEnabled={true}
          initialRegion={this.state.region}>

          <View>{this.PinPoint()}</View>

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 0,
  }
});


const mapStateToProps = state => ({
  auth: state.auth,
  buseslist: state.buseslist,
});



export default connect(mapStateToProps, { getMyTrips })(CustomMapView);