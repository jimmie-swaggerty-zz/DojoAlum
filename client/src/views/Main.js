import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Main = (props) => {

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
        <div>
            <h1>Welcome CodingDojo Alum!</h1>
            <p>This application is designed to be a center for CodingDojo alumni to communicate about upcoming job opportunities, to continue assisting eachother on code questions, and to share fun and new information!</p>
            <div className="Feed">
            {loaded > 0 && posts.map((post, idx)=>{
                        return <div className="post" key={idx}>
                        <h3>{post.title}</h3>
                        <h4>Category | {post.category}</h4>
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
export default Main;
