import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BorderLayout = (props) => {
    return(
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    containerStyle: {
        paddingVertical: (HEIGHT*2)/100,
        paddingHorizontal: (WIDTH*5)/100,
        shadowColor:'#000',
        shadowRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        elevation: 0.9,
        borderRadius: 20,
        width: (WIDTH*80)/100,
        height: (HEIGHT*15)/100
    }
})

export default BorderLayout;