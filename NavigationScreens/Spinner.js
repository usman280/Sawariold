import React from 'react'
import {View,Image} from 'react-native'

const Spinner=()=>{
    return(
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Image
            source={require('./spinner.gif')}/>
        </View>
    )
}

export default Spinner;