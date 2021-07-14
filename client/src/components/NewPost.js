import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import PostForm from './PostForm';

const NewPost = (props) => {
  const [ errors, setErrors ] = useState({});
  const [ post, setPost ] = useState({
    title: "",
    category:"",
    content:"",
    url:""
  })

  const submitHandler = (e) => {
    e.preventDefault();

    // do some stuff
    axios.post('http://localhost:8000/api/post/', post, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        navigate('/' + props.id);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      })
  }


  return (
    <div>
      <PostForm
        post={ post } 
        setPost={ setPost }
        errors={ errors }
        submitHandler={ submitHandler }
        buttonLabel={ "Post" }
        />
    </div>
  )
}

export default NewPost;