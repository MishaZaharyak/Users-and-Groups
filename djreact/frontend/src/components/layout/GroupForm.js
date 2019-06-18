import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createGroup, updateGroupData, deleteGroup } from '../../actions/group';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

const UserForm = props => {
	const [groupData, setGroupData] = useState({
		name: '',
		description: '',
	});
	const { groupId } = props.match.params;

	const handleSubmit = e => {
		e.preventDefault();
		const { name, description } = groupData;
		props.createGroup({ name, description});
		setGroupData({
			name: '',
            description: '',
		})
	};

	const handleUpdate = e => {
		e.preventDefault();
		const { name, description } = groupData;

		props.updateGroupData({ name, description, id: parseInt(groupId) });
	};

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
					console.log(error);
				}
			}
		})();
	}, []);

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
		})
	};

	const { name, description } = groupData;

	return (
		<form action=''>
			<div className='form-group'>
				<label htmlFor='name'>Group name: </label>
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
	);
};

export default connect(
	null,
	{ createGroup, updateGroupData, deleteGroup }
)(UserForm);
