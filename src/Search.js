import React, { PureComponent } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import SearchField from '../components/SearchField';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { sourceName, destinationeName, starter } from '../actions/BusesListAction';
import { connect } from "react-redux";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var fitem = true;
var sitem = true;

var cities = ["Karachi", "Hyderabad", "Multan", "Lahore", "Peshawar", "Islamabad", "Quetta", "Gilgit"];

class Search extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,

            data: [{
                name: "Karachi",
                coordinate: {
                    latitude: 24.8667795,
                    longitude: 67.0311286
                }
            },
            {
                name: "Hyderabad",
                coordinate: {
                    latitude: 25.3801,
                    longitude: 68.375
                }
            },
            {
                name: "Multan",
                coordinate: {
                    latitude: 30.1979793,
                    longitude: 71.4724978
                }
            },
            {
                name: "Lahore",
                coordinate: {
                    latitude: 31.5656079,
                    longitude: 74.3141775
                }
            },
            {
                name: "Peshawar",
                coordinate: {
                    latitude: 34.0123846,
                    longitude: 71.5787458
                }
            },
            {
                name: "Islamabad",
                coordinate: {
                    latitude: 33.6357394,
                    longitude: 72.9230467
                }
            },
            {
                name: "Quetta",
                coordinate: {
                    latitude: 30.1891852,
                    longitude: 67.0184433
                }
            },
            {
                name: "Gilgit",
                coordinate: {
                    latitude: 35.9208102,
                    longitude: 74.314044
                }
            }],

            error: null,
            firstvalue: '',
            secondvalue: '',
            latitude: null,
            longitude: null,
            latitude1: null,
            longitude1: null,
        };

        this.arrayholder = [];
    }

    componentDidMount() {
        this.arrayholder = this.state.data;
    }

    searchFirstFilterFunction = text => {
        if (fitem === false) {
            fitem = true;
        }
        this.setState({
            firstvalue: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    searchSecondFilterFunction = text => {
        if (sitem === false) {
            sitem = true;
        }
        this.setState({
            secondvalue: text,
        });

        const snewData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: snewData,
        });
    };

    go = () => {

        this.setState({ loading: true });

        var fmatch;
        var smatch;

        if (cities.includes(this.state.firstvalue)) {
            fmatch = true;
        }

        if (cities.includes(this.state.secondvalue)) {
            smatch = true;
        }

        if (fmatch && smatch && this.state.firstvalue !== this.state.secondvalue) {
            this.props.starter(this.state.firstvalue, this.state.secondvalue , new Date(), () => {
                this.setState({
                    firstvalue: '',
                    secondvalue: '',
                    loading: false,
                });

                let source = {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitude1: this.state.latitude1,
                    longitude1: this.state.longitude1,
                }

                this.props.navigation.navigate('MyMap', source);
            });
        }
        else {
            this.setState({
                firstvalue: '',
                secondvalue: '',
                loading: false,
            });

            ToastAndroid.show(
                'Please Enter Valid Locations',
                ToastAndroid.SHORT,
            );
        }
    }

    renderFirstDecider({ item }) {
        if (this.state.firstvalue !== '' && fitem) {
            return (

                <TouchableOpacity onPress={() => {
                    fitem = false;
                    this.setState({ firstvalue: item.name, latitude: item.coordinate.latitude, longitude: item.coordinate.longitude });
                    this.props.sourceName(item.name);
                }}>
                    <Text style={{ fontSize: 20, color: '#000', marginHorizontal: (WIDTH * 5) / 100, marginVertical: (HEIGHT * 1) / 100, padding: (HEIGHT * 2) / 100 }}>{item.name}</Text>
                    <View style={{ backgroundColor: '#000', height: (HEIGHT * 0.5) / 100 }} />
                </TouchableOpacity>
            );
        }
    }

    renderSecondDecider({ item }) {
        if (this.state.secondvalue !== '' && sitem) {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({ secondvalue: item.name, latitude1: item.coordinate.latitude, longitude1: item.coordinate.longitude });
                    sitem = false;
                    this.props.destinationeName(item.name);
                }}>
                    <Text style={{ fontSize: 20, color: '#000', marginHorizontal: (WIDTH * 5) / 100, marginVertical: (HEIGHT * 1) / 100, padding: (HEIGHT * 2) / 100 }}>{item.name}</Text>
                    <View style={{ backgroundColor: '#000', height: (HEIGHT * 0.5) / 100 }} />
                </TouchableOpacity>
            );
        }
    }

    render() {


        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={{ marginVertical: (HEIGHT * 3) / 100 }}>
                    <SearchField
                        placeholder="Enter Source Location ..."
                        onChangeText={this.searchFirstFilterFunction}
                        value={this.state.firstvalue}
                    />

                    <FlatList
                        keyboardShouldPersistTaps='always'
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={({ item }) => (
                            this.renderFirstDecider({ item })
                        )}
                        keyExtractor={item => item.name}
                    />
                </View>

                <View style={{ marginVertical: (HEIGHT * 3) / 100 }}>
                    <SearchField
                        placeholder="Enter Destination Location ..."
                        onChangeText={this.searchSecondFilterFunction}
                        value={this.state.secondvalue}
                    />

                    <FlatList
                        keyboardShouldPersistTaps="always"
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={({ item }) => (
                            this.renderSecondDecider({ item })
                        )}
                        keyExtractor={item => item.name}
                    />
                </View>

                <TouchableOpacity
                    onPress={this.go}
                    style={{ backgroundColor: '#824bdd', bottom: 50, position: 'absolute', right: 30, padding: 10, borderRadius: 20 }}>
                    <AntDesign name='arrowright' size={(HEIGHT * 6 / 100)} color='#000' />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    buseslist: state.buseslist,
})

const mapDispatchToProps = {
    sourceName,
    destinationeName,
    starter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);