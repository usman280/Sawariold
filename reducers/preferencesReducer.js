import { ADD_PREFERENCES, ADD_PREFERENCES_REQUEST, ADD_PREFERENCES_SUCCESS } from '../actions/ActionTypes';

const initialState = {
    msg: '',
    loading: false,
}

export default function( state = initialState, action){
    switch(action.type){
        case ADD_PREFERENCES: {
            return {
                ...state,
                msg: action.msg,
                loading: action.loading,
            }
        }
        case ADD_PREFERENCES_REQUEST:{
            return {
                ...state,
                loading: action.payload,
            }           
        }
        case ADD_PREFERENCES_SUCCESS : {
            return {
                ...state,
                loading: false,
            }
        }
        default: {
            return state;
        }
    }
}