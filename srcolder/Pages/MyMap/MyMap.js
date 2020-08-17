import React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


class MyMap extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedcategory: null,
            showbutton: false,
            numberState: null,
            wholelist: [],
            checked: false,
            colStyle: {
                paddingHorizontal: responsiveWidth(8),
                height: responsiveHeight(12.7),
                justifyContent: 'center',
            },
        }
    }

    componentDidMount() {


        this.fetchList();
    }




    fetchList = () => {

        let coords = this.props.navigation.state.params;



        axios.post('http://192.168.18.5:5000/api/bus/data').then((bus) => this.setState({ wholelist: bus.data }));

        if (coords.number !== null) {
            const User = {
                phonenumber: coords.number
            }
            axios.post('http://192.168.18.5:5000/api/users/ac-nonac-state', User
            ).then(
                res => res.data).then((data) => {
                    this.setState({ checked: data.bustype });
                });
        }
    }

    static navigationOptions = {
        header: null
    }

    nav = () => {
        let coords = this.props.navigation.state.params;
        this.props.navigation.navigate('BusesList', { cc: this.state.checked, dd: this.state.wholelist, ee: coords.fname, ff: coords.sname });
    }

    render() {

        let coords = this.props.navigation.state.params;


        return (
            <View >
                <MapView
                    initialRegion={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.045,
                        longitudeDelta: 0.045,
                    }
                    }
                    showsMyLocationButton={false}
                    style={styles.mapStyle}
                    rotateEnabled={true}>

                    <MapView.Marker coordinate={{
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    }} />
                    <MapView.Marker coordinate={{
                        latitude: coords.latitude1,
                        longitude: coords.longitude1,
                    }} />

                    <MapViewDirections
                        origin={{
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        }}
                        destination={{
                            latitude: coords.latitude1,
                            longitude: coords.longitude1,
                        }}
                        apikey="AIzaSyBbxQreu_oo1VGL8H3UMwWdrjY4izmoldo"
                        strokeWidth={3}
                        strokeColor="red"
                    />

                </MapView>

                <View style={styles.categoriesView}>

                    <TouchableOpacity style={this.state.colStyle} onPress={() => this.setState({
                        selectedcategory: "business",
                        showbutton: true,
                        colStyle: {
                            paddingHorizontal: responsiveWidth(8),
                            height: responsiveHeight(9),
                            justifyContent: 'center',
                        }
                    })} >
                        <View style={styles.rowStyle}>
                            <Text style={styles.textStyle}>Business</Text>
                            <Icon name='bus' size={responsiveHeight(6)} color='#000' />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={this.state.colStyle} onPress={() => this.setState({
                        selectedcategory: "AC",
                        showbutton: true,
                        colStyle: {
                            paddingHorizontal: responsiveWidth(8),
                            height: responsiveHeight(9),
                            justifyContent: 'center',
                        }
                    })} >
                        <View style={styles.rowStyle}>
                            <Text style={styles.textStyle}>AC</Text>
                            <Icon name='bus' size={responsiveHeight(6)} color='#000' />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={this.state.colStyle} onPress={() => this.setState({
                        selectedcategory: "NON-AC",
                        showbutton: true,
                        colStyle: {
                            paddingHorizontal: responsiveWidth(8),
                            height: responsiveHeight(9),
                            justifyContent: 'center',
                        }
                    })} >
                        <View style={styles.rowStyle}>
                            <Text style={styles.textStyle}>NON-AC</Text>
                            <Icon name='bus' size={responsiveHeight(6)} color='#000' />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    {this.state.showbutton ? (<View style={styles.submitStyle}>
                        <TouchableOpacity style={styles.colStyle} onPress={() => this.nav()}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>) : null}

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },
    mapStyle: {
        height: responsiveHeight(60),
        zIndex: 0,
    },
    categoriesView: {
        opacity: 0.8,
        bottom: responsiveHeight(2),
        backgroundColor: '#dfe6e9'
    },

    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    submitStyle: {
        bottom: 0,
        height: responsiveHeight(9),
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    textStyle: {
        fontSize: responsiveHeight(3),
        padding: responsiveHeight(1),
        fontWeight: "bold",
        color: '#000'
    },
    separator: {
        height: responsiveHeight(0.4),
        width: '100%',
        backgroundColor: '#000'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: responsiveHeight(3),
        padding: responsiveHeight(1),
        color: '#000',
        textAlign: 'center',
        fontWeight: "bold",
        alignItems: 'center'
    }

})

export default MyMap;