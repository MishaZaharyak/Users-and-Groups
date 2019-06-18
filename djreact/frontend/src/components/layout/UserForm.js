import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createUser, updateUserData, deleteUser } from '../../actions/user';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

const UserForm = props => {
	const [groupsList, setGroupsList] = useState([]);
	const [userData, setUserData] = useState({
		username: '',
		group_id: '',
		group: {},
	});

	const handleSubmit = e => {
		e.preventDefault();
		const { username, group_id } = userData;
		props.createUser({ username, group_id: parseInt(group_id) });
		setUserData({
			username: '',
			group_id: '',
		})
	};

	const handleUpdate = e => {
		e.preventDefault();
		const { username, group_id } = userData;
		const { userId } = props.match.params;

		props.updateUserData({ username, group_id: parseInt(group_id), id: parseInt(userId) });
	};

	useEffect(function() {
		(async () => {
			const { userId } = props.match.params;
			setGroupsList(props.groups_list);

			if (userId) {
				try {
					const response = await axios.get(`${BASE_URL}/users/${userId}`);
					const { username, group } = await response.data;

					setUserData({
						username: username,
						group: group,
						group_id: group.id
					});
				} catch (error) {
					console.log(error);
				}
			}
		})();
	}, []);

	const handleChange = e => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	};

	const deleteUser = id => {
		props.deleteUser(id);
		setUserData({
			username: '',
			group_id: '',
			group: {},
		})
	};

	const { userId } = props.match.params;
	const { username, group } = userData;

	return (
		<form action=''>
			<div className='form-group'>
				<label htmlFor='username'>Username: </label>
				<input
					type='text'
					name='username'
					className='form-control'
					onChange={handleChange}
					id='username'
					value={username}
					placeholder='Enter username'
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='group_id'>Group: </label>
				<select
					className='form-control'
					onChange={handleChange}
					name='group_id'
					id='group_id'
					value={group ? group.id : ''}
				>
					<option value='' />
					{groupsList.length &&
						groupsList.map(({ id, name }) => (
							<option key={id} value={id}>
								{name}
							</option>
						))}
				</select>
			</div>
			<button
				type='submit'
				onClick={userId ? handleUpdate : handleSubmit}
				className='btn btn-primary'
			>
				{userId ? 'Update' : 'Submit'}
			</button>
			{
				userId &&
				<button
					type='button'
					onClick={() => deleteUser(userId)}
					className='btn btn-danger ml-4'
				>
					DELETE
				</button>
			}

		</form>
	);
};

const mapStateToProps = state => ({
	groups_list: state.usersData.groups_list
});

export default connect(
	mapStateToProps,
	{ createUser, updateUserData, deleteUser }
)(UserForm);
