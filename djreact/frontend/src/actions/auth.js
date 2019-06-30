import axios from 'axios';
import {createMessage, returnErrors} from './messages';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";

const BASE_URL = 'http://127.0.0.1:8000';


// Check token & load user
export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({type: USER_LOADING});

    // make request
    axios.get(`${BASE_URL}/api/auth/user`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));

            dispatch({
                type: AUTH_ERROR
            })
        })
};

// Login user
export const login = (username, password) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({username, password});

    // make request
    axios.post(`${BASE_URL}/api/auth/login`, body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            dispatch(createMessage({
				welcome: `Welcome ${res.data.user.username}`
			}));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));

            dispatch({
                type: LOGIN_FAIL
            })
        })
};

// register user
export const register = (userData) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({...userData});

    // make request
    axios.post(`${BASE_URL}/api/auth/register`, body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));

            dispatch({
                type: REGISTER_FAIL
            })
        })
};

// Logout user
export const logout = () => (dispatch, getState) => {

    const {user} = getState().auth;

    // make request
    axios.post(`${BASE_URL}/api/auth/logout`, null, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({
				goodbye: `Goodbye ${user.username}`
			}));

            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const {token} = getState().auth;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // if token add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};