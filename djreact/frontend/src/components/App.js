import React from 'react';
import ReactDOM from 'react-dom';
import BaseRouter from './router';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './layout/Menu';
import { Provider } from 'react-redux';
import store from '../store';
import { transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts  from "./layout/Alerts";



// optional cofiguration
const options = {
  position: 'top center',
  timeout: 5000,
  transition: transitions.SCALE
};

const App = () => {
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
			</Provider>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
