import { combineReducers } from 'redux';
import usersData from './user';
import groupsData from './group'

export default combineReducers({
	usersData,
	groupsData
});
