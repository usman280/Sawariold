import React, { Component } from 'react';
import { View, StyleSheet, InteractionManager, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import DestinationButton from './DestinationButton';
import MenuButton from './MenuButton';
import CurrentLocationButton from './CurrentLocationButton';
import Geolocation from 'react-native-geolocation-service';

class CustomMapView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      region: null,
    };

  }

  async componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._getLocation();
      this.setState({ loading: false });
    });
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
    header: null
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
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      )
    }
    else {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <MenuButton onPress={() => this.props.navigation.openDrawer()} />
          <DestinationButton onPress={() => this.props.navigation.navigate('DropDown')} />
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
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 0,
  }
})


export default CustomMapView;