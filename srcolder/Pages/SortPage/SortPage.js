import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, CheckBox, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';



export default class BusesList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            loading: false,
            refreshing: false,
            list: [],
        };
    }


    updateList = () => {
        this.setState({ loading: true })
        let sorted = this.props.navigation.getParam('arr', null);
        if (sorted != null) {
            this.setState({ list: sorted, loading: false })
        }
        else {
            this.setState({ loading: false });
        }
    }

    goToFilterPage = () => {
        this.props.navigation.navigate('FilterPage', { abc: this.state.list })
    }

    goToSortPage = () => {
        this.props.navigation.navigate('SortPage', { abc: this.state.list })
    }


    componentDidMount() {
        this.handleRefresh();
    }


    makeRequest = () => {
        this.setState({ loading: true })
        if (this.state.checked === true) {
            axios.post('http://192.168.1.233:5000/api/bus/AC').then((res) => this.setState({ list: res.data, loading: false, refreshing: false }))

        }
        else {
            axios.post('http://192.168.1.233:5000/api/bus/NON-AC').then((res) => this.setState({ list: res.data, loading: false, refreshing: false }))
        }
    }

    handleRefresh = () => {
        this.setState({ refreshing: true }
            , () => {
                this.makeRequest();
            })
    }

    showBuses = () => {
        this.handleRefresh();
    }



    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, opacity: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                    <ProgressBarAndroid />
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, justifyContent: 'space-between' }}>

                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        animationType= 'slide'
                        height={responsiveHeight(50)}
                        duration={150}
                        closeOnDragDown={true}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }}
                    >
                        <YourOwnComponent />
                    </RBSheet>


                    <RBSheet
                        ref={ref => {
                            this.RBSheet1 = ref;
                        }}
                        animationType='slide'
                        height={responsiveHeight(30)}
                        duration={150}
                        closeOnDragDown={true}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }}
                    >
                        <YourSecondComponent />
                    </RBSheet>

                    <NavigationEvents onDidFocus={() => this.updateList()} />
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.list}
                            extraData={this.state}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            keyExtractor={(item) => {
                                return item.Busnumber;
                            }}
                            renderItem={({ item }) =>
                                <View key={item.Busnumber} style={{ flex: 1, margin: responsiveHeight(2) }}>
                                    <View style={{ borderWidth: 1, borderColor: '#000', borderRadius: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '80%', justifyContent: "space-between" }}>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <View style={{ justifyContent: 'center', width: '50%', alignItems: 'center', marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4) }}>
                                                        <Text style={{ fontSize: responsiveHeight(1.8), color: '#000', }}>{item.Bustraveller}</Text>
                                                        <Text style={{ fontSize: responsiveHeight(1.8), color: '#000', }} >{item.Bustype}</Text>
                                                    </View>

                                                    <View style={{ justifyContent: 'center', width: '30%', alignItems: 'center', marginLeft: responsiveWidth(8) }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={{ fontSize: responsiveHeight(2), color: '#000', }}>{item.rating}</Text>
                                                            <Entypo name='star' size={responsiveHeight(2.5)} color='#d5436a' />
                                                        </View>
                                                    </View>

                                                </View>

                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: responsiveHeight(0.5) }}>

                                                    <View style={{ flexDirection: 'row' }}>
                                                        {item.firstaid ? (<FontAwesome5 name='first-aid' size={responsiveHeight(3)} color='#d5436a' style={{ marginRight: responsiveHeight(1) }} />) : null}
                                                        {item.tv ? (<Entypo name='tv' size={responsiveHeight(3)} color='#d5436a' style={{ marginRight: responsiveHeight(1) }} />) : null}
                                                        {item.wifi ? (<Icon name='wifi' size={responsiveHeight(3)} color='#d5436a' />) : null}
                                                    </View>

                                                    <Text style={{ fontSize: responsiveHeight(2), color: '#000', fontWeight: 'bold' }}>Trip time: {item.triptime}</Text>
                                                </View>
                                            </View>



                                            <View style={{ width: '20%', padding: responsiveHeight(1) }}>
                                                <View style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, marginVertical: responsiveHeight(1), alignItems: 'center', paddingVertical: responsiveHeight(0.5) }}>
                                                    <Text style={{ fontSize: responsiveHeight(1.7), color: '#000', fontWeight: 'bold' }}>{item.price}</Text>
                                                </View>
                                                <View style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, alignItems: 'center', paddingVertical: responsiveHeight(0.5) }}>
                                                    <Text style={{ fontSize: responsiveHeight(1.7), color: '#000', fontWeight: 'bold' }}>{item.pickuptime}:00 </Text>
                                                    <Icon name='arrowdown' size={30} color="#000" />
                                                    <Text style={{ fontSize: responsiveHeight(1.7), color: '#000', fontWeight: 'bold' }}>{item.dropofftime}: 00</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </View>}
                        />
                    </View>

                    <View style={styles.filtersContainer}>
                        <TouchableOpacity style={styles.singleTab} onPress={() => this.RBSheet.open()}>
                            <Text style={styles.filterText}>Filter</Text>
                            <Text style={styles.filterText}>25 buses</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.singleTab} onPress={() => this.RBSheet1.open()}>
                            <Text style={styles.filterText}>Sort</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.singleTab} >
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <CheckBox

                                    style={{ backgroundColor: '#000' }}
                                    value={this.state.checked}
                                    onValueChange={() => { this.setState({ checked: !this.state.checked }); this.showBuses() }}
                                />
                                <View>
                                    <Text style={styles.filterText}>Show AC</Text>
                                    <Text style={styles.filterText}>Buses</Text>
                                </View>
                            </TouchableOpacity>

                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

};

