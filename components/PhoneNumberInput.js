import React from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const PhoneNumberInput = ({ placeholder, onChangeText, onPress, value }) => {

  return (
    <KeyboardAvoidingView style={styles.maincontainer}>

      <View style={styles.logostyle} />

      <View style={styles.subcontainer}>

      <Text style={styles.headingStyle}>Enter phone number :</Text>

      <TextInput
        style={styles.numberInputStyle}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoFocus={true}
        keyboardType='numeric'
        value={value}
      />

      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.buttonTextStyle}> Sign In </Text>
      </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: '#f9f9f9',
    flexDirection: 'column',
  },
  logostyle: {
    width: WIDTH,
    height: ( HEIGHT * 35 )/ 100,
    backgroundColor: '#824bdd',
  },
  subcontainer: {
    overlayColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0,
    justifyContent: 'center',
    marginHorizontal: (WIDTH * 5) / 100,
    marginTop: ( HEIGHT * 5) / 100,
  },
  headingStyle: {
    fontSize: (HEIGHT * 3) / 100,
    paddingTop: (HEIGHT * 3) / 100,
    color: '#000',
    alignSelf: 'center'
  },
  numberInputStyle: {
    height: (HEIGHT * 10) / 100,
    paddingVertical: (HEIGHT * 3) / 100,
    fontSize: (HEIGHT * 2.5) / 100,   
    paddingLeft: (WIDTH * 7)/100,
    color: '#000'
  },
  buttonTextStyle: {
    fontSize: (HEIGHT * 2.5) / 100,
    textAlign: 'center',
    letterSpacing: (WIDTH * 0.1) / 100,
    color: '#fff',
  },
  buttonStyle: {
    backgroundColor: '#824bdd',
    height: (HEIGHT * 5) / 100,
    alignItems:'center',
    justifyContent: 'center',
  }
})

export default PhoneNumberInput;