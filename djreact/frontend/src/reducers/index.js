import { combineReducers } from 'redux';
import usersData from './user';
import groupsData from './group';
import errorsData from './errors';
import messageData from './messages';
import auth from './auth';

const rootReducer = combineReducers({
	usersData,
	groupsData,
	errorsData,
	messageData,
	auth,
});

export default rootReducer;