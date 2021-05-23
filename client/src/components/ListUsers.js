import React, {useState} from 'react';
import {navigate} from '@reach/router';

const ListUsers = props => {
	const {userId, setUserId} = props;
	const [searchTerm, setSearchTerm] = useState("")
	const userlistItem ={
		border: '1px solid black',
		width: '100px'
			}

	return (
		<>
		<h2>List all users</h2>
		<input type="text" onChange={event =>{setSearchTerm(event.target.value)}} />
		
		
		{props.users.filter((val) => {
			if(searchTerm == ""){
				return val
			} else if(val.username.toLowerCase().includes(searchTerm.toLowerCase())){
				return val
			}
		}).map(filteredUser => (<p style={userlistItem} key={filteredUser._id} name={filteredUser._id} onClick={(e) => {setUserId(filteredUser._id); navigate('/users/profile')}}>
			{filteredUser.username}
				</p>
				))}
		</>
	)
}

export default ListUsers