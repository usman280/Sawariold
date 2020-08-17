import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NavigationEvents } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";

import { connect } from 'react-redux';
import {
    displayACBuses, displayNONACBuses, filterData, pricehightolow, pricelowtohigh, refreshList,
    pref, ratinghightolow, ratinglowtohigh, starter, alterPreference, resetLists} from '../actions/BusesListAction';


var isHiddenFilter = true;
var isHiddenSort = true;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class BusesList extends React.PureComponent {


    singleBus = ({ item }) => {
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
            first: null,
            second: null,
            found: true,
            sortbounceValue: new Animated.Value((HEIGHT * 50) / 100),
            filterbounceValue: new Animated.Value((HEIGHT * 50) / 100),
            selectedBox: {
                backgroundColor: "#000",
                borderRadius: 7,
                borderWidth: 1,
                width: (WIDTH * 27) / 100,
                borderColor: "#000"
            },
            isDatePickerVisible: false,
            date: null,
            loading:false,
        };
    }

    sortPriceHighToLow = () => {
        this.props.pricehightolow(this.props.buseslist.buseslist)
        this._toggleSortview();
    }

    sortPriceLowToHigh = () => {
        this.props.pricelowtohigh(this.props.buseslist.buseslist);
        this._toggleSortview();
    }

    sortRatingHighToLow = () => {
        this.props.ratinghightolow(this.props.buseslist.buseslist);
        this._toggleSortview();
    }

    sortRatingLowToHigh = () => {
        this.props.ratinglowtohigh(this.props.buseslist.buseslist);
        this._toggleSortview();
    }


    filterData = () => {

        const args = {
            twelvetofour: this.state.twelvetofour,
            fourtoeight: this.state.fourtoeight,
            eighttotwelve: this.state.eighttotwelve,
            ac: this.state.ac,
            nonac: this.state.nonac,
            business: this.state.business,
            ratingplus2: this.state.ratingplus2,
            ratingplus3: this.state.ratingplus3,
            ratingplus4: this.state.ratingplus4,
        }

        this.props.filterData(args, this.props.buseslist.wholelist);
        this._toggleFilterview();
    };

    _toggleSortview() {
        var toValue = 300;

        if (isHiddenSort) {
            toValue = 0;

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

        isHiddenFilter = !isHiddenFilter;
    }

    handleRefresh = () => {
        this.props.refreshList(this.props.buseslist.checked);
    }

    showBuses = () => {
        this.props.alterPreference();
        if (this.props.buseslist.checked) {
            this.props.displayNONACBuses();
        }
        else {
            this.props.displayACBuses();
        }
    }

    timeExtract = (value) => {
        var date = new Date(value);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    };

    dateExtract = (value) => {
        var date = new Date(value);
        var Year = date.getFullYear();
        var Month = date.getMonth();
        var Day = date.getDate();

        var strdate = Day + "-" + Month + "-" + Year;
        return strdate;
    }

    tripTime = (departure, arrival) => {
        var qwe = new Date(departure);
        var asd = new Date(arrival);

        var hours = Math.floor(asd - qwe) / 36e5;
        var diffMins = Math.round((((asd - qwe) % 86400000) % 3600000) / 60000);
        if (diffMins === 0) {
            diffMins = "00";
        }

        var timeoftrip = Math.floor(hours) + ":" + diffMins;

        return timeoftrip;
    }

    showIcon(val) {
        if (val) {
            return (
                <Feather name='check' color='#824bdd' size={(HEIGHT * 2.8) / 100} />
            )
        }
    }


    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true })
    };

    hideDatePicker = () => {
        console.log("hide calendar");
        this.setState({ isDatePickerVisible: false })
    }
    handleDatePicker = date => {
        this.hideDatePicker();
        //this.setState({loading:true})
        //this.props.resetLists();
        this.updateBuses(date);
    }

    updateBuses(date) {
        this.props.starter(this.props.buseslist.source,this.props.buseslist.destination,date,()=>{

            console.log(this.props.buseslist.checked);

            setTimeout( () => {
                if (this.props.buseslist.checked) {
                    
                    this.props.displayACBuses();
                }
                else {
                    this.props.displayNONACBuses();
                }
            }, 3000);


            console.log("return from starter function", this.props.buseslist.wholelist);
            console.log("ackilist", this.props.buseslist.aclist);
            console.log("nonackilist", this.props.buseslist.nonaclist);
            console.log("DARATE", this.state.date);
        });
    }

    render() {
        if (this.props.buseslist.loading || this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#000' />
                </View>
            )
        }
        else {
            if (this.props.buseslist.buseslist.length > 0 && !this.props.buseslist.loading ) {
                return (
                    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
                        <View style={{ flexDirection: "row", height: (HEIGHT * 8) / 100, backgroundColor: '#341f97', alignItems: 'center', top: 0, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Search');
                                this.props.resetLists();
                            }}>
                                <Text style={{ color: '#fff', fontSize: (HEIGHT * 3) / 100, paddingRight: (WIDTH * 3) / 100 }}>
                                    {this.props.buseslist.source} -- {this.props.buseslist.destination}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.showDatePicker}>
                                <DateTimePicker
                                    isVisible={this.state.isDatePickerVisible}
                                    onConfirm={this.handleDatePicker}
                                    onCancel={this.hideDatePicker}
                                    mode="date"
                                    timePickerModeAndroid="spinner"
                                />
                                <AntDesign name="calendar" size={(HEIGHT * 3.5) / 100} color='#fff' style={{ paddingHorizontal: 40 }} />
                                <Text style={{ color: "#fff", paddingHorizontal: 40 }}>{this.dateExtract(this.props.buseslist.date)}</Text>
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
                                    data={this.props.buseslist.buseslist}
                                    extraData={this.props}
                                    refreshing={this.props.buseslist.refreshing}
                                    onRefresh={this.handleRefresh}
                                    keyExtractor={(item, index) => {
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
                                                else {
                                                    this.props.navigation.navigate('SelectedBus',
                                                        {
                                                            Bus_Number: item.Busnumber,
                                                            Departure_Time: this.timeExtract(item.busdatetime),
                                                            Arrival_Time: this.timeExtract(item.busdatetimeoff),
                                                            Trip_Time: this.tripTime(item.busdatetime, item.busdatetimeoff),
                                                            Total_Amount: item.price,
                                                            Rating: item.rating,
                                                            Company_Name: item.Bustraveller,
                                                            Bus_Id: item._id,
                                                            BusSeatsRemaining: item.totalnumberofseatsremaining,
                                                            Points: item.points,

                                                        }
                                                    )
                                                }
                                            }}
                                            key={item.Busnumber} style={{ flex: 1, margin: (HEIGHT * 2 / 100) }}>
                                            <View style={styles.Card}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (HEIGHT * 2) / 100, marginHorizontal: (HEIGHT * 1.5) / 100, marginVertical: (HEIGHT * 1) / 100, alignItems: 'center' }}>
                                                    <Text style={{ fontSize: (HEIGHT * 2.2) / 100, color: '#000' }}>{item.Bustraveller}</Text>

                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: (HEIGHT * 2.2) / 100, color: '#000' }}>Rating: {item.rating}</Text>
                                                        <Entypo name='star' color='#842bdd' size={(HEIGHT * 2.8) / 100} />
                                                    </View>

                                                    <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#842bdd', paddingVertical: (HEIGHT * 0.5) / 100, paddingHorizontal: (WIDTH * 1) / 100, marginTop: (HEIGHT * 1) / 100, marginRight: (WIDTH * 1) / 100 }}>
                                                        <Text style={{ fontSize: (HEIGHT * 2.2) / 100, color: '#000' }}>
                                                            Rs {item.price}
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={{ marginLeft: (HEIGHT * 7) / 100, justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: (HEIGHT * 2.2) / 100, color: '#000' }}>{item.Bustype}</Text>
                                                </View>



                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingLeft: (HEIGHT * 2) / 100, marginHorizontal: (HEIGHT * 1.5) / 100, marginVertical: (HEIGHT * 1) / 100 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {item.firstaid ? (<FontAwesome5 name='first-aid' size={(HEIGHT * 3) / 100} color='#842bdd' style={{ marginRight: (HEIGHT * 1) / 100 }} />) : null}
                                                        {item.tv ? (<Entypo name='tv' size={(HEIGHT * 3) / 100} color='#842bdd' style={{ marginRight: (HEIGHT * 1) / 100 }} />) : null}
                                                        {item.wifi ? (<Icon name='wifi' size={(HEIGHT * 3) / 100} color='#842bdd' />) : null}
                                                    </View>

                                                    <View>
                                                        <Text style={{ fontSize: (HEIGHT * 2.2) / 100, color: '#000' }}>Trip time: {this.tripTime(item.busdatetime, item.busdatetimeoff)} </Text>
                                                    </View>

                                                    <View style={{ borderColor: '#000', borderWidth: 1, borderRadius: 5, paddingVertical: (HEIGHT * 0.5) / 100, paddingHorizontal: (WIDTH * 1) / 100, marginRight: (WIDTH * 1) / 100, marginBottom: (HEIGHT * 1) / 100 }}>
                                                        <Text style={{ fontSize: (HEIGHT * 2.2) / 100, color: '#000' }}>{this.timeExtract(item.busdatetime)}</Text>
                                                        <Icon />
                                                        <Text style={{ fontSize: (HEIGHT * 2.2) / 100, color: '#000' }}>{this.timeExtract(item.busdatetimeoff)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={styles.filtersContainer}>
                            <TouchableOpacity style={styles.singleTab} onPress={() => { this._toggleFilterview() }}>
                                <Text style={styles.filterText}>Filter</Text>
                                <Text style={styles.filterText}>{this.props.buseslist.buseslist.length} buses</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.singleTab} onPress={() => { this._toggleSortview(); }}>
                                <Text style={styles.filterText}>Sort</Text>
                            </TouchableOpacity>

                            <View style={styles.acbuses} >
                                <TouchableOpacity style={styles.iconBoxStyle} onPress={this.showBuses}>
                                    {this.showIcon(this.props.buseslist.checked)}
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.filterText}>Show AC</Text>
                                    <Text style={styles.filterText}>Buses</Text>
                                </View>
                            </View>
                        </View>

                        <Animated.View
                            style={[styles.filterView,
                            { transform: [{ translateY: this.state.filterbounceValue }] }]}
                        >
                            <View style={{ height: (HEIGHT * 50 / 100) }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        height: (HEIGHT * 5) / 100,
                                        alignItems: "center",
                                        marginHorizontal: (HEIGHT * 2) / 100
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this._toggleFilterview()}
                                    >
                                        <Entypo
                                            name="circle-with-cross"
                                            size={(HEIGHT * 4) / 100}
                                            color="#000"
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.headerText}>Filter by</Text>
                                    <TouchableOpacity onPress={() => this.filterData()}>
                                        <Text style={styles.headerText}>Apply</Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{ height: (HEIGHT * 0.7) / 100, backgroundColor: "#000" }}
                                />

                                <View
                                    style={{
                                        height: (HEIGHT * 13) / 100,
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
                                    style={{ height: (HEIGHT * 0.7) / 100, backgroundColor: "#000" }}
                                />

                                <View
                                    style={{
                                        height: (HEIGHT * 13) / 100,
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
                                    style={{ height: (HEIGHT * 0.7) / 100, backgroundColor: "#000" }}
                                />

                                <View
                                    style={{
                                        height: (HEIGHT * 13) / 100,
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
                            <View style={{ height: (HEIGHT * 30) / 100, width: WIDTH }}>
                                <View style={{ height: (HEIGHT * 5) / 100, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View />
                                        <Text style={{ fontWeight: 'bold', fontSize: (HEIGHT * 3) / 100, color: '#000' }}>Sort by</Text>
                                        <TouchableOpacity onPress={() => this._toggleSortview()}>
                                            <Entypo name='circle-with-cross' size={(HEIGHT * 3) / 100} color="#000" />
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
            else {
                return (
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <View style={{ flexDirection: "row", height: (HEIGHT * 8) / 100, backgroundColor: '#341f97', alignItems: 'center', top: 0, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                                <Text style={{ color: '#fff', fontSize: (HEIGHT * 3) / 100, paddingRight: (WIDTH * 3) / 100 }}>
                                    {this.props.buseslist.source} -- {this.props.buseslist.destination}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.showDatePicker}>
                                <DateTimePicker
                                    isVisible={this.state.isDatePickerVisible}
                                    onConfirm={this.handleDatePicker}
                                    onCancel={this.hideDatePicker}
                                    mode="date"
                                    timePickerModeAndroid="spinner"
                                />
                                <AntDesign name="calendar" size={(HEIGHT * 3.5) / 100} color='#fff' style={{ paddingHorizontal: 40 }} />
                                <Text style={{ color: "#fff", paddingHorizontal: 40 }}>{this.dateExtract(this.props.buseslist.date)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: HEIGHT * 40 / 100, height: (HEIGHT * 10) / 100, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ textAlign: 'center', fontSize: (HEIGHT * 3) / 100, color: '#000' }}>Oops , Sorry </Text>
                            <Text style={{ textAlign: 'center', fontSize: (HEIGHT * 3) / 100, color: '#000' }}>No Buses Available</Text>
                        </View>

                        <View style={styles.filtersContainer}>
                            <TouchableOpacity style={styles.singleTab} onPress={() => { this._toggleFilterview() }}>
                                <Text style={styles.filterText}>Filter</Text>
                                <Text style={styles.filterText}>No buses</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.singleTab} onPress={() => { this._toggleSortview(); }}>
                                <Text style={styles.filterText}>Sort</Text>
                            </TouchableOpacity>

                            <View style={styles.acbuses} >
                                <TouchableOpacity style={styles.iconBoxStyle} onPress={this.showBuses}>
                                    {this.showIcon(this.props.buseslist.checked)}
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.filterText}>Show AC</Text>
                                    <Text style={styles.filterText}>Buses</Text>
                                </View>
                            </View>
                        </View>

                        <Animated.View
                            style={[styles.filterView,
                            { transform: [{ translateY: this.state.filterbounceValue }] }]}
                        >
                            <View style={{ height: (HEIGHT * 50 / 100) }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        height: (HEIGHT * 5) / 100,
                                        alignItems: "center",
                                        marginHorizontal: (HEIGHT * 2) / 100
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this._toggleFilterview()}
                                    >
                                        <Entypo
                                            name="circle-with-cross"
                                            size={(HEIGHT * 4) / 100}
                                            color="#000"
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.headerText}>Filter by</Text>
                                    <TouchableOpacity onPress={() => this.filterData()}>
                                        <Text style={styles.headerText}>Apply</Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{ height: (HEIGHT * 0.7) / 100, backgroundColor: "#000" }}
                                />

                                <View
                                    style={{
                                        height: (HEIGHT * 13) / 100,
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
                                    style={{ height: (HEIGHT * 0.7) / 100, backgroundColor: "#000" }}
                                />

                                <View
                                    style={{
                                        height: (HEIGHT * 13) / 100,
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
                                    style={{ height: (HEIGHT * 0.7) / 100, backgroundColor: "#000" }}
                                />

                                <View
                                    style={{
                                        height: (HEIGHT * 13) / 100,
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
                            <View style={{ height: (HEIGHT * 30) / 100, width: WIDTH }}>
                                <View style={{ height: (HEIGHT * 5) / 100, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View />
                                        <Text style={{ fontWeight: 'bold', fontSize: (HEIGHT * 3) / 100, color: '#000' }}>Sort by</Text>
                                        <TouchableOpacity onPress={() => this._toggleSortview()}>
                                            <Entypo name='circle-with-cross' size={(HEIGHT * 3) / 100} color="#000" />
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
                )
            }
        }
    }
};


const styles = StyleSheet.create({
    container: {
        top: 0,
        height: (HEIGHT * 82) / 100,
        width: WIDTH,
    },
    Card: {
        borderRadius: 10,
        elevation: 2,
        shadowOpacity: 0.1,
    },
    iconBoxStyle: {
        width: (WIDTH * 7) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: (HEIGHT * 4) / 100,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: (HEIGHT * 0.5) / 100,
    },
    filtersContainer: {
        flexDirection: 'row',
        bottom: 0,
        position: 'absolute'
    },
    singleTab: {
        alignItems: 'center',
        width: (WIDTH * 33.33) / 100,
        height: (HEIGHT * 7) / 100,
        justifyContent: 'center',
        backgroundColor: '#842bdd',
        borderWidth: (HEIGHT * 0.1) / 100,
    },
    acbuses: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: (WIDTH * 33.33) / 100,
        height: (HEIGHT * 7) / 100,
        backgroundColor: '#842bdd',
        borderWidth: (HEIGHT * 0.1) / 100,
    },
    filterText: {
        fontSize: (HEIGHT * 2.2) / 100,
        textAlign: 'center',
        fontWeight: 'normal',
        letterSpacing: (WIDTH * 0.15) / 100,
        color: '#fff'
    },
    titleStyle: {
        fontSize: (HEIGHT * 3) / 100,
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center"
    },
    boxStyle: {
        backgroundColor: "#842bdd",
        borderRadius: 7,
        borderWidth: 1,
        width: (WIDTH * 27) / 100,
        borderColor: "#842bdd"
    },
    headerText: {
        fontSize: (HEIGHT * 3) / 100,
        color: "#000",
        fontWeight: "bold"
    },
    boxTextStyle: {
        paddingHorizontal: (WIDTH * 0.5) / 100,
        paddingVertical: (HEIGHT * 1) / 100,
        textAlign: 'center',
        fontSize: (HEIGHT * 2.3) / 100,
        fontWeight: "bold",
        color: "#fff"
    },
    separator: {
        height: '1%',
        backgroundColor: '#000',
        width: WIDTH
    },
    sortText: {
        fontSize: (HEIGHT * 3) / 100,
        color: '#000',
        marginLeft: (WIDTH * 2) / 100,
        fontWeight: 'bold',
    },
    singleRowStyle: {
        height: (HEIGHT * 5) / 100,
        justifyContent: 'center',
    },
    sortView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: (HEIGHT * 26.5) / 100,
    },
    filterView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: (HEIGHT * 50) / 100,
    }
});


const mapStateToProps = state => ({
    buseslist: state.buseslist,
    auth: state.auth,
});

const mapDispatchToProps = {
    displayACBuses,
    displayNONACBuses,
    pricehightolow,
    alterPreference,
    pricelowtohigh,
    ratinghightolow,
    ratinglowtohigh,
    starter,
    filterData,
    refreshList,
    pref,
    resetLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusesList);
