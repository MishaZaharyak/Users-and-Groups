import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {login} from "../../actions/auth";


const Login = ({isAuthenticated, login}) => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = e => {
		e.preventDefault();
		const { username, password } = userData;

		login(username, password);
	};

    const handleChange = e => {
		setUserData({
            ...userData,
			[e.target.name]: e.target.value
		});
	};

    return (
        <div className="container">

            {isAuthenticated && <Redirect to='/users-list'/>}

            <h2 className="text-center mt-3">Login</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Name: </label>
                    <input type="text"
                           name="username"
                           className="form-control"
                           id="username"
                           value={userData.username}
                           onChange={handleChange}
                           placeholder="Enter your name here" />

                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           name="password"
                           className="form-control"
                           id="password"
                           value={userData.password}
                           onChange={handleChange}
                           placeholder="Password" />
                </div>


                <button type="submit" className="btn btn-primary">Login</button>

                <p>
                    Don't have an account?
                    <Link to='/registration'> Register</Link>
                </p>
            </form>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);