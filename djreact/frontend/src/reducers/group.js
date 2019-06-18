import {GET_GROUPS, CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP} from '../actions/types';

const initialState = {
	groupsData: [],
	pagination: {},
	message: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_GROUPS:
			const {
				count,
				next,
				previous,
				results
			} = action.payload;

			return {
				...state,
				groupsData: results,
				pagination: {
					count,
					next,
					previous
				}
			};

		case CREATE_GROUP:
			return {
				...state,
				message: action.message
			};

		case UPDATE_GROUP:
			return {
				...state,
				message: action.message
			};

		case DELETE_GROUP:
			state.pagination.count > 0 ? state.pagination.count-- : 0;
			return {
				...state,
				groupsData: state.groupsData.length
					? state.groupsData.filter(group => parseInt(group.id) !== parseInt(action.payload))
					: {},
				message: action.message
			};

		default:
			return state;
	}
}
