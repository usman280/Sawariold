import axios from 'axios';
import { BOOK_BUS, GET_MY_TRIPS } from './ActionTypes';
import {URL} from './authActions'




export const bookBus = details => dispatch => {
    axios.post(`${URL}/api/users/bookbus`, details).then((res) => {
            dispatch({
                type: BOOK_BUS,
            });
        
    })
}

export const getTrips = id => dispatch => {
    axios.post(`${URL}/api/users/mytrips/${id}`).then(res => dispatch({
        type: GET_MY_TRIPS,
        payload: res.data,
    }))
}