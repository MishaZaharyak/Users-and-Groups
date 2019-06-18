import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import UsersList from './layout/UsersList';
import UserForm from './layout/UserForm';
import GroupsList from './layout/GroupsList';
import GroupForm from './layout/GroupForm';

const BaseRouter = () => (
	<Fragment>
		<Route exact path='/users-list' component={UsersList} />
		<Route exact path='/user-form/:userId?' component={UserForm} />
		<Route exact path='/groups-list' component={GroupsList} />
		<Route exact path='/group-form/:groupId?' component={GroupForm} />
	</Fragment>
);

export default BaseRouter;
