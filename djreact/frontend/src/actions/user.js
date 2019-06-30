import axios from 'axios';
import {GET_USERS, CREATE_USER, DELETE_USER, UPDATE_USER} from './types';
import {createMessage, returnErrors} from "./messages";

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
		.catch(err => dispatch(returnErrors(
			err.response.data, err.response.status
		)));
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
		.catch(err => dispatch(returnErrors(
			err.response.data, err.response.status
		)));
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
		.catch(err => dispatch(returnErrors(
			err.response.data, err.response.status
		)));
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
		.catch(err => dispatch(returnErrors(
			err.response.data, err.response.status
		)));
};
