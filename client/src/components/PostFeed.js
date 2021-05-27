import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import DeleteButton from '../components/DeleteButton'

const PostFeed = props => {
    const [loaded, setLoaded]= useState(false)
    const [posts, setPosts]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/post')
            .then(res=>{
                setPosts(res.data);
                //console.log(res.data)
                setLoaded(true)
            });
    },[])
   
	return (
        <div className="feed">
            {loaded && posts.map((post, idx)=>{

            return <div className="post align-middle" key={idx}>
                <div className="postheader"><span className="category-tag">{post.category}</span> <b>{post.title}</b> <Link to={'/users/profile/'+post.user_id._id} className="usernamelink">{post.user_id.username}</Link></div>
                <div className="postbody">
                    <p className="postcontent">{post.content}</p>
                     
                    {post.url && <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate(post.url)}}>Link</button>}
                    
                    {/* should filter only the posts buttons that are by the user */}
                    {props.user !== undefined && props.user._id===post.user_id._id && <>
                        <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate('/post/update/'+post._id)}}>Update</button>
                        <DeleteButton pid={post._id}/>                       
                    </>}
                        
                </div>
            </div>

            })}
        </div>
	)
}

export default PostFeed