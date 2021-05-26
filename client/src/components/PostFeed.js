import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const PostFeed = props => {
    const [loaded, setLoaded]= useState(false)
    const [posts, setPosts]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/post')
            .then(res=>{
                setPosts(res.data);
                setLoaded(true)
            });
    },[])

	return (
		<div className="feed-container">
        <div className="feed">
            {loaded > 0 && posts.map((post, idx)=>{
            return <div className="post" key={idx}>
                <p>{post.title}</p>
                <p>Category | {post.category}</p>
                <p>{post.content}</p>
                <p>User ID: {post.user_id._id}</p>
                <p>Username: {post.user_id.username}</p>
                <p>{post.url}</p>
                <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate('/post/update/'+post._id)}}>Update</button>
            </div>
            })}
        </div>
		</div>
	)
}

export default PostFeed