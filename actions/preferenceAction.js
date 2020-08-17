import { ADD_PREFERENCES, ADD_PREFERENCES_REQUEST, ADD_PREFERENCES_SUCCESS } from './ActionTypes';
import axios from 'axios';
import {URL} from "./authActions"

export const addPreferences = (details) => dispatch => {
    // dispatch({
    //     type: PREFERENCES_LOADER
    // });

    axios.post(`${URL}/api/users/check`, details).then(res => res.data).then((data) => {
            if (data.msg == "success") {
                dispatch({
                    type: ADD_PREFERENCES,
                    msg: data.msg,
                    loading: false,
                })
            }
        })
}

export const addPreferencesRequest = (progress,callback) => dispatch => {
    dispatch({
        type: ADD_PREFERENCES_REQUEST,
        payload: progress,
    });

    callback();
}

export const addPreferencesSuccess = () => dispatch => {
    dispatch({
        type: ADD_PREFERENCES_SUCCESS
    });
}
