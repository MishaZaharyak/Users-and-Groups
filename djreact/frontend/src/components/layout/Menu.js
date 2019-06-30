import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from "../../actions/auth";

const Menu = ({auth, logout}) => {

	const authLinks = (
		<ul className='navbar-nav'>
			<li className='nav-item'>
				<Link className='nav-link' to='/users-list'>
					Users List
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link' to='/groups-list'>
					Groups List
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className='navbar-nav ml-auto'>
			<li className='nav-item d-flex align-items-center'>
				{!auth.isAuthenticated ?
					<Link className='nav-link' to='/login'>
						Login
					</Link>

					: <button onClick={logout} className="btn btn-sm btn-info">Logout</button>
				}
			</li>

			{!auth.isAuthenticated &&
				<li className='nav-item d-flex align-items-center'>
					<Link className='nav-link' to='/registration'>
						Registration
					</Link>
				</li>
			}
		</ul>
	);

	return (
		<nav className='navbar navbar-expand-md navbar-light bg-light'>
			<div className='container'>
				{auth.isAuthenticated &&
					<span className="navbar-brand">{auth.user.username}</span>
				}

				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>

					{auth.isAuthenticated && authLinks}

					{guestLinks}
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Menu);
