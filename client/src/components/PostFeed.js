import React, {useState, useEffect} from 'react';
import axios from 'axios';

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
		{/* <h2>Posts</h2> */}
        <div className="feed">
            {loaded > 0 && posts.map((post, idx)=>{
            return <div className="post" key={idx}>
                <p>{post.title}</p>
                <p>Category | {post.category}</p>
                <p>{post.content}</p>
                <p>User ID: {post.user_id}</p>
                <p>{post.url}</p>
                <a href={"/post/update/"+post._id}>Update</a>
            </div>
            })}
        </div>
		</div>
	)
}

export default PostFeed