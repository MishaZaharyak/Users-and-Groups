import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from '../actions/types';

const initialState = {
	usersData: [],
	pagination: {},
	groups_list: [],
	message: '',
	alert: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			const {
				count,
				next,
				previous,
				results: { users_list, groups_list }
			} = action.payload;

			return {
				...state,
				usersData: users_list,
				groups_list: groups_list,
				pagination: {
					count,
					next,
					previous
				}
			};

		case CREATE_USER:
			return {
				...state,
				message: action.message,
				alert: action.alert
			};

		case UPDATE_USER:
			return {
				...state,
				message: action.message,
				alert: action.alert
			};

		case DELETE_USER:
			state.pagination.count > 0 ? state.pagination.count-- : 0;
			return {
				...state,
				usersData: state.usersData.length
					? state.usersData.filter(user => parseInt(user.id) !== parseInt(action.payload))
					: {},
				message: action.message,
				alert: action.alert
			};

		default:
			return state;
	}
}
