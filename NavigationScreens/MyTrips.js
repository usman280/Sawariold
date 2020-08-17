import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import MenuButton from '../components/MenuButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { getTrips } from '../actions/bookingactions';
import { clearRideHistory } from '../actions/authActions'
import { NavigationEvents } from 'react-navigation';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MyTrips extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      error: "no ride History",
      buseslist: [{
        Busnumber: '21321',
        BusCompany: "Bashu Travels",
        Source: "Karachi",
        Destination: "Quetta",
        NumOfSeats: "2",
        Price: "4600",
        Date: "30/2/122"
      },
      {
        Busnumber: '221',
        BusCompany: "FK Travels",
        Source: "Quetta",
        Destination: "Karachi",
        NumOfSeats: "2",
        Price: "4600",
        Date: "22/4/2012"
      },
      {
        Busnumber: '2z21',
        BusCompany: "AJ Travels",
        Source: "Quetta",
        Destination: "Lahore",
        NumOfSeats: "2",
        Price: "4600",
        Date: "30/6/2020"
      },
      {
        Busnumber: 'ABX-378',
        BusCompany: "AJ Travels",
        Source: "Lahore",
        Destination: "Islamabad",
        NumOfSeats: "2",
        Price: "4600",
        Date: "30/6/2020"
      },
      {
        Busnumber: '2zff21',
        BusCompany: "AJ Travels",
        Source: "Hyderabad",
        Destination: "Faislabad",
        NumOfSeats: "2",
        Price: "4600",
        Date: "30/6/2020"
      },
      {
        Busnumber: '2z21nn',
        BusCompany: "AJ Travels",
        Source: "Gilgit",
        Destination: "Karachi",
        NumOfSeats: "2",
        Price: "4600",
        Date: "30/6/2020"
      },
      ],
    }
  }

  componentDidMount() {
    this.props.getTrips(this.props.auth.user._id);
  }

  dateExtractor = (date) => {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();


    var strDate = day + "-" + month + "-" + year;

    return strDate;

  }

  refreshRides=()=>{
    console.log("refreshing call ho rha hai k nhe")

    this.props.getTrips(this.props.auth.user._id);
  }
  render() {
    if (this.props.auth.ridesLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      )
    }
    else {

      if (this.props.auth.ridehistory.length === 0) {
        return (
          <View style={styles.container}>
            <View style={{ backgroundColor: '#842bdd', height: (HEIGHT * 8) / 100, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomMapView')} style={{ paddingLeft: (WIDTH * 4) / 100 }}>
                <AntDesign name='arrowleft' size={(HEIGHT * 4) / 100} color='#fff' />

              </TouchableOpacity>
              <Text style={{ fontSize: (HEIGHT * 2.5) / 100, color: '#fff', position: 'absolute', top: (HEIGHT * 2.5) / 100, left: (WIDTH * 40) / 100 }}>My Trips</Text>
            </View>
            <View style={{ height: (HEIGHT * 92) / 100, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ textAlign: 'center', fontSize: (HEIGHT * 3) / 100, color: '#000' }}>No Ride History</Text>
            </View>
          </View>
        )
      }
      else {
        console.log(this.props.auth.ridehistory)
        return (
          <View style={styles.container}>
            <View style={{ backgroundColor: '#842bdd', height: (HEIGHT * 8) / 100, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomMapView')} style={{ paddingLeft: (WIDTH * 4) / 100 }}>
                <AntDesign name='arrowleft' size={(HEIGHT * 4) / 100} color='#fff' />

              </TouchableOpacity>
              <Text style={{ fontSize: (HEIGHT * 2.5) / 100, color: '#fff', position: 'absolute', top: (HEIGHT * 2.5) / 100, left: (WIDTH * 40) / 100 }}>My Trips</Text>
            </View>
            <View style={{ top: 0, height: (HEIGHT * 88) / 100 }}>
              <FlatList
                data={this.props.auth.ridehistory}
                extraData={this.props}
                refreshing={this.props.auth.ridesLoading}
                onRefresh={this.refreshRides}
                keyExtractor={(item, index) => {
                  return item._id;
                }}
                renderItem={({ item }) =>
                  <TouchableOpacity key={item.Busnumber} style={{ flex: 1, margin: (WIDTH * 4 / 100) }} onPress={() => console.log(this.props.auth.ridehistory)}>
                    <View style={styles.cardStyle}>

                      <View style={styles.dateContainer}>
                        <Text style={styles.dateStyle}>{this.dateExtractor(item.dateofbooking)}</Text>
                      </View>



                      <View style={styles.locationsContainer}>
                        <Text style={styles.locationNameStyle}>{item.bus_id.pickuplocation}</Text>
                        <AntDesign name='arrowright' size={30} color='#842bdd' />
                        <Text style={styles.locationNameStyle}>{item.bus_id.dropofflocation}</Text>
                      </View>

                      <View style={{ backgroundColor: '#000', height: 0.5 }} />

                      <View style={styles.detailsContainer}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.detailTextStyle}>Bus Number :</Text>
                          <Text style={{ fontSize: (HEIGHT * 2.2 / 100), color: '#842bdd', fontWeight: 'bold', marginLeft: (WIDTH * 3 / 100) }}>{item.bus_id.Busnumber}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.detailTextStyle}>Bus Company :</Text>
                          <Text style={{ fontSize: (HEIGHT * 2.2 / 100), color: '#842bdd', fontWeight: 'bold', marginLeft: (WIDTH * 3 / 100) }}>{item.bus_id.Bustraveller}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.detailTextStyle}>Number Of Seats :</Text>
                          <Text style={{ fontSize: (HEIGHT * 2.2 / 100), color: '#842bdd', fontWeight: 'bold', marginLeft: (WIDTH * 3 / 100) }}>{item.numberofseats}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.detailTextStyle}>Price :</Text>
                          <Text style={{ fontSize: (HEIGHT * 2.2 / 100), color: '#842bdd', fontWeight: 'bold', marginLeft: (WIDTH * 3 / 100) }}>{item.price}</Text>
                        </View>



                      </View>

                    </View>
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  cardStyle: {
    borderRadius: 5, elevation: 3, borderColor: '#000'
  },
  dateContainer: {
    backgroundColor: '#842bdd',
    alignItems: "center"
  },
  dateStyle: {
    fontSize: (HEIGHT * 2.5) / 100, padding: (HEIGHT * 1 / 100), color: '#fff'
  },
  locationsContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  locationNameStyle: {
    fontSize: (HEIGHT * 2.5) / 100, color: '#000', paddingVertical: (HEIGHT * 1.5 / 100), paddingHorizontal: (HEIGHT * 3 / 100), fontWeight: 'bold'
  },
  detailsContainer: {
    marginLeft: (WIDTH * 6 / 100), marginVertical: (HEIGHT * 2 / 100)
  },
  detailTextStyle: {
    fontSize: (HEIGHT * 2.2) / 100,
    color: '#000',
    fontWeight: 'bold'
  }
});


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getTrips, clearRideHistory })(MyTrips);