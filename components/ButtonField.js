import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ButtonField = ({onPress,buttonText}) => {
    return(
            <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
                <Text style={styles.buttonText} >{buttonText}</Text>
            </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    containerStyle: {
        width: (WIDTH*60)/100,
        backgroundColor: '#d5436a',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 30
    },
    buttonText: {
        fontSize: (HEIGHT*2.5)/100,
        letterSpacing: (WIDTH*0.05)/100,
        paddingVertical: (HEIGHT*2)/100,
        color: '#fff'
    }
})

export default ButtonField;