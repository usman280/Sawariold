import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const ButtonField = ({onPress,buttonText}) => {
    return(
            <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
                <Text style={styles.buttonText} >{buttonText}</Text>
            </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    containerStyle: {
        width: responsiveWidth(60),
        backgroundColor: '#d5436a',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 30
    },
    buttonText: {
        fontSize: responsiveHeight(2.5),
        letterSpacing: responsiveWidth(0.05),
        paddingVertical: responsiveHeight(2),
        color: '#fff'
    }
})

export default ButtonField;