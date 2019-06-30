import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseRouter from './router';
import { HashRouter as Router, Redirect } from 'react-router-dom';
import Menu from './layout/Menu';
import { Provider } from 'react-redux';
import store from '../store';
import { transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts  from "./layout/Alerts";
import {loadUser} from "../actions/auth";


// optional cofiguration
const options = {
  position: 'top center',
  timeout: 5000,
  transition: transitions.SCALE
};

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...options}>
					<Menu />
					<Alerts />
					<div className="container">
						<BaseRouter />
					</div>
				</AlertProvider>

				{!store.isAuthenticated &&
					<Redirect to="/login" />
				}
			</Provider>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
