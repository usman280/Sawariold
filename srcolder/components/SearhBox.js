import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class SearchBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            longitudeDelta: 0,
            latitudeDelta: 0,
            show: false,
            latitude1: 0,
            longitude1: 0,
            longitudeDelta1: 0,
            latitudeDelta1: 0,
            error: null,
            orgin: null,
            destination: null,
            firstbox: { flex: 1 },
            secondbox: { height: 0},
        };
    }

    render() {
        let shouldDisplayListView = false;
        return (

            <View style={{flex: 1}}>

                <View style={this.state.firstbox}>
                    <GooglePlacesAutocomplete listViewDisplayed={shouldDisplayListView}
                        placeholder='Search'
                        minLength={2}
                        autoFocus={false}
                        fetchDetails={true}
                        listViewDisplayed='false'
                        renderDescription={row => row.description}
                        onPress={(data, details = null) => {

                            this.setState({
                                orgin: {
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.045, longitudeDelta: 0.045,
                                },
                                firstbox: {height: 60},
                                secondbox: {flex: 1},
                                show: true,
                            });



                            if(this.state.show === true ) {
                                this.setState({
                                    firstbox: { height: 60},
                                    secondbox: {flex: 1},
                                });
                            }
                            else{
                                this.setState({
                                    secondbox:{height: 0},
                                    firstbox: { flex: 1},
                                })
                            }
                            }
                        }



                        query={{

                            key: 'AIzaSyBbxQreu_oo1VGL8H3UMwWdrjY4izmoldo',
                            language: 'en',
                            types: '(cities)',
                            components: 'country:pk'
                        }}

                        styles={{
                            description: {
                                fontWeight: 'bold',
                                height: 50,
                            },
                            listView: {
                            },
                            container: {
                                height: 20,

                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                                position: 'absolute',
                            }
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                        predefinedPlacesAlwaysVisible={true}

                        debounce={200}
                    />
                </View>

                <View style={this.state.secondbox}>
                    {
                        this.state.show ? (<GooglePlacesAutocomplete
                            placeholder='Search'
                            minLength={2}
                            autoFocus={false}
                            fetchDetails={true}
                            listViewDisplayed='false'
                            renderDescription={row => row.description}
                            onPress={(data, details = null) => {

                                this.setState({
                                    destination:{
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.045, longitudeDelta: 0.045,
                                    },
                                });

                                if(this.state.show === false ) {
                                    this.setState({
                                        secondbox: { height: 0 },
                                        firstbox: { flex: 1},
                                    });
                                }
                                else{
                                    this.setState({
                                        secondbox: { flex: 1},
                                        firstbox: { height: 60 },
                                    })
                                }

                            }}


                            query={{
                                key: 'AIzaSyBbxQreu_oo1VGL8H3UMwWdrjY4izmoldo',
                                language: 'en',
                                types: '(cities)',
                                components: 'country:pk'
                            }}

                            styles={{
                                description: {
                                    fontWeight: 'bold',
                                    height: 50,
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                }
                            }}

                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                            predefinedPlacesAlwaysVisible={true}

                            debounce={200}
                        />) : null
                    }

                </View>
            </View>
        );
    }
}