import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const RegisterationLink = ({onPress}) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} >
                <Text style={{ textAlign: 'center', paddingHorizontal: (WIDTH*5)/100, fontSize: (HEIGHT*2)/100, color: '#000' }}>
                    Don't have an account ? Register now
                </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', paddingHorizontal: (WIDTH*5)/100, marginTop: (HEIGHT*1)/100, fontSize: (HEIGHT*2)/100 }}>
                or login with
                </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='facebook-official' size={30} color='#1a78f4' style={{ marginHorizontal: 6, marginTop: 5 }} />
                <Icon name='google' size={30} style={{ marginHorizontal: (WIDTH*2)/100, marginTop: (HEIGHT*1)/100 }} />
            </View>
        </View>
    )
}

export default RegisterationLink;