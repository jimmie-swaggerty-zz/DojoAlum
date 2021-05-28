import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import DeleteButton from '../components/DeleteButton'
import Moment from 'moment'

const PostFeed = props => {
    const [loaded, setLoaded]= useState(false)
    const [posts, setPosts]=useState([])
    const [filter, setFilter] = useState("")


    useEffect(()=>{
        axios.get('http://localhost:8000/api/post')
            .then(res=>{
                setPosts(res.data);
                //console.log(res.data)
                setLoaded(true)
            });
    },[posts])

    //header styles
    const JobStyle = { backgroundColor: '#0D6EFD' }
    const CodeStyle = { backgroundColor: '#6da8fd' }
    const shareStyle = { backgroundColor: '#094db1' }

        //establish dropdown categories
        const categories = [
            {'name':'Job Posting', 'style': JobStyle},
            {'name':'Share', 'style': shareStyle},
            {'name':'Code Help', 'style':CodeStyle}
        ]
        //establish dropdown placeholder
        const filterPlaceholder = "Filter Posts"

	return (
    <div>
        <div className="welcome"></div>
        <div className="feed">
            <div className="col">
                <select
                  name="category"
                  onChange={event =>{
                      if (event.target.value!==filterPlaceholder) {
                          setFilter(event.target.value)
                        }
                        else {
                            setFilter("")
                        }
                    }}
                  className="form-control post"
                  >
                  <option select>{filterPlaceholder}</option>
                  {
                    categories.map((category, index) => (
                      <option value={ category.name } key={ 'category-' + index } style = {category.style}>{ category.name }</option>
                    ))
                  }
                </select>
                </div>
            {loaded && posts.filter((val) => {
						if(filter === ""){
							return val
						} else if(val.category.toLowerCase().includes(filter.toLowerCase())){
							return val
						}
					}).map((post, idx)=>{
            var style={}
            if (post.category==="Job Posting"){
                style = JobStyle
            }
            else if (post.category==="Share"){
                style= CodeStyle
            }
            else {
                style = shareStyle
            }
            return (<div className="post align-middle" key={idx}>
                <div className="postheader"  style={style}>
                    <span className="category-tag"><b>{post.category}</b></span>&nbsp; | &nbsp; {post.title}
                </div>
                <div className="postsubhead"  style={style}>
                    <Link to={'/users/profile/'+post.user_id._id} className="usernamelink">{post.user_id.username}</Link>{Moment(post.createdAt).format('LLLL')}
                </div>
                <div className="postbody">
                    <p className="postcontent">{post.content}</p>

                    <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate('/post/'+post._id)}}>View</button>
                    {post.url && <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); window.open(post.url,"_blank")}}>Link</button>}
                    
                    {/* should filter only the posts buttons that are by the user */}
                    {props.user !== undefined && props.user._id===post.user_id._id && <>
                        <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate('/post/update/'+post._id)}}>Update</button>
                        <DeleteButton pid={post._id}/>
                        </>}
                        {/* <p>Comments: {post.comments.length}</p> */}
                </div>
            </div>
                    )})}
        </div>
        </div>
	)
}

export default PostFeed