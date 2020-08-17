import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



const SingleBus = ({ Bus_Number, onMinusPress, onPlusPress, Rating, Company_Name, Departure_Time, Arrival_Time, Total_Amount, Trip_Time, Remaining_Seats, onPress, seatNumbers }) => {
    return (
        <View>
            <View style={{ alignItems: 'center', marginTop: (HEIGHT * 4) / 100, marginBottom: (HEIGHT * 4) / 100, height: (HEIGHT * 10) / 100 }}>
                <Icon name='bus' size={(HEIGHT * 7) / 100} color='#000' />
                <Text style={{ fontSize: (HEIGHT * 2.3) / 100, paddingTop: (HEIGHT * 2) / 100, color: '#000' }}>{Bus_Number}</Text>
            </View>

            <View style={{ height: (HEIGHT * 0.5) / 100, backgroundColor: '#842bdd' }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: (WIDTH * 5) / 100, marginVertical: (HEIGHT * 1) / 100, paddingVertical: (HEIGHT * 1) / 100 }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: (HEIGHT * 1) / 100 }}>
                    <Text style={{ fontSize: (HEIGHT * 2.3) / 100, color: '#000' }}>Features</Text>
                </View>

                <View style={{ flexDirection: 'row', borderRadius: 10 }}>
                    <View style={{ borderWidth: 1, borderRadius: 10, padding: (HEIGHT * 1) / 100 }}>
                        <Text style={{ fontSize: (HEIGHT * 2.3) / 100, color: '#000' }}>{Rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: (HEIGHT * 0.7) / 100, marginLeft: (WIDTH * 2) / 100 }}>
                        <Icon name='star' color='#000' size={(HEIGHT * 3) / 100} />
                        <Icon name='star' color='#000' size={(HEIGHT * 3) / 100} />
                        <Icon name='star' color='#000' size={(HEIGHT * 3) / 100} />
                        <Icon name='star' color='#000' size={(HEIGHT * 3) / 100} />
                        <Icon name='star' color='#000' size={(HEIGHT * 3) / 100} />
                    </View>

                </View>
            </View>

            <View style={{ height: (HEIGHT * 0.5) / 100, backgroundColor: '#000' }} />

            <View style={{ margin: (HEIGHT * 1) / 100, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: (HEIGHT * 1) / 100, alignItems: 'center' }}>
                    <Text style={{ fontSize: (HEIGHT * 2.5) / 100, color: '#000' }}>{Company_Name}</Text>

                    <View style={{ borderWidth: 1, borderColor: '#842bdd', backgroundColor: '#842bdd', borderRadius: 10, paddingHorizontal: (HEIGHT * 1.5) / 100, paddingVertical: (HEIGHT * 1) / 100 }}>
                        <Text style={{ fontSize: (HEIGHT * 2.5) / 100, color: '#fff' }}>Rs {Total_Amount}</Text>
                    </View>
                </View>

                <View>
                    <Text style={{ fontSize: (HEIGHT * 2.3) / 100, color: '#000' }}>Trip time: {Trip_Time}</Text>
                    <Text style={{ fontSize: (HEIGHT * 2.3) / 100, color: '#000' }}>Remaining Seats: {Remaining_Seats}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='first-aid' size={(HEIGHT * 3) / 100} color='#842bdd' style={{ paddingHorizontal: (WIDTH * 0.7) / 100 }} />
                        <Icon name='tv' size={(HEIGHT * 3) / 100} color='#842bdd' style={{ paddingHorizontal: (WIDTH * 0.7) / 100 }} />
                        <Icon name='wifi' size={(HEIGHT * 3) / 100} color='#842bdd' style={{ paddingHorizontal: (WIDTH * 0.7) / 100 }} />
                    </View>

                    <View style={{ backgroundColor: "#842bdd", borderRadius: 10, borderColor: '#842bdd', borderWidth: 1, alignItems: 'center', paddingHorizontal: (HEIGHT * 1.5) / 100, paddingVertical: (HEIGHT * 1) / 100 }}>
                        <Text style={{ fontSize: (HEIGHT * 2.3) / 100, color: '#fff' }}>{Departure_Time}</Text>
                        <AntDesign name='arrowdown' size={(HEIGHT * 3) / 100} color='#fff' />
                        <Text style={{ fontSize: (HEIGHT * 2.3) / 100, color: '#fff' }}>{Arrival_Time}</Text>
                    </View>
                </View>
            </View>

            <View style={{ height: (HEIGHT * 0.5) / 100, backgroundColor: '#000' }} />


            <View style={{ alignItems: 'center', marginVertical: (HEIGHT * 1) / 100, height: (HEIGHT * 20) / 100 }}>

                <Text style={{ fontSize: (HEIGHT * 3) / 100, color:'#000' }}>Seats</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: (HEIGHT * 1) / 100 }}>
                    <TouchableOpacity onPress={onMinusPress}>
                        <AntDesign name='minuscircle' size={(HEIGHT * 3.5) / 100} color='#000' style={{ paddingRight: (HEIGHT * 2) / 100 }} />
                    </TouchableOpacity>

                    <View style={{ borderRadius: 20, borderColor: '#000', borderWidth: 1, paddingVertical: (HEIGHT * 1) / 100, paddingHorizontal: (HEIGHT * 8) / 100 }}>
                        <Text style={{ fontSize: (HEIGHT * 2.5) / 100 }}>
                            {seatNumbers}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={onPlusPress}>
                        <AntDesign name='pluscircle' size={(HEIGHT * 3.5) / 100} color='#000' style={{ paddingLeft: (HEIGHT * 2) / 100 }} />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity onPress={onPress} style={{borderRadius:10, borderColor:'#842bdd', backgroundColor:'#842bdd', paddingVertical: (HEIGHT*1.5)/100, paddingHorizontal:(HEIGHT*2)/100, margin:(HEIGHT*2)/100}}>
                    <Text style={{fontSize:(HEIGHT*2.5)/100, color:'#fff'}}>Proceed To Payment</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

export default SingleBus;