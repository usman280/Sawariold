import React from 'react';
import { View, TextInput, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SearchField = ({value,onChangeText,placeholder}) => {
    return (
        <View style={{ borderColor: '#000', flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingLeft: (WIDTH * 5) / 100, elevation: 2 }}>
            <Feather name='search' color='#824bdd' size={(HEIGHT * 4) / 100} />
            <TextInput
            keyboardAppearance='dark'

                style={{ paddingLeft: (WIDTH * 10) / 100, fontSize: (HEIGHT * 2.5) / 100, color: '#000' }}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                autoFocus={false}
            />
        </View>
    );
};

export default SearchField;