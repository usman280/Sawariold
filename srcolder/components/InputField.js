import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

const InputField = ({ placeholder, name, color, size, onChangeText, inputname, value, secureTextEntry, onSubmitEditing, autoCapitalize }) => {
    return (
        <View style={styles.mainContainerStyle}>
            <View style={styles.subContainerStyle}>
                <Icon name={name} color={color} size={size} style={styles.iconStyle} />
                <TextInput autoCapitalize={autoCapitalize} onSubmitEditing={onSubmitEditing} secureTextEntry={secureTextEntry} value={value} name={inputname} onChangeText={onChangeText} placeholder={placeholder} style={styles.inputStyle} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: responsiveWidth(2)
    },
    subContainerStyle: {
        width: responsiveWidth(80),
        shadowColor: '#000',
        shadowOffset: { width: responsiveWidth(2), height: responsiveHeight(2) },
        shadowOpacity: 1,
        shadowRadius: 100,
        elevation: 1.5,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        paddingHorizontal: responsiveWidth(5)
    },
    inputStyle: {
        paddingLeft: responsiveWidth(2),
        width: responsiveWidth(80),
        letterSpacing: responsiveWidth(0.05),
        fontSize: responsiveHeight(2.5),
        color: '#000',
        textAlign: 'auto'
    }
})

export default InputField;