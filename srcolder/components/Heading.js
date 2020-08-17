import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Heading = () => {
    return(
        <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>Login</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: responsiveWidth(100)
    },
    textStyle: {
        letterSpacing: 2,
        fontSize: responsiveHeight(3),
        color: '#05004e'
    }
})

export default Heading;