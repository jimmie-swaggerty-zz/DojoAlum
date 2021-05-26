import React, {useEffect, useState} from 'react';
import axios from 'axios';

const UserProfilePublic = props => {
	const [user, setUser] = useState()
	const [loaded, setLoaded] = useState(false)
	useEffect(()=> {
		axios.get('http://localhost:8000/api/user/'+props.id)
		.then(res=>{
		  setUser(res.data);
		setLoaded(true)
		});
		},[])
	return(
		<div>
			{loaded && <div>
				<p key={user._id} name={user._id}>
					{user.username}
					</p>
					<p>{user.email}</p>
				</div>}
		</div>
	)
}

export default UserProfilePublic; 