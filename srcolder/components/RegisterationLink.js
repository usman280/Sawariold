import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const RegisterationLink = ({onPress}) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} >
                <Text style={{ textAlign: 'center', paddingHorizontal: responsiveWidth(5), fontSize: responsiveHeight(2), color: '#000' }}>
                    Don't have an account ? Register now
                </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', paddingHorizontal: responsiveWidth(5), marginTop: responsiveHeight(1), fontSize: responsiveHeight(2) }}>
                or login with
                </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='facebook-official' size={30} color='#1a78f4' style={{ marginHorizontal: 6, marginTop: 5 }} />
                <Icon name='google' size={30} style={{ marginHorizontal: responsiveWidth(2), marginTop: responsiveHeight(1) }} />
            </View>
        </View>
    )
}

export default RegisterationLink;