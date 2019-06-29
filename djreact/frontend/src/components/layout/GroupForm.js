import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { createGroup, updateGroupData, deleteGroup } from '../../actions/group';
import axios from 'axios';
import { Redirect } from 'react-router';

const BASE_URL = 'http://127.0.0.1:8000';

const UserForm = props => {
	const [groupData, setGroupData] = useState({
		name: '',
		description: '',
	});

	const { groupId } = props.match.params;

	const [redirect, setRedirect] = useState(false);

	useEffect(function() {
		(async () => {

			if (groupId) {
				try {
					const response = await axios.get(`${BASE_URL}/groups/${groupId}`);
					const { name, description } = await response.data;

					setGroupData({
						name,
						description
					});
				} catch (error) {
					console.error(error);
				}
			}
		})();
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

		const { name, description } = groupData;

		props.createGroup({ name, description});

		setGroupData({
			name: '',
            description: '',
		});
	};

	const handleUpdate = e => {
		e.preventDefault();
		const { name, description } = groupData;

		props.updateGroupData({ name, description, id: parseInt(groupId) });
	};

	const handleChange = e => {
		setGroupData({
			...groupData,
			[e.target.name]: e.target.value
		});
	};

	const deleteGroup = id => {
		props.deleteGroup(id);

		setGroupData({
			name: '',
			description: ''
		});

		setTimeout(() => setRedirect(true), 1000);
	};

	const { name, description } = groupData;

	return (
		<Fragment>
			<form action=''>
				<div className='form-group'>
					<label htmlFor='name'>Name: </label>
					<input
						type='text'
						name='name'
						className='form-control'
						onChange={handleChange}
						id='name'
						value={name}
						placeholder='Enter name'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='description'>Description: </label>
					<textarea
						className='form-control'
						onChange={handleChange}
						name='description'
						id='description'
						value={description}
					>
					</textarea>
				</div>
				<button
					type='submit'
					onClick={groupId ? handleUpdate : handleSubmit}
					className='btn btn-primary'
				>
					{groupId ? 'Update' : 'Submit'}
				</button>
				{
					groupId &&
					<button
						type='button'
						onClick={() => deleteGroup(groupId)}
						className='btn btn-danger ml-4'
					>
						DELETE
					</button>
				}

			</form>

			{redirect && <Redirect to='/groups-list'/>}
		</Fragment>
	);
};

export default connect(
	null,
	{ createGroup, updateGroupData, deleteGroup }
)(UserForm);
