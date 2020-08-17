import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

const Error=({errorMessage})=>{
    return(
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Text>
                {errorMessage}
            </Text>
        </View>
    )
}

export default Error;
