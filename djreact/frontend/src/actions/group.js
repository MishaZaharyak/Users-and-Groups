import axios from 'axios';
import {GET_GROUPS, CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP, GET_ERRORS} from './types';
import {createMessage} from './messages';

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

// delete group
export const deleteGroup = id => dispatch => {
	axios
		.delete(`${BASE_URL}/groups/${id}/`)
		.then(res => {
			const {id, message} = res.data;

			dispatch(createMessage({
				deleteGroup: 'Group was deleted'
			}));

			dispatch({
				type: DELETE_GROUP,
				payload: id ? id : '',
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

// create group
export const createGroup = data => dispatch => {
	axios
		.post(`${BASE_URL}/groups/`, data)
		.then(res => {
			dispatch(createMessage({
				createGroup: 'Group successfully created'
			}));

			dispatch({
				type: CREATE_GROUP,
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

// update group data
export const updateGroupData = data => dispatch => {
	axios
		.put(`${BASE_URL}/groups/${data.id}/`, data)
		.then(res => {

			dispatch(createMessage({
				updateGroup: 'Group successfully updated'
			}));

			dispatch({
				type: UPDATE_GROUP,
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
