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
			<div className="formheader">Users</div>
			<div className="formbody">
				<input type="text" placeholder="Search..." onInput={event =>{setSearchTerm(event.target.value)}} />
					{users.filter((val) => {
						if(props.searchTerm === ""){
							return val
						} else if(val.username.toLowerCase().includes(searchTerm.toLowerCase())){
							return val
						}
					}).map(filteredUser => (<p key={filteredUser._id} name={filteredUser._id} className="user-badge" onClick={(e) => navigate("/users/profile/"+filteredUser._id)}>
						{filteredUser.username}
							</p>
							))}
			</div>
		</div>
	)
}

export default ListUsers