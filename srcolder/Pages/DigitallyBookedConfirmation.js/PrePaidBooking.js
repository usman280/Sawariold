import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';


const PrePaidBooking = ({ bookingNumber, from, to, busNumber, numOfSeats, seatNumbers }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: responsiveWidth(100) }}>

            <Text style={{ fontSize: responsiveHeight(3), marginBottom: responsiveHeight(2) }}>Your Booking Has Been Confirmed</Text>

            <View style={{ width: responsiveWidth(80), paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(5), borderColor: '#000', borderRadius: 15, borderWidth: 1 }}>

                <Text style={styles.textStyle}>Booking Number: {bookingNumber}</Text>
                <Text style={styles.textStyle}>From: {from}</Text>
                <Text style={styles.textStyle}>To: {to}</Text>
                <Text style={styles.textStyle}>Bus Number: {busNumber}</Text>
                <Text style={styles.textStyle}>No. of Seats: {numOfSeats}</Text>
                <Text style={styles.textStyle}>Seat Numbers: {seatNumbers}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: responsiveHeight(2.5)
    }
})

export default PrePaidBooking;