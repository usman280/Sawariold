import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { fetchUserData } from '../actions/authActions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Preferences extends Component {

    render() {

        if (this.props.auth.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#000' />
                </View>
            )
        }
        
        else {
            return (
                <View style={styles.mainContainer}>
                    <View style={styles.dialogueBox}>
                        <Text style={styles.alertText}>
                            Do you want to set preferences for the bus ?
                    </Text>

                        <View style={styles.optionsContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                const num = {
                                    phonenumber: this.props.auth.number,
                                }
                                this.props.fetchUserData(num, () => {
                                    AsyncStorage.setItem('@userlogindata', JSON.stringify(this.props.auth.user));
                                    this.props.navigation.navigate('CustomMapView');
                                });

                            }}>
                                <Text style={styles.buttonText} >
                                    No
                            </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => {
                                this.props.navigation.navigate('ChoosePreferences')
                            }}>
                                <Text style={styles.buttonText}>
                                    Yes
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    dialogueBox: {
        width: (WIDTH * 80) / 100,
        height: (HEIGHT * 20) / 100,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    alertText: {
        fontSize: (HEIGHT * 2.5) / 100,
        textAlign: 'center',
        color: '#000',
    },
    buttonText: {
        fontSize: (HEIGHT * 2.2) / 100,
        letterSpacing: (WIDTH * 0.1) / 100,
        color: '#fff',
    },
    button: {
        backgroundColor: '#824bdd',
        paddingHorizontal: (HEIGHT * 2) / 100,
        paddingVertical: (HEIGHT * 1) / 100,
        borderRadius: 5,
    }
});

const mapStateToProps = state => ({
    auth: state.auth,
    pref: state.pref,
})

export default connect(mapStateToProps, { fetchUserData })(Preferences);