class YourOwnComponent extends Component {

    constructor() {
        super();
        this.state = {
            checked: false,
            loading: false,
            scrollEnabled: false,
            list: [],
            newdata: [],
            twelvetofour: false,
            fourtoeight: false,
            eighttotwelve: false,
            ac: false,
            nonac: false,
            business: false,
            ratingplus2: false,
            ratingplus3: false,
            ratingplus4: false,
            selectedBox: {
                backgroundColor: "#000",
                borderRadius: 7,
                borderWidth: 1,
                borderColor: "#000"
            }
        };
    }

    filterData = () => {

        var filtered = this.state.list;
    
        if (this.state.twelvetofour === true) {
          filtered = filtered.filter(function (a) {
            return (a.pickuptime <= 4)
          })
        }
        else if (this.state.fourtoeight === true) {
          filtered = filtered.filter(function (a) {
            return (a.pickuptime >= 4 && a.pickuptime <= 8)
          });
        }
        else if (this.state.eighttotwelve === true) {
          filtered = filtered.filter(function (a) {
            return (a.pickuptime >= 8 && a.pickuptime < 12)
          });
        }
        else {
          this.setState({ newdata: this.state.list })
        }
    
        if (this.state.business === true) {
          filtered = filtered.filter(function (a) {
            return a.Bustype == "BUSINESS";
          });
        }
        else if (this.state.ac === true) {
          filtered = filtered.filter(function (a) {
            return a.Bustype == "AC";
          });
        }
        else if (this.state.nonac === true) {
          filtered = filtered.filter(function (a) {
            return a.Bustype == "NON-AC";
          });
        }
        else {
          this.setState({ newdata: this.state.list });
        }
    
        if (this.state.ratingplus2 === true) {
          filtered = filtered.filter(function (a) {
            return a.rating > 2
          });
        }
        else if (this.state.ratingplus3 === true) {
          filtered = filtered.filter(function (a) {
            return a.rating > 3
          });
        }
        else if (this.state.ratingplus4 === true) {
          filtered = filtered.filter(function (a) {
            return a.rating > 4;
          });
        }
        else {
          this.setState({ newdata: this.state.list });
        }
    
        this.props.navigation.navigate('BusesList', { arr: filtered });
      };

    render() {
        return (
            <View style={{ height: responsiveHeight(50) }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: responsiveHeight(5),
                        alignItems: "center",
                        marginHorizontal: responsiveHeight(2)
                    }}
                >
                    <TouchableOpacity
                        //onPress = { () => console.log(this.state.list)}
                        onPress={() => this.props.navigation.navigate("BusesList", { arr: this.state.newdata })}
                    >
                        <Entypo
                            name="circle-with-cross"
                            size={responsiveHeight(4)}
                            color="#000"
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Filter by</Text>
                    <TouchableOpacity onPress={() => this.filterData()}>
                        <Text style={styles.headerText}>Apply</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{ height: responsiveHeight(0.7), backgroundColor: "#000" }}
                />

