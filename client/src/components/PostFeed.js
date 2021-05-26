import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';

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
                <div className="postheader"><span className="category-tag">{post.category}</span> <b>{post.title}</b> <Link to={'/users/profile/'+post.user_id._id}>{post.user_id.username}</Link></div>
                <p>{post.content}</p>
                <p>{post.url}</p>
                {post.url && <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate(post.url)}}>Link</button>}
                <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate('/post/update/'+post._id)}}>Update</button>
            </div>
            })}
        </div>
		</div>
	)
}

export default PostFeed