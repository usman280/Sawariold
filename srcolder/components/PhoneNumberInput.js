import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const PhoneNumberInput = ( { placeholder, onChangeText, onPress, value }) => {

    return(

    <View style={{ padding: responsiveWidth(5) }}>

    <Text style={{fontSize: responsiveHeight(3), color:'#05004E'}}>Enter phone number :</Text>

    <TextInput
      style={{ height: responsiveHeight(8), marginTop: responsiveHeight(4), marginBottom: responsiveHeight(3), fontSize: responsiveHeight(2.5), color:'#000' }}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
    />

    <Button title="Sign In" color="#D5436A" onPress={onPress} />

  </View>
    )
}

export default PhoneNumberInput;