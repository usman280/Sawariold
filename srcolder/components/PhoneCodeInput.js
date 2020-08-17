import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const PhoneCodeInput = ( { onChangeText, placeholder, onPress, value } ) => {
    return(
        <View style={{ marginTop: responsiveHeight(8), padding: responsiveWidth(5),  }}>
        <Text style={{fontSize: responsiveHeight(3), color:'#05004E'}}>Enter verification code below:</Text>
        <TextInput
          style={{ height: responsiveHeight(8), marginTop: responsiveHeight(4), marginBottom: responsiveHeight(4), fontSize: responsiveHeight(2.5), color:'#000' }}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
        />
        <Button title="Confirm Code" color="#D5436A" onPress={onPress} />
      </View>
    )
}

export default PhoneCodeInput;  