import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router'


const ListUsers = props => {

	const [users, setUsers] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	// const [userId, setUserId] = useState("")


	useEffect(()=> {
		axios.get('http://localhost:8000/api/user/list')
		.then(res=>{
			setUsers(res.data);
			console.log("res date",res.data)
		});
	  },[])

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
			{filteredUser.username} <Link to={"/users/profile/"+filteredUser._id}>Profile</Link>
				</p>
				))}
		</div>
	)
}

export default ListUsers