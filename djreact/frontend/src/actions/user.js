import axios from 'axios';
import {GET_USERS, CREATE_USER, DELETE_USER, UPDATE_USER} from './types';

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
		.catch(err => console.error(err));
};

// delete user
export const deleteUser = id => dispatch => {
	axios
		.delete(`${BASE_URL}/users/${id}/`)
		.then(res => {
			dispatch({
				type: DELETE_USER,
				payload: id,
				message: 'User was deleted!',
				alert: 'success'
			});
		})
		.catch(err => console.error(err));
};

// create user
export const createUser = data => dispatch => {
	axios
		.post(`${BASE_URL}/users/`, data)
		.then(res => {
			dispatch({
				type: CREATE_USER,
				payload: res.data,
				message: 'User successfully created',
				alert: 'success'
			});
		})
		.catch(err => console.error(err));
};

// update user data
export const updateUserData = data => dispatch => {
	axios
		.put(`${BASE_URL}/users/${data.id}/`, data)
		.then(res => {
			dispatch({
				type: UPDATE_USER,
				message: 'User successfully updated',
				alert: 'success'
			});
		})
		.catch(err => console.error(err));
};
