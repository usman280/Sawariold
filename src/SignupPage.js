import React, { Component } from 'react';
import { View, ActivityIndicator, ToastAndroid, TouchableOpacity, TextInput, StyleSheet, Dimensions, Text, BackHandler, Alert, AppState } from 'react-native';
import { connect } from "react-redux";
import { registerUser, logout } from '../actions/authActions';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            mobilenumber: '',
            ok: '',
            email: null,
            emailValidate: null,
            loading: false,
            mytoken: "ASD",
            appState: AppState.currentState,
        }
    }

    _handleAppStateChange = () => {

        this.setState({ appState: AppState.currentState }, () => {

            if (
                this.state.appState.match(/background/)
            ) {
                firebase.auth().signOut();    
                AsyncStorage.removeItem('@number');
                AsyncStorage.removeItem('@userlogindata');
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                // this.exitApp();
            }
        });
    };


    handleBackButton() {
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Yes', onPress: () => {
                        firebase.auth().signOut();
                        AsyncStorage.removeItem('@number');
                        AsyncStorage.removeItem('@userlogindata');
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                        //console.log("callback executed");
                        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
                        //BackHandler.exitApp();
                        //this.props.logout();
                    }
                },
            ],
            { cancelable: false }
        );
        return true;
    }


    nameHandler = name => {
        this.setState({ name: name });
    };
    emailHandler = email => {
        this.setState({ email: email });

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            return false;
        }
        else {
            this.setState({ emailValidate: true })
        }

    };


    register = () => {

        this.setState({ loading: true });

        const User = {
            name: this.state.name,
            phonenumber: this.props.auth.number,
            email: this.state.email,
            token: this.state.mytoken,
        }

        if (this.state.emailValidate == true) {
            this.props.registerUser(User, () => {
                if (this.props.auth.msg == 'userexist') {
                    this.setState({ loading: false, name: null, email: null, emailValidate: null, mobilenumber: null, mytoken: null });
                }
                else {
                    this.setState({ loading: false, email: null, name: null, mobilenumber: null, mytoken: null }, () => {
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                        AppState.removeEventListener('change', this._handleAppStateChange);
                        this.props.navigation.navigate('Preferences');
                    });
                }
            });
        }
        else {
            this.setState({
                loading: false,
                email: null,
                name: null,
            });

            ToastAndroid.show(
                'Invalid Details',
                ToastAndroid.SHORT,
            );
        }

    }


    static navigationOptions = {
        header: null
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color='#000' size='large' />
                </View>);
        }
        else {
            return (
                <View style={styles.mainContainer}>
                    <NavigationEvents
                        onDidFocus={() => {
                            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
                            AppState.addEventListener('change', this._handleAppStateChange);
                        }}
                    />
                    <View style={styles.inputContainerGroup}>

                        <TextInput
                            onChangeText={this.nameHandler}
                            style={styles.inputField}
                            value={this.state.name}
                            underlineColorAndroid="#842bdd"
                            placeholder="Enter your name"
                        />
                        <TextInput
                            style={styles.inputField}
                            value={this.state.email}
                            onChangeText={this.emailHandler}
                            underlineColorAndroid="#842bdd"
                            placeholder="Enter your email"
                        />

                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.register()}>
                        <Text style={styles.buttonText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainerGroup: {
        backgroundColor: '#fff',
        width: (WIDTH * 88) / 100,
        elevation: 5,
        borderRadius: 10,
    },
    inputField: {
        paddingLeft: (WIDTH * 7) / 100,
        fontSize: (HEIGHT * 2.5) / 100,
        margin: (HEIGHT * 3) / 100,
        color: '#000',
    },
    button: {
        marginTop: (HEIGHT * 2) / 100,
        backgroundColor: '#824bdd',
        borderRadius: 5,
        justifyContent: 'center',
        height: (HEIGHT * 5) / 100,
        width: (WIDTH * 88) / 100,
    },
    buttonText: {
        fontSize: (HEIGHT * 2.5) / 100,
        textAlign: 'center',
        color: '#fff',
    }
});

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { registerUser, logout })(SignupPage);