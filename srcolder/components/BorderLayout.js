import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

const BorderLayout = (props) => {
    return(
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    containerStyle: {
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(5),
        shadowColor:'#000',
        shadowRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        elevation: 0.9,
        borderRadius: 20,
        width: responsiveWidth(80),
        height: responsiveHeight(15)
    }
})

export default BorderLayout;