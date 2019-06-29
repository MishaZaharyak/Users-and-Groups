import { combineReducers } from 'redux';
import usersData from './user';
import groupsData from './group';
import errorsData from './errors';
import messageData from './messages';

const rootReducer = combineReducers({
	usersData,
	groupsData,
	errorsData,
	messageData
});

export default rootReducer;