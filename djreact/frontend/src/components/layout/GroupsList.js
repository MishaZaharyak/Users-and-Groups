import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroups, deleteGroup } from '../../actions/group';
import { useAlert } from 'react-alert'


const GroupsList = props => {
	const alert = useAlert();

	useEffect(() => {
		props.getGroups();
	}, []);

	const deleteGroup = id => {
		props.deleteGroup(id);
		alert.show(props.message, {type: props.alert})
	};

	const hasData = props.groups.length > 0;
	const { groups } = props;
	return (
		<Fragment>
			<button type='button' className='btn btn-success mt-3'>
				<Link className='text-white' to='/group-form'>
					ADD GROUP
				</Link>
			</button>
			<div className='table-responsive-lg mt-3'>
				<table className='table table-hover table-striped'>
					<thead>
						<tr>
							<th scope='col'>№</th>
							<th scope='col'>Name</th>
							<th scope='col'>Description</th>
							<th scope='col'>ID</th>
						</tr>
					</thead>
					<tbody>
						{hasData &&
							groups.map(({ id, name, description }, ind) => (
								<tr key={id}>
									<th scope='row'>{ind + 1}</th>
									<td>{name}</td>
									<td>{description}</td>
									<td>{id}</td>
									<td className='d-flex'>
										<button type='button' className='btn btn-info'>
											<Link
												className='text-decoration-none'
												to={`/group-form/${id}`}
											>
												Edit
											</Link>
										</button>
										<button
											onClick={() => deleteGroup(id)}
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
	groups: state.groupsData.groupsData,
	message: state.groupsData.message,
	alert: state.groupsData.alert,
});

export default connect(
	mapStateToProps,
	{ getGroups, deleteGroup }
)(GroupsList);
