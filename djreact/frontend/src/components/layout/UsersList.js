import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../actions/user';


const UsersList = props => {

	useEffect(() => {
		props.getUsers();
	}, []);

	const deleteUser = id => {
		props.deleteUser(id);
	};

	const hasData = props.users.length > 0;
	const { users } = props;
	return (
		<Fragment>
			<button type='button' className='btn btn-success mt-3'>
				<Link className='text-white' to='/user-form'>
					ADD USER
				</Link>
			</button>
			<div className='table-responsive-lg mt-3'>
				<table className='table table-hover table-striped'>
					<thead>
						<tr>
							<th scope='col'>№</th>
							<th scope='col'>Username</th>
							<th scope='col'>Created</th>
							<th scope='col'>Group</th>
							<th scope='col'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{hasData &&
							users.map(({ id, username, created, group }, ind) => (
								<tr key={id}>
									<th scope='row'>{ind + 1}</th>
									<td>{username}</td>
									<td>{created}</td>
									<td>{group ? group.name : ''}</td>
									<td className='d-flex'>
										<button type='button' className='btn btn-info'>
											<Link
												className='text-decoration-none'
												to={`/user-form/${id}`}
											>
												Edit
											</Link>
										</button>
										<button
											onClick={() => deleteUser(id)}
											type='button'
											className='btn btn-danger'
										>
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	users: state.usersData.usersData,
});

export default connect(
	mapStateToProps,
	{ getUsers, deleteUser }
)(UsersList);
