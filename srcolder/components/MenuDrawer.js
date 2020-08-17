import React from 'react';
import { View, Text, Platform, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const UserName = ({ username }) => {
    return (
        <Text style={{ color: 'white', fontSize: responsiveHeight(3) }}>{username}</Text>
    );
};
const Rating = ({ rating }) => {
    return (
        <Text style={{ color: 'white', fontSize: responsiveHeight(3) }}>{rating}</Text>
    );
};

export default class MenuDrawer extends React.Component {
    

    navLink(nav, text) {
        return (
            <TouchableOpacity style={{ height: HEIGHT * 0.10 }}
                onPress={() => { this.props.navigation.navigate(nav); this.props.navigation.closeDrawer(); }}>

                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }

    signOut = (text) => {
        return (
            <TouchableOpacity style={{ height: HEIGHT * 0.10 }}
                onPress={() => {
                    this.props.navigation.navigate('LoginPage');
                    firebase.auth().signOut();
                    this.props.navigation.closeDrawer();
                }}>
                <Text style={styles.link} >{text}</Text>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.topLinks}>
                        <Icon name='user' color='#fff' size={responsiveHeight(10)} />
                        <View>
                            <UserName username="Ibad" />
                            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                <Rating rating="4.0" />
                                <Icon name='star' color='#fff' size={responsiveHeight(3)} style={{ marginLeft: responsiveHeight(2), marginTop: responsiveHeight(0.5) }} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomLinks}>
                        {this.navLink('MyTrips', 'My Trips')}
                        {this.navLink('Payments', 'Payments')}
                        {this.navLink('Settings', 'Settings')}
                        {this.signOut('Sign Out')}

                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.description}>Sawari</Text>
                    <Text style={styles.version}>>v1.0</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    link: {
        flex: 1,
        fontSize: responsiveHeight(3),
        padding: responsiveHeight(1),
        paddingLeft: responsiveWidth(6),
        marginVertical: 10,
        textAlign: 'left',
    },
    topLinks: {
        flexDirection: 'row',
        height: HEIGHT * 0.25,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#05004e'
    },
    bottomLinks: {
        height: HEIGHT * 0.75,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 450,
    },
    footer: {
        height: HEIGHT * 0.075,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        color: 'gray'
    },
    description: {
        flex: 1,
        marginLeft: responsiveHeight(5),
        color: '#000',
        fontSize: responsiveHeight(3.5),

    }
});