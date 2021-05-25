import React from 'react';

const OtherUserProfile = props => {

	return(
		<div>{props.users.filter(usr => usr._id === props.userId).map(
			filteredUser => (
				<>
					<p key={filteredUser._id} name={filteredUser._id}>
					{filteredUser.username}
					</p>
					<p>{filteredUser.email}</p>
					</>
				))}
		</div>
	)
}

export default OtherUserProfile; 