                <View
                    style={{
                        height: responsiveHeight(13),
                        justifyContent: "space-around"
                    }}
                >
                    <Text style={styles.titleStyle}>Departure Time</Text>
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-around" }}
                    >
                        {this.state.twelvetofour ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() => {
                                    this.setState({
                                        twelvetofour: false,
                                        fourtoeight: false,
                                        eighttotwelve: false
                                    });
                                }}
                            >
                                <Text style={styles.boxTextStyle}>12:00-4:00</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() => {
                                        this.setState({
                                            twelvetofour: true,
                                            fourtoeight: false,
                                            eighttotwelve: false
                                        });
                                    }}
                                >
                                    <Text style={styles.boxTextStyle}>12:00-4:00</Text>
                                </TouchableOpacity>
                            )}

                        {this.state.fourtoeight ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() =>
                                    this.setState({
                                        twelvetofour: false,
                                        fourtoeight: false,
                                        eighttotwelve: false
                                    })
                                }
                            >
                                <Text style={styles.boxTextStyle}>4:00-8:00</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() =>
                                        this.setState({
                                            twelvetofour: false,
                                            fourtoeight: true,
                                            eighttotwelve: false
                                        })
                                    }
                                >
                                    <Text style={styles.boxTextStyle}>4:00-8:00</Text>
                                </TouchableOpacity>
                            )}

                        {this.state.eighttotwelve ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() =>
                                    this.setState({
                                        twelvetofour: false,
                                        fourtoeight: false,
                                        eighttotwelve: false
                                    })
                                }
                            >
                                <Text style={styles.boxTextStyle}>8:00-12:00</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() =>
                                        this.setState({
                                            twelvetofour: false,
                                            fourtoeight: false,
                                            eighttotwelve: true
                                        })
                                    }
                                >
                                    <Text style={styles.boxTextStyle}>8:00-12:00</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>

                <View
                    style={{ height: responsiveHeight(0.7), backgroundColor: "#000" }}
                />

                <View
                    style={{
                        height: responsiveHeight(13),
                        justifyContent: "space-around"
                    }}
                >
                    <Text style={styles.titleStyle}>Bus Type</Text>
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-around" }}
                    >
                        {this.state.ac ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() =>
                                    this.setState({ ac: false, business: false, nonac: false })
                                }
                            >
                                <Text style={styles.boxTextStyle}>AC</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() =>
                                        this.setState({ ac: true, business: false, nonac: false })
                                    }
                                >
                                    <Text style={styles.boxTextStyle}>AC</Text>
                                </TouchableOpacity>
                            )}

                        {this.state.business ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() =>
                                    this.setState({ ac: false, business: false, nonac: false })
                                }
                            >
                                <Text style={styles.boxTextStyle}>Business</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() =>
                                        this.setState({ ac: false, business: true, nonac: false })
                                    }
                                >
                                    <Text style={styles.boxTextStyle}>Business</Text>
                                </TouchableOpacity>
                            )}

                        {this.state.nonac ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() =>
                                    this.setState({ ac: false, business: false, nonac: false })
                                }
                            >
                                <Text style={styles.boxTextStyle}>NON-AC</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() =>
                                        this.setState({ ac: false, business: false, nonac: true })
                                    }
                                >
                                    <Text style={styles.boxTextStyle}>NON-AC</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>

                <View
                    style={{ height: responsiveHeight(0.7), backgroundColor: "#000" }}
                />

                <View
                    style={{
                        height: responsiveHeight(13),
                        justifyContent: "space-around"
                    }}
                >
                    <Text style={styles.titleStyle}>Bus Rating</Text>
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-around" }}
                    >
                        {this.state.ratingplus2 ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() =>
                                    this.setState({
                                        ratingplus2: false,
                                        ratingplus3: false,
                                        ratingplus4: false
                                    })
                                }
                            >
                                <Text style={styles.boxTextStyle}>2+ Rating</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() =>
                                        this.setState({
                                            ratingplus2: true,
                                            ratingplus3: false,
                                            ratingplus4: false
                                        })
                                    }
                                >
                                    <Text style={styles.boxTextStyle}>2+ Rating</Text>
                                </TouchableOpacity>
                            )}

                        {this.state.ratingplus3 ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() =>
                                    this.setState({
                                        ratingplus2: false,
                                        ratingplus3: false,
                                        ratingplus4: false
                                    })
                                }
                            >
                                <Text style={styles.boxTextStyle}>3+ Rating</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() =>
                                        this.setState({
                                            ratingplus2: false,
                                            ratingplus3: true,
                                            ratingplus4: false
                                        })
                                    }
                                >
                                    <Text style={styles.boxTextStyle}>3+ Rating</Text>
                                </TouchableOpacity>
                            )}

                        {this.state.ratingplus4 ? (
                            <TouchableOpacity
                                style={this.state.selectedBox}
                                onPress={() =>
                                    this.setState({
                                        ratingplus2: false,
                                        ratingplus3: false,
                                        ratingplus4: false
                                    })
                                }
                            >
                                <Text style={styles.boxTextStyle}>4+ Rating</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    style={styles.boxStyle}
                                    onPress={() =>
                                        this.setState({
                                            ratingplus2: false,
                                            ratingplus3: false,
                                            ratingplus4: true
                                        })
                                    }
                                >
                                    <Text style={styles.boxTextStyle}>4+ Rating</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>
            </View>
        )
    }
}

