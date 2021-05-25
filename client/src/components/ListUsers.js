import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

const ListUsers = props => {

	return (
		<div className="user-list">
		<h2>Users</h2>
		<input type="text" placeholder="Search..." onInput={event =>{props.setSearchTerm(event.target.value)}} />
		
		{props.users.filter((val) => {
			if(props.searchTerm === ""){
				return val
			} else if(val.username.toLowerCase().includes(props.searchTerm.toLowerCase())){
				return val
			}
		}).map(filteredUser => (<p key={filteredUser._id} name={filteredUser._id} className="user-badge" onClick={(e) => {props.setUserId(filteredUser._id); navigate('/users/otherusers')}}>
			{filteredUser.username}
				</p>
				))}
		</div>
	)
}

export default ListUsers