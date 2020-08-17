import React, { Component } from 'react';
import { View, Image, Text, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { responsiveHeight } from 'react-native-responsive-dimensions';


export default class EnterLocations extends Component {

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
            ff: { flex: 1 },
            gg: { height: 0 }
        };
    }

    static navigationOptions = {
        header: null
    }

    render() {
        let shouldDisplayListView = false;
        return (
            <View style={{ flex: 1 }}>

                <View style={this.state.ff}>
                    <GooglePlacesAutocomplete listViewDisplayed={shouldDisplayListView}
                        placeholder='Search'
                        minLength={2} 
                        autoFocus={false}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        listViewDisplayed='false'
                        renderDescription={row => row.description}
                        onPress={(data, details = null) => {
                            this.setState({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 0.3,
                                longitudeDelta: 0.3,
                                show: true,
                                ff: { height: 70 },
                                gg: { flex: 1 }
                              });
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
                                height: responsiveHeight(10),
                            },
                            listView: {
                                marginTop:responsiveHeight(12),
                                position:'absolute'
                            },
                            container: {
                                marginTop: responsiveHeight(5)

                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                                position: 'absolute',
                            }
                        }}

                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            type: 'bus_station'
                          }}    
                          GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'address_component',
                          }}

                        filterReverseGeocodingByTypes={['locality','adminstrative_area_level_3' ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        predefinedPlacesAlwaysVisible={true}

                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                </View>

                <View style={this.state.gg}>
                    {
                        this.state.show ? (<GooglePlacesAutocomplete
                            placeholder='Search'
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            fetchDetails={true}
                            enablePoweredByContainer={false}
                            listViewDisplayed='false'
                            renderDescription={row => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                this.setState({
                                    latitude1: details.geometry.location.lat,
                                    longitude1: details.geometry.location.lng,
                                    latitudeDelta1: 0.3, longitudeDelta1: 0.3,

                                });

                                
                            let source = {
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitude1: this.state.latitude1,
                                longitude1: this.state.longitude1,
                            }

                               
                                    this.props.navigation.navigate('MyMap', source);
                              
                            }}


                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyBbxQreu_oo1VGL8H3UMwWdrjY4izmoldo',
                                language: 'en', // language of the results
                                types: '(cities)', // default: 'geocode'
                                components: 'country:pk'
                            }}

                            styles={{
                                description: {
                                    fontWeight: 'bold',
                                    height: responsiveHeight(5),
                                },
                                container: {
                                    marginTop: responsiveHeight(3),
                                },
                                textInputContainer: {
                                    height: 60
                                  },
                                  textInput: {
                                    marginRight: 10,
                                    height: 40
                                  },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                },
                                listView:{
                                    marginTop:responsiveHeight(5),
                                  }
                            }}

                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                            predefinedPlacesAlwaysVisible={true}

                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />) : null


                    }

                </View>
            </View>
        );
    }
    onPress = () => {
        alert(this.state.longitude + " " + this.state.longitude1)
    }
}
