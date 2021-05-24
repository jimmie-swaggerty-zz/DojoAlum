import React, {useState, useEffect} from 'react';
import axios from 'axios';


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
		<input type="text" placeholder="Search..." onInput={event =>{setSearchTerm(event.target.value)}} />
		
		
		{users.filter((val) => {
			if(searchTerm === ""){
				return val
			} else if(val.username.toLowerCase().includes(searchTerm.toLowerCase())){
				return val
			}
		}).map(filteredUser => (<p key={filteredUser._id} name={filteredUser._id} className="user-badge">
			{filteredUser.username}
				</p>
				))}
		</div>
	)
}

export default ListUsers