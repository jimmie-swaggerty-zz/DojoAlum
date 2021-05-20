import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import PostForm from './PostForm';

const EditPost = (props) => {
  const [ errors, setErrors ] = useState({});
  const [ post, setPost ] = useState({
    title: "",
    category:"",
    content:"",
    url:""
  })

  useEffect(() => {
    axios.get('http://localhost:8000/api/post/' + props.id, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        navigate("/");
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    // do some stuff
    axios.put('http://localhost:8000/api/post/' + props.id, post, {
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
      <h2>Edit Post</h2>
      <PostForm
        post={ post } 
        setPost={ setPost }
        errors={ errors }
        submitHandler={ submitHandler }
        buttonLabel={ "Update Post" }
        />
    </div>
  )
}

export default EditPost;