import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuButton = ({onPress}) => {
        return (
                <Ionicons
                    name='md-menu'
                    color='#000'
                    size={40}
                    style={styles.menuIcon}
                    onPress={onPress}
                    />
        )
    };

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        top: 40,
        left: 40,
        elevation: 7,
    }
});

export default MenuButton;