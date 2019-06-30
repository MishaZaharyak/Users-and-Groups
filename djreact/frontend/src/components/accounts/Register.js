import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {register} from "../../actions/auth";
import {createMessage} from '../../actions/messages';



const Register = ({isAuthenticated, createMessage, register}) => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        password_2: '',
    });

    const [match, setMatch] = useState(null);

    const handleSubmit = e => {
		e.preventDefault();
		const { password, password_2, username, email } = userData;

		setMatch(password === password_2);

		if (password !== password_2) {
		    createMessage({passwordNotMatch: 'Passwords do not match'});

        } else {
		    register({username, email, password});
        }
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

            <h2 className="text-center mt-3">Registration</h2>

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
                    <label htmlFor="email">Email address: </label>
                    <input type="email"
                           name="email"
                           className="form-control"
                           id="email"
                           value={userData.email}
                           aria-describedby="emailHelp"
                           onChange={handleChange}
                           placeholder="Enter email" />

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

                <div className="form-group">
                    <label htmlFor="password_2">Confirm password: </label>
                    <input type="password"
                           name="password_2"
                           className={"form-control" + (match === false ? ' border-danger' : ' border-success')}
                           id="password_2"
                           value={userData.password_2}
                           onChange={handleChange}
                           placeholder="Confirm password" />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>

                <p>
                    Already have an account?
                    <Link to='/login'> Login</Link>
                </p>
            </form>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, createMessage})(Register);