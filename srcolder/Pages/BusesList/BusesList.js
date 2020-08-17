import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { is } from '@babel/types';


var isHiddenFilter = true;
var isHiddenSort = true;
var ACbuses, NONACbuses;


export default class BusesList extends Component {


    singleBus = () => {
        this.props.navigation.navigate('SelectedBus',
            {
                Bus_Number: item.Busnumber,
                Departure_Time: item.pickuptime,
                Arrival_Time: item.dropofftime,
                Trip_Time: item.triptime,
                Total_Amount: item.price,
                Rating: item.rating,
                Company_Name: item.Bustraveller
            })
    }

    constructor(props) {
        super(props);
        this.state = {
            number: null,
            checked: false,
            first: null,
            second: null,
            loading: true,
            refreshing: false,
            wholelist: [],
            list: [],
            sortbounceValue: new Animated.Value(responsiveHeight(50)),
            filterbounceValue: new Animated.Value(responsiveHeight(50)),
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
                width: responsiveWidth(27),
                borderColor: "#000"
            },
            busbookingid: null,
        };
    }

    sortPriceHighToLow = () => {
        this.state.list.sort(function (a, b) {
            return b.price - a.price
        });
        this.setState({ list: this.state.list });
        this._toggleSortview();
    }

    sortPriceLowToHigh = () => {
        this.state.list.sort(function (a, b) {
            return a.price - b.price
        });
        this.setState({ list: this.state.list });
        this._toggleSortview();
    }

    sortRatingHighToLow = () => {
        this.state.list.sort(function (a, b) {
            return b.rating - a.rating
        });
        this.setState({ list: this.state.list });
        this._toggleSortview();
    }

    sortRatingLowToHigh = () => {
        this.state.list.sort(function (a, b) {
            return a.rating - b.rating
        });
        this.setState({ list: this.state.list });
        this._toggleSortview();
    }

    filterData = () => {

        var filtered = this.state.wholelist;

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
            this.setState({ list: this.state.list });
        }

        this.setState({ list: filtered });
        this._toggleFilterview();
    };

    _toggleSortview() {
        var toValue = 300;

        if (isHiddenSort) {
            toValue = 0;
        

        //This will animate the transalteY of the subview between 0 & 100 depending on its current state
        //100 comes from the style below, which is the height of the subview.
        Animated.spring(
            this.state.sortbounceValue,
            {
                toValue: toValue,
                velocity: 30,
                tension: 200,
                friction: 80,
            }
        ).start();
        }

        else {
            toValue = 300;
        

            //This will animate the transalteY of the subview between 0 & 100 depending on its current state
            //100 comes from the style below, which is the height of the subview.
            Animated.spring(
                this.state.sortbounceValue,
                {
                    toValue: toValue,
                    velocity: 30,
                    tension: 200,
                    friction: 80,
                }
            ).start();
        }

        isHiddenSort = !isHiddenSort;
    }

    _toggleFilterview() {

        var toValue = 400;

        if (isHiddenFilter) {
            toValue = 0;

            Animated.spring(
                this.state.filterbounceValue,
                {
                    toValue: toValue,
                    velocity: 30,
                    tension: 200,
                    friction: 80,
                }
            ).start();
        }
        else {
            toValue = 400;

            Animated.spring(
                this.state.filterbounceValue,
                {
                    toValue: toValue,
                    velocity: 30,
                    tension: 200,
                    friction: 80,
                }
            ).start();
        }

        //This will animate the transalteY of the subview between 0 & 100 depending on its current state
        //100 comes from the style below, which is the height of the subview.


        isHiddenFilter = !isHiddenFilter;
    }

    componentDidMount() {
        this.getting();
    }

    getting = () => {
        let fulldata = this.props.navigation.getParam('dd', null);
        if (fulldata !== null) {
            this.setState({ wholelist: fulldata });
            console.log(fulldata);
        }
        let decide = this.props.navigation.getParam('cc', false);
        this.setState({ checked: decide, loading: false });
        this.handleRefresh();

        let fname = this.props.navigation.getParam('ee', null);
        if (fname != null) {
            this.setState({ first: fname });
        }

        let sname = this.props.navigation.getParam('ff', null);
        if (sname !== null) {
            this.setState({ second: sname });
        }
    }

    makeRequest = () => {

        if (this.state.checked === true) {
            axios.post('http://192.168.1.246:5000/api/bus/AC').then((res) => {
                this.setState({ list: res.data, loading: false, refreshing: false });
                ACbuses = res.data;
            }
            );
            axios.post('http://192.168.1.246:5000/api/bus/NON-AC').then((res) => NONACbuses = res.data);

        }
        else {
            axios.post('http://192.168.1.246:5000/api/bus/NON-AC').then((res) => {
                this.setState({ list: res.data, loading: false, refreshing: false })
                NONACbuses = res.data;
            }
            );
            axios.post('http://192.168.1.246:5000/api/bus/AC').then((res) => ACbuses = res.data);
        }
        this.setState({ refreshing: false });
    }

    handleRefresh = () => {
        this.setState({ refreshing: true }
            , () => {
                this.makeRequest();
            })
    }

    showBuses = () => {
        if (this.state.checked === true) {
            this.setState({ list: NONACbuses });
        }
        else {
            this.setState({ list: ACbuses });
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#000' />
                </View>
            )
        }
        else {
            return (
                <View style={{flex: 1}}>
                    <View style={{ height: responsiveHeight(8), backgroundColor: '#05004E', alignItems: 'center', top: 0, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DropDown')}>
                            <Text style={{ color: '#fff', fontSize: responsiveHeight(3), paddingRight: responsiveWidth(3) }}>
                                {this.state.first + " -- " + this.state.second}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableWithoutFeedback onPress={
                        () => {
                            console.log('khalijaga ka filter', isHiddenFilter);
                            console.log('khalijaga ka sort ', isHiddenSort);
                            if (isHiddenFilter == false) {
                                this._toggleFilterview();
                            }
                            else if (isHiddenSort == false) {
                                this._toggleSortview();
                            }
                        }
                    }>
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
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log("ishiddenfilter", isHiddenFilter);
                                            console.log("ishiddensort", isHiddenSort);
                                            if (isHiddenFilter === false) {
                                                this._toggleFilterview();
                                            }
                                            else if (isHiddenSort === false) {
                                                this._toggleSortview();
                                            }
                                            else  {
                                                this.props.navigation.navigate('SelectedBus',
                                                    {
                                                        Bus_Number: item.Busnumber,
                                                        Departure_Time: item.pickuptime,
                                                        Arrival_Time: item.dropofftime,
                                                        Trip_Time: item.triptime,
                                                        Total_Amount: item.price,
                                                        Rating: item.rating,
                                                        Company_Name: item.Bustraveller
                                                    })
                                            }
                                        }
                                        }
                                        key={item.Busnumber} style={{ flex: 1, margin: responsiveHeight(2) }}>
                                        <View style={{ borderWidth: 1, borderColor: '#000', borderRadius: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: '80%', justifyContent: "space-between" }}>

                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                        <View style={{ justifyContent: 'center', width: '50%', alignItems: 'center', marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4) }}>
                                                            <Text style={{ fontSize: responsiveHeight(2.3), color: '#000', }}>{item.Bustraveller}</Text>
                                                            <Text style={{ fontSize: responsiveHeight(2.5), color: '#000', }} >{item.Bustype}</Text>
                                                        </View>

                                                        <View style={{ justifyContent: 'center', width: '30%', alignItems: 'center', marginLeft: responsiveWidth(8) }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ fontSize: responsiveHeight(2.3), color: '#000', }}>{item.rating}</Text>
                                                                <Entypo name='star' size={responsiveHeight(2.7)} color='#d5436a' />
                                                            </View>
                                                        </View>

                                                    </View>

                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: responsiveHeight(0.5) }}>

                                                        <View style={{ flexDirection: 'row' }}>
                                                            {item.firstaid ? (<FontAwesome5 name='first-aid' size={responsiveHeight(3)} color='#d5436a' style={{ marginRight: responsiveHeight(1) }} />) : null}
                                                            {item.tv ? (<Entypo name='tv' size={responsiveHeight(3)} color='#d5436a' style={{ marginRight: responsiveHeight(1) }} />) : null}
                                                            {item.wifi ? (<Icon name='wifi' size={responsiveHeight(3)} color='#d5436a' />) : null}
                                                        </View>

                                                        <Text style={{ fontSize: responsiveHeight(2.3), color: '#000', fontWeight: 'bold' }}>Trip time: {item.triptime}</Text>
                                                    </View>
                                                </View>



                                                <View style={{ width: '20%', padding: responsiveHeight(1) }}>
                                                    <View style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, marginVertical: responsiveHeight(1), alignItems: 'center', paddingVertical: responsiveHeight(0.5) }}>
                                                        <Text style={{ fontSize: responsiveHeight(2.3), color: '#000', fontWeight: 'bold' }}>{item.price}</Text>
                                                    </View>
                                                    <View style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, alignItems: 'center', paddingVertical: responsiveHeight(0.5) }}>
                                                        <Text style={{ fontSize: responsiveHeight(2.3), color: '#000', fontWeight: 'bold' }}>{item.pickuptime}:00 </Text>
                                                        <Icon name='arrowdown' size={30} color="#000" />
                                                        <Text style={{ fontSize: responsiveHeight(2.3), color: '#000', fontWeight: 'bold' }}>{item.dropofftime}: 00</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                    </TouchableOpacity>}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.filtersContainer}>
                        <TouchableOpacity style={styles.singleTab} onPress={() => { this._toggleFilterview() }}>
                            <Text style={styles.filterText}>Filter</Text>
                            <Text style={styles.filterText}>25 buses</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.singleTab} onPress={() => { this._toggleSortview(); }}>
                            <Text style={styles.filterText}>Sort</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.singleTab} >
                            <CheckBox
                                style={{ backgroundColor: '#000 ' }}
                                size={responsiveHeight(3)}
                                title="AC Buses"
                                checkedIcon={<AntDesign name='check' color='#fff' size={responsiveHeight(3)} />}
                                uncheckedColor="#fff"
                                checked={this.state.checked}
                                onPress={() => {
                                    this.setState({ checked: !this.state.checked });
                                    this.showBuses();
                                }}
                                textStyle={{ fontSize: responsiveHeight(2), color: '#000', fontWeight: 'normal' }}
                                containerStyle={{
                                    alignItems: 'center',
                                    width: responsiveWidth(33.33),
                                    height: responsiveHeight(7),
                                    justifyContent: 'center',
                                    backgroundColor: '#d5436a',
                                    borderWidth: responsiveHeight(0.1),
                                    borderColor: '#000',
                                    borderRadius: 0,
                                }}
                            />

                        </TouchableOpacity>
                    </View>

                    <Animated.View
                        style={[styles.filterView,
                        { transform: [{ translateY: this.state.filterbounceValue }] }]}
                    >
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
                                    onPress={() => this._toggleFilterview()}
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
                    </Animated.View>

                    <Animated.View
                        style={[styles.sortView,
                        { transform: [{ translateY: this.state.sortbounceValue }] }]}
                    >
                        <View style={{ height: responsiveHeight(30), width: responsiveWidth(100) }}>
                            <View style={{ height: responsiveHeight(5), justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View />
                                    <Text style={{ fontWeight: 'bold', fontSize: responsiveHeight(3), color: '#000' }}>Sort by</Text>
                                    <TouchableOpacity onPress={() => this._toggleSortview()}>
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
                    </Animated.View>
                </View>
            );
        }
    }

};


const styles = StyleSheet.create({
    container: {
        top: 0,
        height: responsiveHeight(82),
        width: responsiveWidth(100),
    },
    filtersContainer: {
        flexDirection: 'row',
        bottom: 0,
        position: 'absolute'
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
        fontSize: responsiveHeight(3),
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center"
    },
    boxStyle: {
        backgroundColor: "#d5436a",
        borderRadius: 7,
        borderWidth: 1,
        width: responsiveWidth(27),
        borderColor: "#d5436a"
    },
    headerText: {
        fontSize: responsiveHeight(3),
        color: "#000",
        fontWeight: "bold"
    },
    boxTextStyle: {
        paddingHorizontal: responsiveWidth(0.5),
        paddingVertical: responsiveHeight(1),
        textAlign: 'center',
        fontSize: responsiveHeight(2.3),
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
    },
    sortView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: responsiveHeight(26.5),
    },
    filterView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: responsiveHeight(50),
    }
});