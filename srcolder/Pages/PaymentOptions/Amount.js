import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Amount = ({amount}) => {
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.textStyle}>Total Payment</Text>
            <Text style={styles.textStyle}>{amount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
        elevation: 1,
        width: responsiveWidth(94),
        alignItems:'center',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveHeight(5)
    },
    textStyle: {
        fontSize: responsiveHeight(2.5),
        textAlign: "center",

    }
});

export default Amount;