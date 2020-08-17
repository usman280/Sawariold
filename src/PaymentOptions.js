import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bookBus } from '../actions/bookingactions';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var num = 1;

class PaymentOptions extends Component {


    static navigationOptions = {
        title: 'Payment Options'
    };

    notifica = () => {
        const notification = new firebase.notifications.Notification()
            .setSound("default")
            .setNotificationId(++num + "213")
            .setTitle("Schedueled Wali")
            .setBody('Bus is 10 mins away ')  
            .android.setSmallIcon('@drawable/icon_liked')
            .android.setColor('#000000')
            .android.setPriority(firebase.notifications.Android.Priority.Max)
            .android.setChannelId('fcm_FirebaseNotification_default_channel')
            
            .setData({
                title: "Schedueled Wali",
                body: "Bus is 15 mins away"
            });

            // if(Platform.Version > 25){
            //    notification
            // }
            //else{
            ///}

        const date = new Date();

        date.setSeconds(date.getSeconds() + 10);


        firebase
            .notifications()
            .scheduleNotification(notification, {
                fireDate: date.getTime()
            }).then(res => console.log("response ara h kya??", res))
            .catch(err => console.error(err));

        firebase
            .notifications()
            .getScheduledNotifications()
            .then(notifications => {
                console.log("logging notifications", notifications);
            });

        

    }


    render() {
        let amounts = this.props.navigation.state.params;

        return (
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', height: (HEIGHT * 10) / 100, backgroundColor: '#05004E', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectedBus')} style={{ paddingLeft: (WIDTH * 3) / 100 }}>
                        <AntDesign name='arrowleft' size={(HEIGHT * 3) / 100} color='#fff' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#fff', fontSize: (HEIGHT * 3) / 100 }}>
                            Payment Options
                        </Text>
                    </View>

                    <View>

                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: (HEIGHT * 5) / 100, height: HEIGHT }}>

                    <View style={{ height: (HEIGHT * 8) / 100 }}>
                        <View style={styles.mainContainer}>
                            <Text style={styles.textStyle}>Total Payment</Text>
                            <Text style={styles.textStyle}>{amounts.realbill}</Text>
                        </View>

                    </View>

                    <View style={styles.digitalPaymentsContainer}>
                        <View style={{ borderRadius: 15, elevation: 1.2 }}>

                            <TouchableOpacity style={{ flexDirection: 'row', width: (WIDTH * 94) / 100, height: (HEIGHT * 13) / 100 }} onPress={this.notifica}>
                                <View style={styles.discountedAmountMainContainer}>
                                    <View style={styles.discountandImageContainer}>
                                        <Text style={styles.discountText}>25% Discount</Text>
                                        <Image source={require('../assets/foree.png')} style={styles.imageStyle} />
                                    </View>
                                    <View >
                                        <Text style={styles.registerlinkStyle}>Don't have a Foree Account ?</Text>
                                    </View>
                                </View>

                                <View style={styles.discountedAmountSubContainer}>
                                    <Text style={styles.discountedAmountStyle}>{amounts.foreebill}</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.separator} />

                            <TouchableOpacity style={{ flexDirection: 'row', width: (WIDTH * 94) / 100, height: (HEIGHT * 13) / 100 }} onPress={this.notifica}>
                                <View style={styles.discountedAmountMainContainer}>
                                    <View style={styles.discountandImageContainer}>
                                        <Text style={styles.discountText}>15% Discount</Text>
                                        <Image source={require('../assets/ezpaisa.png')} style={styles.imageStyle} />
                                    </View>
                                    <View >
                                        <Text style={styles.registerlinkStyle}>Don't have an EasyPaisa Account ?</Text>
                                    </View>
                                </View>

                                <View style={styles.discountedAmountSubContainer}>
                                    <Text style={styles.discountedAmountStyle}>{amounts.easypaisabill}</Text>
                                </View>
                            </TouchableOpacity>


                            <View style={styles.separator} />

                            <TouchableOpacity style={{ flexDirection: 'row', width: (WIDTH * 94) / 100, height: (HEIGHT * 13) / 100 }} onPress={this.notifica}>
                                <View style={styles.discountedAmountMainContainer}>
                                    <View style={styles.discountandImageContainer}>
                                        <Text style={styles.discountText}>10% Discount</Text>
                                        <Entypo name='credit-card' size={(HEIGHT * 7) / 100} color='#000' />
                                    </View>
                                </View>

                                <View style={styles.discountedAmountSubContainer}>
                                    <Text style={styles.discountedAmountStyle}>{amounts.cardbill}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ height: (HEIGHT * 40) / 100, alignItems: 'center' }}>
                        <View style={{ borderRadius: 15, elevation: 1.2 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', width: (WIDTH * 94) / 100, height: (HEIGHT * 13) / 100 }} onPress={()=>{
                                const details = {
                                    user_id: this.props.auth.user._id,
                                    bus_id: amounts.busid,
                                    numberofseats: amounts.seats,
                                    price: amounts.realbill,
                                }
                                
                                this.props.bookBus(details);
                            }}>
                                <View style={styles.discountedAmountMainContainer}>
                                    <View style={styles.discountandImageContainer}>
                                        <Text style={styles.discountText}>No Discount</Text>
                                        <MaterialCommunityIcons name='cash' size={(HEIGHT * 8) / 100} color='#000' />
                                    </View>
                                </View>

                                <View style={styles.discountedAmountSubContainer}>
                                    <Text style={styles.discountedAmountStyle}>{amounts.realbill}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
        elevation: 1,
        width: (WIDTH * 94) / 100,
        alignItems: 'center',
        paddingVertical: (HEIGHT * 1) / 100,
        paddingHorizontal: (HEIGHT * 5) / 100
    },
    discountedAmountMainContainer: {
        width: (WIDTH * 76) / 100, paddingHorizontal: (HEIGHT * 1) / 100, paddingVertical: (HEIGHT * 1) / 100, justifyContent: 'center'
    },
    discountText: {
        textAlign: 'center', fontSize: (HEIGHT * 2.5) / 100, color: '#000'
    },

    discountedAmountSubContainer: {
        justifyContent: 'center', width: (WIDTH * 18) / 100, alignItems: 'center', borderLeftColor: '#000', borderLeftWidth: 1
    },

    discountedAmountStyle: {
        textAlign: 'center',
        fontSize: (HEIGHT * 2.5) / 100,
        color: '#000'
    },

    registerlinkStyle: {
        fontSize: (HEIGHT * 2) / 100,
    },

    separator: {
        backgroundColor: '#000', width: (WIDTH * 94) / 100, height: (WIDTH * 1) / 100
    },

    imageStyle: {
        height: (HEIGHT * 7) / 100, width: (WIDTH * 20) / 100
    },

    textStyle: {
        fontSize: (HEIGHT * 2.5) / 100,
        textAlign: "center",
        color: '#000'

    },
    digitalPaymentsContainer: {
        height: (HEIGHT * 50) / 100, justifyContent: 'center', alignItems: 'center'
    },
    discountandImageContainer: {
        flexDirection: 'row', justifyContent: 'space-around', marginBottom: (HEIGHT * 2) / 100
    }
});

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    bookBus,
}

export default connect(mapStateToProps,mapDispatchToProps)(PaymentOptions);