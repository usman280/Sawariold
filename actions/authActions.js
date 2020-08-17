import axios from "axios";
import { SET_USER, GET_ERRORS, LOGOUT_USER, SET_NUMBER, REGISTER_USER, SET_IMAGE, GET_MY_TRIPS,CLEAR_MY_TRIPS ,SET_USER_DATA, USER_LOADING, GET_AC_PREFERENCE } from "../actions/ActionTypes";


export const URL="http://192.168.18.5:5000"

export const loginUser = userdata => dispatch => {
  axios
    .post(`${URL}/api/users/login`, userdata)
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setnumber = num => dispatch => {
  dispatch({
    type: SET_NUMBER,
    payload: num,
  })
}

export const fetchUserData = (userdata, callback ) => dispatch => {
dispatch(UserLoading());
  axios.post(`${URL}/api/users/otplogin`, userdata).then(res => res.data).then((data) => {
    if (data.found == 'found') {
      dispatch({
        type: SET_USER,
        payload: data.user,
        found: data.found,
      })
      dispatch({
        type: SET_IMAGE,
        payload: data.user.imageUrl,
      })
      dispatch({
        type: GET_AC_PREFERENCE,
        payload: data.user.preferences.ac
      })
    }
    callback();
  })
};

export const userImageUri = uri => dispatch => {

  axios.post(`${URL}/api/users/updateimageUrl`, uri).then(res => res.data).then((data) => {
    dispatch({
      type: SET_IMAGE,
      payload: data.imageUrl,
    })
  })
}

export const logout = () => dispatch => {

  console.log("log out executed");
  
  dispatch({
    type: LOGOUT_USER
  });
};

export const registerUser = (userdata, callback) => dispatch => {
  dispatch(UserLoading());
  axios.post(`${URL}/api/users/registermobile`, userdata).then(
    res => {
      dispatch({
        type: REGISTER_USER,
        msg: res.data.msg
      })
  
      callback();
  
    }
    )
    .catch(err => 
      dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

export const clearRideHistory=()=>dispatch=>{
  dispatch({
    type:CLEAR_MY_TRIPS
  })
}
export const setUser=(data)=>dispatch=>{
  dispatch({
    type:SET_USER_DATA,
    payload:data
  })

  dispatch({
    type:SET_IMAGE,
    payload:data.imageUrl
  })

  dispatch({
    type: GET_AC_PREFERENCE,
    payload: data.preferences.ac
  })

}

export const UserLoading=()=>dispatch=>{
  dispatch({
    type:USER_LOADING
  })
}
