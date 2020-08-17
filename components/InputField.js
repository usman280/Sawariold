import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const InputField = ({ placeholder, onChangeText, inputname, value, secureTextEntry, onSubmitEditing, autoCapitalize }) => {
    return (
        <View style={styles.container}>
            <View style={styles.subContainerStyle}>
                <TextInput autoCapitalize={autoCapitalize} onSubmitEditing={onSubmitEditing} secureTextEntry={secureTextEntry} value={value} name={inputname} onChangeText={onChangeText} placeholder={placeholder} style={styles.inputStyle} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: (WIDTH*2)/100
    },
    subContainerStyle: {
        width: (WIDTH*80)/100,
        elevation: 1.5,
        borderRadius: 8,
    },
    inputStyle: {
        paddingLeft: (WIDTH*2)/100,
        width: (WIDTH*80)/100,
        letterSpacing: (WIDTH*0.05)/100,
        fontSize: (HEIGHT*2.5)/100,
        color: '#000',
        textAlign: 'auto'
    }
})

export default InputField;