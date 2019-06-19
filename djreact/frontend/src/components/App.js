import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseRouter from './router';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './layout/Menu';
import { Provider } from 'react-redux';
import store from '../store';
import { transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: 'top center',
  timeout: 2000,
  // you can also just use 'scale'
  transition: transitions.SCALE
};

class App extends Component {
	render() {
		return (
			<Router>
				<Provider store={store}>
					<AlertProvider template={AlertTemplate} {...options}>
						<Menu />
						<div className="container">
							<BaseRouter />
						</div>
					</AlertProvider>
				</Provider>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
