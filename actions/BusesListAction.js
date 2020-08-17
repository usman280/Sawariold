import axios from 'axios';
import {
    FETCH_BUSES_REQUEST, SORT_PRICE_HIGH_TO_LOW, SORT_PRICE_LOW_TO_HIGH,
    FETCH_ALL_BUSES, FETCH_AC_BUSES, FETCH_NONAC_BUSES, DISPLAY_AC_BUSES, DISPLAY_NONAC_BUSES, SET_LIST_ASSISTER,
    REFRESH_BUSES_LIST, GET_AC_PREFERENCE, SET_DESTINATION_NAME, SET_SOURCE_NAME, ALTER_PREFERENCE, EMPTY_LISTS, GET_DATE,
    FETCH_BUSES_DONE,
} from '../actions/ActionTypes';
import {URL} from './authActions'



export const fetchBusesRequest = () => {
    return {
        type: FETCH_BUSES_REQUEST
    }
}

export const resetLists = () => {
    return {
        type: EMPTY_LISTS
    }
}

export const pricehightolow = (list) => dispatch => {
    list.sort(function (a, b) {
        return b.price - a.price
    },
        dispatch({
            type: SORT_PRICE_HIGH_TO_LOW,
            payload: list
        })
    );
}

export const pricelowtohigh = (list) => dispatch => {
    list.sort(function (a, b) {
        return a.price - b.price
    },
        dispatch({
            type: SORT_PRICE_LOW_TO_HIGH,
            payload: list
        })
    );
}

export const ratinghightolow = (list) => dispatch => {
    list.sort(function (a, b) {
        return b.rating - a.rating
    },
        dispatch({
            type: SORT_PRICE_HIGH_TO_LOW,
            payload: list
        })
    );
}

export const ratinglowtohigh = (list) => dispatch => {
    list.sort(function (a, b) {
        return a.rating - b.rating
    },
        dispatch({
            type: SORT_PRICE_LOW_TO_HIGH,
            payload: list
        })
    );
}

export const pref = (value, callback) => dispatch => {
    dispatch({
        type: GET_AC_PREFERENCE,
        payload: value,
    });

    callback();
}

export const starter = (source, destination,dates, callback) => dispatch => {
    dispatch(fetchBusesRequest());
    dispatch(setdate(dates));
    const fields = {
        pickuppoint: source.toLowerCase(),
        dropoffpoint: destination.toLowerCase(),
        date:dates
    };

    axios.post(`${URL}/api/bus/fetchbusesaccorfingtodate`, fields).then((res) =>
       { 
           dispatch({
            type: FETCH_ALL_BUSES,
            wholelist: res.data,
        });
        dispatch(AC(res.data));
        dispatch(NONAC(res.data));
    }).catch( err => {
        console.log("Error", err);
    })
    
    callback();
}

export const AC=(list)=>dispatch=>{
    aclist = list.filter(function (a) {
        return a.Bustype == "BUSINESS"||a.Bustype == "AC"
})
dispatch({
    type:FETCH_AC_BUSES,
    acbuses: aclist
})
}


export const NONAC=(list)=>dispatch=>{
    nonaclist = list.filter(function (a) {
        return a.Bustype == "NON-AC"
})
dispatch({
    type:FETCH_NONAC_BUSES,
    nonacbuses: nonaclist
})
}


export const displayACBuses = () => dispatch => {
    dispatch(fetchBusesRequest());
    dispatch({
        type: DISPLAY_AC_BUSES,
    });
}

export const displayNONACBuses = () => dispatch => {
    dispatch(fetchBusesRequest());
    dispatch({
        type: DISPLAY_NONAC_BUSES,
    });
}

export const refreshList = (check) => dispatch => {
    if (check === true) {
        dispatch({
            type: DISPLAY_AC_BUSES,
        })
    }
    else {
        dispatch({

            type: DISPLAY_NONAC_BUSES
        });
    }

    dispatch({
        type: REFRESH_BUSES_LIST,
        //payload: false
    })
}

export const filterData = (args, list) => dispatch => {
    const { twelvetofour, fourtoeight, eighttotwelve, ac, nonac, business, ratingplus2, ratingplus3, ratingplus4 } = args;

    timeExtract = (value) => {
        var date = new Date(value);
        var hours = date.getHours();

        return hours;
    };

    if (twelvetofour === true) {
        list = list.filter(function (a) {
            return (timeExtract(a.busdatetime) <= 4)
        })
    }
    else if (fourtoeight === true) {
        list = list.filter(function (a) {
            return (timeExtract(a.busdatetime) >= 4 && timeExtract(a.busdatetime) <= 8)
        });
    }
    else if (eighttotwelve === true) {
        list = list.filter(function (a) {
            return (timeExtract(a.busdatetime) >= 8 && timeExtract(a.busdatetime) < 12)
        });
    }

    if (business === true) {
        list = list.filter(function (a) {
            return a.Bustype == "BUSINESS";
        });
    }
    else if (ac === true) {
        list = list.filter(function (a) {
            return a.Bustype == "AC";
        });
    }
    else if (nonac === true) {
        list = list.filter(function (a) {
            return a.Bustype == "NON-AC";
        });
    }

    if (ratingplus2 === true) {
        list = list.filter(function (a) {
            return a.rating > 2
        });
    }
    else if (ratingplus3 === true) {
        list = list.filter(function (a) {
            return a.rating > 3
        });
    }
    else if (ratingplus4 === true) {
        list = list.filter(function (a) {
            return a.rating > 4;
        });
    }

    dispatch({
        type: SET_LIST_ASSISTER,
        payload: list,
    },
        console.log(list)
    )
};

export const sourceName = val => dispatch => {
    dispatch({
        type: SET_SOURCE_NAME,
        payload: val,
    })
}

export const destinationeName = val => dispatch => {
    dispatch({
        type: SET_DESTINATION_NAME,
        payload: val,
    })
}

export const alterPreference = () => dispatch => {
    dispatch({
        type: ALTER_PREFERENCE
    })
}

export const setdate = (date) => dispatch => {
    dispatch({
        type: GET_DATE,
        payload: date,
    });
}