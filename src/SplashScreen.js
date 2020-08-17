import React, { Component } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";
import { setnumber, setUser } from '../actions/authActions';
import { connect } from "react-redux";
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';


const height = Math.round(Dimensions.get("window").height);
const width = Math.round(Dimensions.get("window").width);

class Splash extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        logoOpacity: new Animated.Value(0),
        titleMargineTop: new Animated.Value(width - 100),
        textMargineBottom: new Animated.Value(height / 3)
    };


    componentDidMount() {
        try {
            AsyncStorage.getItem('@userlogindata').then(
                res => {
                    if (res !== null) {
                        this.props.setUser(JSON.parse(res))
                        const newdata = JSON.parse(res);
                        console.log("all data", JSON.parse(res))
                        this.props.setnumber(newdata.number)
                    }
                }
            ).catch(error => console.log("No user data in AsyncStorage."))
        }
        catch (e) {

        }

        setTimeout(() => this.ki(), 2000);
    }

    ki = () => {
        try {
            AsyncStorage.getItem('@storage_Key').then(
                (res) => {
                    if (res !== null) {
                        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                            console.log(user);
                            if (user !== null) {
                                setTimeout(() => this.props.navigation.navigate('DrawerNavigator'), 1500);
                            }
                            else {
                                setTimeout(() => this.props.navigation.navigate('LoginPage'), 1500);
                            }
                        });
                        
                    }
                    else {
                        setTimeout(() => this.props.navigation.navigate('IntroSlider'), 1500);
                    }
                });
        }

        catch (e) {

        }
    }

    async componentWillMount() {
        Animated.sequence([
            Animated.timing(this.state.logoOpacity, {
                toValue: 1,
                duration: 1500
            }),
            Animated.timing(this.state.titleMargineTop, {
                toValue: width - (width * 2 - 100),
                duration: 1500
            }),
            Animated.timing(this.state.textMargineBottom, {
                toValue: 10,
                duration: 1000
            })
        ]).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={require("../assets/foree.png")}
                    style={{
                        ...styles.logo,
                        marginRight: this.state.titleMargineTop,
                        height: height / 5,
                        width: width / 3,
                    }}
                >

                </Animated.Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#341f97"
    },
    logo: {
        backgroundColor: "black",
        borderRadius: 10
    },
    title: {
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 20
    }
});

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    setnumber,
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)