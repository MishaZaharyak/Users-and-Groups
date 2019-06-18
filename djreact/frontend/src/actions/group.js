import axios from 'axios';
import {GET_GROUPS, CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP} from './types';

const BASE_URL = 'http://127.0.0.1:8000';

// GET groups list
export const getGroups = () => dispatch => {
	axios
		.get(`${BASE_URL}/groups`)
		.then(res => {
			dispatch({
				type: GET_GROUPS,
				payload: res.data
			});
		})
		.catch(err => console.error(err));
};

// delete group
export const deleteGroup = id => dispatch => {
	axios
		.delete(`${BASE_URL}/groups/${id}/`)
		.then(res => {
			const {id, message} = res.data;

			dispatch({
				type: DELETE_GROUP,
				payload: id ? id : '',
				message: message
			});
		})
		.catch(err => console.error(err));
};

// create group
export const createGroup = data => dispatch => {
	axios
		.post(`${BASE_URL}/groups/`, data)
		.then(res => {
			dispatch({
				type: CREATE_GROUP,
				payload: res.data,
				message: 'Group successfully created'
			});
		})
		.catch(err => console.error(err));
};

// update group data
export const updateGroupData = data => dispatch => {
	axios
		.put(`${BASE_URL}/groups/${data.id}/`, data)
		.then(res => {
			dispatch({
				type: UPDATE_GROUP,
				message: 'Group successfully updated'
			});
		})
		.catch(err => console.error(err));
};
