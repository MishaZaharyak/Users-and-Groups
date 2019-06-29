import axios from 'axios';
import {GET_USERS, CREATE_USER, DELETE_USER, UPDATE_USER, GET_ERRORS} from './types';
import {createMessage} from "./messages";

const BASE_URL = 'http://127.0.0.1:8000';

// GET users list
export const getUsers = () => dispatch => {
	axios
		.get(`${BASE_URL}/users`)
		.then(res => {
			dispatch({
				type: GET_USERS,
				payload: res.data
			});
		})
		.catch(err => {
			const errors = {
				msg: err.response.data,
				status: err.response.status
			};

			dispatch({
				type: GET_ERRORS,
				payload: errors
			});
		});
};

// delete user
export const deleteUser = id => dispatch => {
	axios
		.delete(`${BASE_URL}/users/${id}/`)
		.then(res => {
			dispatch(createMessage({
				deleteUser: 'User was deleted'
			}));

			dispatch({
				type: DELETE_USER,
				payload: id,
			});
		})
		.catch(err => {
			const errors = {
				msg: err.response.data,
				status: err.response.status
			};

			dispatch({
				type: GET_ERRORS,
				payload: errors
			});
		});
};

// create user
export const createUser = data => dispatch => {
	axios
		.post(`${BASE_URL}/users/`, data)
		.then(res => {
			dispatch(createMessage({
				createUser: 'User successfully created'
			}));

			dispatch({
				type: CREATE_USER,
				payload: res.data,
			});
		})
		.catch(err => {
			const errors = {
				msg: err.response.data,
				status: err.response.status
			};

			dispatch({
				type: GET_ERRORS,
				payload: errors
			});
		});
};

// update user data
export const updateUserData = data => dispatch => {
	axios
		.put(`${BASE_URL}/users/${data.id}/`, data)
		.then(res => {
			dispatch(createMessage({
				updateUser: 'User successfully updated'
			}));

			dispatch({
				type: UPDATE_USER,
			});
		})
		.catch(err => {
			const errors = {
				msg: err.response.data,
				status: err.response.status
			};

			dispatch({
				type: GET_ERRORS,
				payload: errors
			});
		});
};
