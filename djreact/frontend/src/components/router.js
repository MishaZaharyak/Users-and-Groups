import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import UsersList from './layout/UsersList';
import UserForm from './layout/UserForm';
import GroupsList from './layout/GroupsList';
import GroupForm from './layout/GroupForm';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRout from './common/PrivateRout';

const BaseRouter = () => (
	<Fragment>
		<PrivateRout exact path='/users-list' component={UsersList} />
		<PrivateRout exact path='/user-form/:userId?' component={UserForm} />
		<PrivateRout exact path='/groups-list' component={GroupsList} />
		<PrivateRout exact path='/group-form/:groupId?' component={GroupForm} />
		<Route exact path='/login' component={Login} />
		<Route exact path='/registration' component={Register} />
	</Fragment>
);

export default BaseRouter;
