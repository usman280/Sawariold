import {
    FETCH_BUSES_REQUEST, SORT_PRICE_HIGH_TO_LOW,
    SORT_PRICE_LOW_TO_HIGH, SORT_RATING_HIGH_TO_LOW, SORT_RATING_LOW_TO_HIGH, FETCH_AC_BUSES, FETCH_ALL_BUSES, FETCH_NONAC_BUSES,
    DISPLAY_AC_BUSES, DISPLAY_NONAC_BUSES, INVERT_CHECKED, SET_LIST_ASSISTER, REFRESH_BUSES_LIST, GET_AC_PREFERENCE,
    SET_SOURCE_NAME, SET_DESTINATION_NAME, ALTER_PREFERENCE, EMPTY_LISTS, GET_DATE, FETCH_BUSES_DONE
} from '../actions/ActionTypes';

const initialState = {
    loading: false,
    refreshing: false,
    wholelist: [],
    aclist: [],
    nonaclist: [],
    checked: false,
    busbookingid: null,
    buseslist: [],
    source: null,
    destination: null,
    error: '',
    date:null,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_BUSES_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_BUSES_DONE: {
            return {
                ...state,
                loading: false
            }
        }
        case GET_AC_PREFERENCE : {
            return {
                    ...state,
                    checked: action.payload,
            }
        }
        case DISPLAY_AC_BUSES: {
            return {
                ...state,
                buseslist: state.aclist,
                loading: false,
            }
        }
        case DISPLAY_NONAC_BUSES: {
            return {
                ...state,
                buseslist: state.nonaclist,
                loading: false,
            }
        }
        case INVERT_CHECKED: {
            return {
                ...state,
                checked: !state.checked
            }
        }
        case SORT_PRICE_HIGH_TO_LOW: {
            return {
                ...state,
                loading: false,
                buseslist: action.payload
            }
        }
        case SORT_PRICE_LOW_TO_HIGH: {
            return {
                ...state,
                loading: false,
                buseslist: action.payload
            }
        }
        case SORT_RATING_HIGH_TO_LOW: {
            return {
                ...state,
                loading: false,
                buseslist: action.payload
            }
        }
        case SORT_RATING_LOW_TO_HIGH: {
            return {
                ...state,
                loading: false,
                buseslist: action.payload
            }
        }
        case FETCH_ALL_BUSES: {
            return {
                ...state,
                wholelist: action.wholelist
            }
        }
        case FETCH_AC_BUSES: {
            return {
                ...state,
                aclist: action.acbuses,
            }
        }
        case FETCH_NONAC_BUSES: {
            return {
                ...state,
                nonaclist: action.nonacbuses,
            }
        }
        case SET_LIST_ASSISTER: {
            return {
                ...state,
                buseslist: action.payload,
            }
        }
        case REFRESH_BUSES_LIST : {
            return {
                ...state,
                refreshing: false
            }
        }
        case SET_SOURCE_NAME : {
            return {
                ...state,
                source: action.payload,
            }
        }
        case SET_DESTINATION_NAME : {
            return {
                ...state,
                destination: action.payload,
            }
        }
        case ALTER_PREFERENCE : {
            return {
                ...state,
                checked: !state.checked
            }
        }

        case GET_DATE:{
            return{
                ...state,
                date:action.payload
            }
        }
        case EMPTY_LISTS: {
            return {
                ...state,
                buseslist: [],
                aclist: [],
                nonaclist: [],
                wholelist: [],
                refreshing:false
            }
        }
        default: return state;
    }

}