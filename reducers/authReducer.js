import { USER_LOADING, SET_USER, LOGOUT_USER, SET_NUMBER, REGISTER_USER, SET_IMAGE, BOOK_BUS, GET_MY_TRIPS, CLEAR_MY_TRIPS, SET_USER_DATA } from "../actions/ActionTypes";

const initialState = {
  isAuthenticated: 'not found',
  user: {},
  number: null,
  msg: null,
  image: null,
  ridehistory: {},
  ridesLoading: true,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case SET_USER: {
      return {
        ...state,
        isAuthenticated: action.found,
        user: action.payload,
        image: action.url,
        loading: false
      };
    }
    case SET_NUMBER: {
      return {
        ...state,
        number: action.payload
      }
    }
    case SET_IMAGE: {
      return {
        ...state,
        image: action.payload
      }
    }
    case REGISTER_USER: {
      return {
        ...state,
        msg: action.msg,
        loading: false
      }
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
        msg: null,
        number: null,
      };
    }
    case BOOK_BUS: {
      return {
        ...state,
      }
    }
    case GET_MY_TRIPS: {
      return {
        ...state,
        ridehistory: action.payload,
        ridesLoading: false,
      }
    }
    case CLEAR_MY_TRIPS: {
      return {
        ...state,
        ridehistory: {},
        ridesLoading: false
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        user: action.payload
      }
    }
    default:
      return state;
  }
}
