import React, {useState, useEffect} from 'react';
import axios from "axios";
import { navigate, Link } from '@reach/router';
import DeleteButton from '../components/DeleteButton'
import Moment from 'moment'

const PostPage = (props) => {
    const [post, setPost] = useState([])
    const [loaded, setLoaded] = useState(false)

    //styles
    const JobStyle = { backgroundColor: '#0D6EFD' }
    const CodeStyle = { backgroundColor: '#6da8fd' }
    const shareStyle = { backgroundColor: '#094db1' }

    useEffect(()=>{
        axios.get('http://localhost:8000/api/post/'+props.id)
            .then(res=>{
                setPost(res.data);
                console.log(res.data)
                setLoaded(true)
            });
    },[])

    var style = {}
    if (post.category==="Job Posting"){
        style = JobStyle
    }
    else if (post.category==="Share"){
        style= CodeStyle
    }
    else {
        style = shareStyle
    }
    return(
        <div>
        <div className="headerbody"><p className="welcome"></p></div>
        <div className="post align-middle">
                {loaded && <><div className="postheader"  style={style}>
                    <span className="category-tag">{post.category}</span>&nbsp; | &nbsp; {post.title}
                </div>
                <div className="postsubhead"  style={style}>
                    <Link to={'/users/profile/'+post.user_id._id} className="usernamelink">{post.user_id.username}</Link>{Moment(post.createdAt).format('LLLL')}
                </div>
                <div className="postbody">
                    <p className="postcontent">{post.content}</p>
                    {post.url && <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate(post.url)}}>Link</button>}
                    {props.user !== undefined && props.user._id===post.user_id._id && <div>
                        <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate('/post/update/'+post._id)}}>Update</button>
                        <DeleteButton pid={post._id}/>
                        </div>}
                            {/* {
                            post.comments ? (
                            <>
                                {
                                post.comments.map((comment, index) => {
                                    let user = comment.user_id
                                    console.log(user)
                                    return(                              
                                
                                <div style={{ border: "1px black solid", margin: "15px", padding: "10px" }} key={ "comment_" + index }>
                                    <p className="comment">{ comment.comment }</p>
                                    Date: { Moment(comment.commentDate).format('LLLL') }
                                    {user.username}
                                    </div>
                                )
                                })
                                }
                            </>
                            ) 
                            : null
                        } */}
                </div></>}
        </div>
        </div>

)}

export default PostPage