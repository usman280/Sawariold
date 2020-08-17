import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { addPreferences } from '../actions/preferenceAction';
import { fetchUserData } from '../actions/authActions';
import { pref } from '../actions/BusesListAction';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


class ChoosePreferences extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ac: false,
            nonac: false,
            wifi: false,
            tv: false,
            loading: false,
        }
    }

    showIcon(val) {
        if (val) {
            return (
                <Feather name='check' color='#824bdd' size={(HEIGHT * 4) / 100} />
            )
        }
    }

    acstate = () => {
        this.setState({ ac: !this.state.ac, nonac: false });
    }

    nonacstate = () => {
        this.setState({ nonac: !this.state.nonac, ac: false });
    }
    tvstate = () => {
        this.setState({ tv: !this.state.tv });
    }
    wifistate = () => {
        this.setState({ wifi: !this.state.wifi });
    }

    addPreferences = () => {

        this.setState({
            loading: true
        }, () => {
            const details = {
                number: this.props.auth.number,
                ac: this.state.ac,
                wifi: this.state.wifi,
                tv: this.state.tv,
            }

            const data = {
                phonenumber: this.props.auth.number,
            };

            this.props.addPreferences(details);
            this.props.fetchUserData(data, () => {
                AsyncStorage.setItem('@userlogindata', JSON.stringify(this.props.auth.user)).then(hello => {
                    this.props.pref(this.state.ac, () => {
                        this.props.navigation.navigate('CustomMapView');
                        this.setState({
                            loading: false
                        });
                    });
                })
            })
        });

    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#000' />
                </View>);
        }
        else {
            return (
                <View style={styles.mainContainer}>

                    <View style={styles.headingContainer}>
                        <Text style={styles.headingText}>Choose Preferences</Text>
                    </View>

                    <View style={styles.subContainer}>
                        <View style={styles.optionBox}>
                            <TouchableOpacity style={styles.iconBoxStyle} onPress={this.acstate}>
                                {this.showIcon(this.state.ac)}
                            </TouchableOpacity>

                            <Text style={styles.textStyle}>
                                AC
                        </Text>
                        </View>

                        <View style={styles.optionBox}>
                            <TouchableOpacity style={styles.iconBoxStyle} onPress={this.nonacstate}>
                                {this.showIcon(this.state.nonac)}
                            </TouchableOpacity>

                            <Text style={styles.textStyle}>
                                NON-AC
                        </Text>
                        </View>

                        <View style={styles.optionBox}>
                            <TouchableOpacity style={styles.iconBoxStyle} onPress={this.tvstate}>
                                {this.showIcon(this.state.tv)}
                            </TouchableOpacity>

                            <Text style={styles.textStyle}>
                                TV
                        </Text>
                        </View>


                        <View style={styles.optionBox}>
                            <TouchableOpacity style={styles.iconBoxStyle} onPress={this.wifistate}>
                                {this.showIcon(this.state.wifi)}
                            </TouchableOpacity>

                            <Text style={styles.textStyle}>
                                WIFI
                        </Text>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={() => this.addPreferences()}>
                            <Text style={styles.buttonText}>
                                Go
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    headingContainer: {
        backgroundColor: '#824bdd',
        padding: (HEIGHT * 1) / 100,
        width: WIDTH,
        marginVertical: (HEIGHT * 2) / 100,
    },
    headingText: {
        fontSize: (HEIGHT * 3.5) / 100,
        color: '#fff',
        textAlign: 'center',
    },
    subContainer: {
        width: (WIDTH * 88) / 100,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 10,
    },
    optionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: (WIDTH * 7) / 100,
        alignItems: 'center',
    },
    iconBoxStyle: {
        margin: (HEIGHT * 2) / 100,
        width: (WIDTH * 12) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: (HEIGHT * 6) / 100,
        borderColor: '#000',
        borderWidth: 1,
    },
    iconStyle: {
        width: null,
    },
    textStyle: {
        fontSize: (HEIGHT * 3) / 100,
        color: '#000',
    },
    button: {
        backgroundColor: '#824bdd',
        marginVertical: (HEIGHT * 2) / 100,
        borderRadius: 10,
        marginHorizontal: (WIDTH * 5) / 100,
        padding: (HEIGHT * 2) / 100,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: (HEIGHT * 2.5) / 100,
    }
});

const mapStateToProps = state => ({
    auth: state.auth,
    pref: state.pref,
    buseslist: state.buseslist,
});

const mapDispathToProps = {
    addPreferences,
    fetchUserData,
    pref,
}

export default connect(mapStateToProps, mapDispathToProps)(ChoosePreferences);