class YourSecondComponent extends Component {

    constructor() {
        super();
        this.state = {
            checked: false,
            scrollEnabled: false,
            loading: false,
            list: []
        };
    }

    
    sortPriceHighToLow = () => {
        console.log("Hellooooo");
        console.log(this.state.list);
        this.state.list.sort(function (a, b) {
            this.RBSheet1.close();
            return b.price - a.price
        });
        //this.props.navigation.navigate('BusesList', { arr: this.state.list });
    }

    sortPriceLowToHigh = () => {
        this.state.list.sort(function (a, b) {
            this.RBSheet1.close();
            return a.price - b.price
        });
       // this.props.navigation.navigate('BusesList', { arr: this.state.list });
    }

    sortRatingHighToLow = () => {
        this.state.list.sort(function (a, b) {
            this.RBSheet1.close();
            return b.rating - a.rating
        });
      //  this.props.navigation.navigate('BusesList', { arr: this.state.list });
    }

    sortRatingLowToHigh = () => {
        this.state.list.sort(function (a, b) {
            this.RBSheet1.close();
            return a.rating - b.rating
        });
       // this.props.navigation.navigate('BusesList', { arr: this.state.list });
    }

    render() {
        return (
            <View style={{ height: responsiveHeight(30), width: responsiveWidth(100) }}>
                <View style={{ height: responsiveHeight(5), justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View />
                        <Text style={{ fontWeight: 'bold', fontSize: responsiveHeight(3), color: '#000' }}>Sort by</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BusesList')}>
                            <Entypo name='circle-with-cross' size={responsiveHeight(3)} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.singleRowStyle} onPress={() => this.sortPriceHighToLow()}>
                    <Text style={styles.sortText}>Price (high to low) </Text>
                </TouchableOpacity>

                <View style={styles.separator} />


                <TouchableOpacity style={styles.singleRowStyle} onPress={() => this.sortRatingHighToLow()}>
                    <Text style={styles.sortText}>Rating (high to low)</Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.singleRowStyle} onPress={() => this.sortPriceLowToHigh()}>
                    <Text style={styles.sortText}>Price (low to high) </Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.singleRowStyle} onPress={() => this.sortRatingLowToHigh()}>
                    <Text style={styles.sortText}>Rating (low to high) </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(90),
        width: responsiveWidth(100),
    },
    filtersContainer: {
        flexDirection: 'row',
        bottom: 0,
    },
    singleTab: {
        alignItems: 'center',
        width: responsiveWidth(33.33),
        height: responsiveHeight(7),
        justifyContent: 'center',
        backgroundColor: '#d5436a',
        borderWidth: responsiveHeight(0.1),
        borderBottomColor: '#000',
    },
    filterText: {
        fontSize: responsiveHeight(2),
        textAlign: 'center',
        color: '#000'
    },
    titleStyle: {
        fontSize: responsiveHeight(3.5),
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center"
    },
    boxStyle: {
        backgroundColor: "#d5436a",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#d5436a"
    },
    headerText: {
        fontSize: responsiveHeight(3.5),
        color: "#000",
        fontWeight: "bold"
    },
    boxTextStyle: {
        paddingHorizontal: responsiveWidth(1),
        paddingVertical: responsiveHeight(1),
        fontSize: responsiveHeight(2.5),
        fontWeight: "bold",
        color: "#fff"
    },
    separator: {
        height: '1%',
        backgroundColor: '#000',
        width: responsiveWidth(100)
    },
    sortText: {
        fontSize: responsiveHeight(3),
        color: '#000',
        marginLeft: responsiveWidth(2),
        fontWeight: 'bold',
    },
    singleRowStyle: {
        height: responsiveHeight(5),
        justifyContent: 'center',
    }
});