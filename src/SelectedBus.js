import React, { Component } from 'react';
import SingleBus from './SingleBus';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from "react-navigation";
import { View, TouchableOpacity, Text, Dimensions, Alert, FlatList, StyleSheet, Animated, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import firebase from 'react-native-firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var isHiddenPoint = true;

class SelectedBus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numofseats: 1,
            Bus_Number: "TST-123",
            Departure_Time: "5:00 pm",
            Arrival_Time: "8: 00 pm",
            Rating: "2.2",
            Company_Name: "AM Travel",
            Total_Amount: "400",
            Trip_Time: "2:15",
            Bus_Id: 'ad',
            mytoken: null,
            myid: null,
            BusSeatsRemaining: null,
            Points: null,
            pointsBounceValue: new Animated.Value((HEIGHT * 60) / 100),
        };
    }

    Fetch() {
        let BusNumber = this.props.navigation.getParam('Bus_Number', 'NO-ID');
        let DepartureTime = this.props.navigation.getParam('Departure_Time', 'NO-ID');
        let ArrivalTime = this.props.navigation.getParam('Arrival_Time', 'NO-ID');
        let TripTime = this.props.navigation.getParam('Trip_Time', 'NO-ID');
        let TotalAmount = this.props.navigation.getParam('Total_Amount', 'NO-ID');
        let BusRating = this.props.navigation.getParam('Rating', 'NO-ID');
        let CompanyName = this.props.navigation.getParam('Company_Name', 'NO-ID');
        let BusId = this.props.navigation.getParam('Bus_Id', 'NO-ID');
        let BusSeatsRemaining = this.props.navigation.getParam('BusSeatsRemaining', 'No-ID')
        let Points = this.props.navigation.getParam('Points', 'No-ID')
        this.setState({
            Bus_Number: BusNumber,
            Departure_Time: DepartureTime,
            Arrival_Time: ArrivalTime,
            Rating: BusRating,
            Total_Amount: TotalAmount,
            Trip_Time: TripTime,
            Company_Name: CompanyName,
            Bus_Id: BusId,
            BusSeatsRemaining: BusSeatsRemaining,
            Points: Points
        });
    }


    static navigationOptions = {
        title: 'Bus Details'
    };

    decrementSeat = () => {
        if (this.state.numofseats != 1) {
            this.setState({ numofseats: this.state.numofseats - 1 })
        }
    }

    incrementSeat = () => {
        if (this.state.numofseats != this.state.BusSeatsRemaining) {
            this.setState({ numofseats: this.state.numofseats + 1 })
        }
    }

    async getidandtoken() {
        try {
            await AsyncStorage.getItem('fcmToken').then(
                (res) => {
                    this.setState({ mytoken: res });
                }
            )
        } catch (e) {
        }

        try {
            await AsyncStorage.getItem('myid').then(
                (res) => {
                    this.setState({ showRealApp: res });
                }
            )
        } catch (e) {
        }
    }

    bashu = () => {

        console.log(this.state.Points[0].points);
        if (this.state.numofseats > this.state.BusSeatsRemaining) {
            Alert.alert('Error', 'Cannot book')
        }
        else {
            var total = this.state.numofseats * this.state.Total_Amount;
            var fbill = (total * 75) / 100;
            var ebill = (total * 85) / 100;
            var cbill = (total * 90) / 100;
            this.props.navigation.navigate('PaymentOptions', {
                realbill: total,
                foreebill: fbill,
                easypaisabill: ebill,
                cardbill: cbill,
                busid: this.state.Bus_Id,
                seats: this.state.numofseats,
            });
        }
    }


    notifica = () => {
        let notification = new firebase.notifications.Notification();
        notification
            .setSound("default")
            .setNotificationId("12312321321321")
            .setTitle("Schedueled")
            .setBody('Bus is 10 mins away')
            .android.setChannelId('fcm_FirebaseNotifiction_default_channel')
            .android.setSmallIcon('@drawable/icon_liked')
            .android.setColor('#000000')
            .android.setPriority(firebase.notifications.Android.Priority.Max)
            .setData({
                title: "Schedueled",
                body: "Bus is 15 mins away"
            });

        const date = new Date();

        // date.setSeconds(date.getSeconds() + 10);

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

    }

    togglePointsView() {
        var toValue = 500;

        if (isHiddenPoint) {
            toValue = 0;

            Animated.spring(
                this.state.pointsBounceValue,
                {
                    toValue: toValue,
                    velocity: 30,
                    tension: 200,
                    friction: 80,
                }
            ).start();

        }

        else {
            toValue = 500;

            Animated.spring(
                this.state.pointsBounceValue,
                {
                    toValue: toValue,
                    velocity: 30,
                    tension: 200,
                    friction: 80,
                }
            ).start();
        }

        isHiddenPoint = !isHiddenPoint;
    }

    FlatListItemSeparator = () => {
        return(
            <View style={{ paddingLeft: (WIDTH*15)/100}}>
            <Feather name='arrow-down' size={(HEIGHT * 5) / 100} color='#000' />
        </View>
        )
    };

    render() {
        if (this.state.Points === null) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationEvents onDidFocus={() => this.Fetch()} />
                    <ActivityIndicator size='large' color='#000' />
                </View>
            )
        }else{
            if(this.state.Points.length===0){
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        if (isHiddenPoint === false) {
                            this.togglePointsView();
                        }
                    }}>
                        <View style={{height: HEIGHT, width: WIDTH}}>
                        <View style={{ flexDirection: 'row', height: (HEIGHT * 10) / 100, backgroundColor: '#05004E', alignItems: 'center' }}>
    
                            <NavigationEvents onDidFocus={() => this.Fetch()} />
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    Bus_Number: null,
                                    Departure_Time: null,
                                    Arrival_Time: null,
                                    Rating: null,
                                    Total_Amount: null,
                                    Trip_Time: null,
                                    Company_Name: null,
                                });
                                this.props.navigation.navigate('BusesList')
                            }} >
    
                                <AntDesign name='arrowleft' size={(HEIGHT * 3) / 100} color='#fff' style={{ paddingLeft: (WIDTH * 2) / 100 }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', marginLeft: (HEIGHT * 2) / 100, fontSize: (HEIGHT * 3) / 100, paddingLeft: (WIDTH * 27.5) / 100 }}>
                                Bus Details
                            </Text>
    
                        </View>
                        <View>
                            <SingleBus
                                Bus_Number={this.state.Bus_Number}
                                Departure_Time={this.state.Departure_Time}
                                Arrival_Time={this.state.Arrival_Time}
                                Remaining_Seats={this.state.BusSeatsRemaining}
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
    
                        <View>
                            <TouchableOpacity onPress={() => this.togglePointsView()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 30, color: '#000' }}>
                                    See Full Schedule
                           </Text>
                            </TouchableOpacity>
                        </View>
                        <Animated.View
                            style={[styles.pointsView,
                            { transform: [{ translateY: this.state.pointsBounceValue }] }]}
                        >
                            <View>
                            <View style={{ paddingVertical: (HEIGHT * 1) / 100, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View />
                                    <Text style={{ fontWeight: 'bold', fontSize: (HEIGHT * 3) / 100, color: '#000' }}>Bus Scheduel</Text>
                                    <TouchableOpacity onPress={() => this.togglePointsView()}>
                                        <Entypo name='circle-with-cross' size={(HEIGHT * 3.5) / 100} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View  style={{height: (HEIGHT*0.4)/100, backgroundColor:'#000'}} />
                            <View style={{justifyContent:"center",alignItems:"center",paddingVertical:(HEIGHT*5/100)}}>
                            <Text style={{fontSize:20}}>
                                No Schedule provided by traveller
                            </Text>
                            </View>
                            </View>
                        </Animated.View>
    
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
        else {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    if (isHiddenPoint === false) {
                        this.togglePointsView();
                    }
                }}>
                    <View style={{height: HEIGHT, width: WIDTH}}>
                    <View style={{ flexDirection: 'row', height: (HEIGHT * 10) / 100, backgroundColor: '#05004E', alignItems: 'center' }}>

                        <NavigationEvents onDidFocus={() => this.Fetch()} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                Bus_Number: null,
                                Departure_Time: null,
                                Arrival_Time: null,
                                Rating: null,
                                Total_Amount: null,
                                Trip_Time: null,
                                Company_Name: null,
                            });
                            this.props.navigation.navigate('BusesList')
                        }} >

                            <AntDesign name='arrowleft' size={(HEIGHT * 3) / 100} color='#fff' style={{ paddingLeft: (WIDTH * 2) / 100 }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', marginLeft: (HEIGHT * 2) / 100, fontSize: (HEIGHT * 3) / 100, paddingLeft: (WIDTH * 27.5) / 100 }}>
                            Bus Details
                        </Text>

                    </View>
                    <View>
                        <SingleBus
                            Bus_Number={this.state.Bus_Number}
                            Departure_Time={this.state.Departure_Time}
                            Arrival_Time={this.state.Arrival_Time}
                            Remaining_Seats={this.state.BusSeatsRemaining}
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

                    <View>
                        <TouchableOpacity onPress={() => this.togglePointsView()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, color: '#000' }}>
                                See Full Schedule
                       </Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        style={[styles.pointsView,
                        { transform: [{ translateY: this.state.pointsBounceValue }] }]}
                    >
                        <View>
                        <View style={{ paddingVertical: (HEIGHT * 1) / 100, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View />
                                <Text style={{ fontWeight: 'bold', fontSize: (HEIGHT * 3) / 100, color: '#000' }}>Bus Scheduel</Text>
                                <TouchableOpacity onPress={() => this.togglePointsView()}>
                                    <Entypo name='circle-with-cross' size={(HEIGHT * 3.5) / 100} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View  style={{height: (HEIGHT*0.4)/100, backgroundColor:'#000'}} />
                        <FlatList
                            data={this.state.Points}
                            extraData={this.state}
                            // refreshing={this.props.buseslist.refreshing}
                            //  onRefresh={this.handleRefresh}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            keyExtractor={(item, index) => {
                                return item.points;
                            }}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity

                                    key={item.points} style={{ flex: 1, flexDirection:'row', paddingLeft: (WIDTH*5)/100 }}>
                                    <Text style={{ fontSize: (HEIGHT * 2.5) / 100, color:'#000', fontWeight:'bold' }}>
                                        {(index+1) + " )   "}
                                    </Text>
                                    <Text style={{ fontSize: (HEIGHT * 2.5) / 100, color:'#000', fontWeight:'bold' }}>
                                        {item.points}
                                    </Text>
                                </TouchableOpacity>
                            }
                        />
                        </View>
                    </Animated.View>

                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    }
}

const styles = StyleSheet.create({
    pointsView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: (WIDTH * 8) / 100,
        paddingVertical: (HEIGHT * 4) / 100,
    },
})
export default SelectedBus;