import React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { setdate,displayACBuses,displayNONACBuses } from '../actions/BusesListAction'
import { connect } from 'react-redux'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


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
                paddingHorizontal: (WIDTH * 8) / 100,
                height: (HEIGHT * 12.7) / 100,
                justifyContent: 'center',
            },
        }
    }

    static navigationOptions = {
        header: null
    }

    nav = () => {
            if (this.props.buseslist.checked) {
                this.props.displayACBuses();
                this.props.navigation.navigate('BusesList');
            }
            else {
                this.props.displayNONACBuses();
                this.props.navigation.navigate('BusesList');
            }
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
                            paddingHorizontal: (WIDTH * 8) / 100,
                            height: (HEIGHT * 9) / 100,
                            justifyContent: 'center',
                        }
                    })} >
                        <View style={styles.rowStyle}>
                            <Text style={styles.textStyle}>Business</Text>
                            <Icon name='bus' size={(HEIGHT * 6) / 100} color='#000' />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={this.state.colStyle} onPress={() => this.setState({
                        selectedcategory: "AC",
                        showbutton: true,
                        colStyle: {
                            paddingHorizontal: (WIDTH * 8) / 100,
                            height: (HEIGHT * 9) / 100,
                            justifyContent: 'center',
                        }
                    })} >
                        <View style={styles.rowStyle}>
                            <Text style={styles.textStyle}>AC</Text>
                            <Icon name='bus' size={(HEIGHT * 6) / 100} color='#000' />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={this.state.colStyle} onPress={() => this.setState({
                        selectedcategory: "NON-AC",
                        showbutton: true,
                        colStyle: {
                            paddingHorizontal: (WIDTH * 8) / 100,
                            height: (HEIGHT * 9) / 100,
                            justifyContent: 'center',
                        }
                    })} >
                        <View style={styles.rowStyle}>
                            <Text style={styles.textStyle}>NON-AC</Text>
                            <Icon name='bus' size={(HEIGHT * 6) / 100} color='#000' />
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
        height: (HEIGHT * 60) / 100,
        zIndex: 0,
    },
    categoriesView: {
        opacity: 0.8,
        bottom: (HEIGHT * 2) / 100,
        backgroundColor: '#dfe6e9'
    },

    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    submitStyle: {
        bottom: 0,
        height: (HEIGHT * 9) / 100,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    textStyle: {
        fontSize: (HEIGHT * 3) / 100,
        padding: (HEIGHT * 1) / 100,
        fontWeight: "bold",
        color: '#000'
    },
    separator: {
        height: (HEIGHT * 0.4) / 100,
        width: '100%',
        backgroundColor: '#000'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: (HEIGHT * 3) / 100,
        padding: (HEIGHT * 1) / 100,
        color: '#000',
        textAlign: 'center',
        fontWeight: "bold",
        alignItems: 'center'
    }

})

const mapStateToProps = state => ({
    buseslist: state.buseslist
})

export default connect(mapStateToProps, { setdate,displayACBuses,displayNONACBuses })(MyMap);