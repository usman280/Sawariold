import React from 'react';
import { View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CheckBox } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SingleCheckBox = ({ onPress, checked, title }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
                size={responsiveHeight(5)}
                title={title}
                checkedIcon={<AntDesign name='check' color='#d5436a' size={responsiveHeight(5)} />}
                checked={checked}
                onPress={onPress}
                textStyle={{ fontSize: responsiveHeight(3), paddingLeft: responsiveWidth(16) }}
                containerStyle={{ width: responsiveWidth(75) }}
            />
        </View>
    )
}

export default SingleCheckBox;