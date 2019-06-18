import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import BaseRouter from './router';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './layout/Menu';
import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
	render() {
		return (
			<Router>
				<Provider store={store}>
					<Menu />
					<div className="container">
						<BaseRouter />
					</div>
				</Provider>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
