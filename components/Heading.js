import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
        width: WIDTH
    },
    textStyle: {
        letterSpacing: 2,
        fontSize: (HEIGHT*3)/100,
        color: '#05004e'
    }
})

export default Heading;