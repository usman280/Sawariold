import React from 'react';
import { View, Text, Image } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Company = ({discountedAmount, signupLink, discountPercentage, onPress}) => {
    return(
        <TouchableOpacity style={{flexDirection:'row', width:responsiveWidth(94)}} onPress={onPress}>
            <View style={{width:responsiveWidth(76), paddingHorizontal:responsiveHeight(1), paddingVertical:responsiveHeight(1)}}>
                <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom:responsiveHeight(2)}}>
                    <Text style={{textAlign:'center', fontSize:responsiveWidth(4)}}>{discountPercentage}</Text>
                    <Image source={require('../../../assets/foree.png')} style={{height:responsiveHeight(5), width:responsiveWidth(20)}} />
                </View>
                <View >
                    <Text style={{fontSize:responsiveWidth(3.5)}}>{signupLink}</Text>
                </View>
            </View>

            <View style={{justifyContent:'center', width: responsiveWidth(18), alignItems:'center', borderLeftColor:'#000', borderLeftWidth: 1}}>
                <Text style={{textAlign:'center'}}>{discountedAmount}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Company;