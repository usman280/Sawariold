import { combineReducers } from 'redux';
import BusesListReducer from './BusesListReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import preferencesReducer from './preferencesReducer';

export default combineReducers({
    buseslist: BusesListReducer,
    auth: authReducer,
    error: errorReducer,
    pref: preferencesReducer,
});