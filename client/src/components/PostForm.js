import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const PostForm = (props) => {
  const { post, setPost, errors, submitHandler, buttonLabel } = props;

  const categories = [ 
    "Job Posting", "Code Help", "Share"
  ];

  // this works for ALL keys inside of the state object!!
  const inputChange = (e) => {
    console.log("e.target.name:  " + e.target.name);
    console.log("e.target.value: " + e.target.value);

    let newStateObject = { ...post };   // get a copy of the current state object
    newStateObject[e.target.name] = e.target.value;
    setPost(newStateObject);
  }

  return (
    <div>
      <h4>Post Form</h4>
        <form onSubmit={ submitHandler }>
          <div>
            <label>Title</label>
            {
              errors.title ?
                <span className="error-text">{errors.title.message}</span>
                : null
            }
            <input
              type="text"
              name="title"
              value={ post.title }
              onChange={ (e) => inputChange(e) }
              />
          </div>
          <div>
            <label>Category</label>
            {
              errors.category ?
                <span className="error-text">{errors.category.message}</span>
                : null
            }
            <select
              name="category"
              value={ post.category }
              onChange={ (e) => inputChange(e) }
              >
              <option value=""></option>
              {
                categories.map((category, index) => (
                  <option value={ category } key={ 'category-' + index }>{ category }</option>
                ))
              }
            </select>
          </div>
          <div>
              <label>Message</label>
              <textarea
              type="textarea"
              name="content"
              value={post.content}
              onChange={(e) => inputChange(e)}
              />
          </div>
          <div>
              <label>URL</label>
              <input
                type="URL"
                name="url"
                value={post.url}
                onChange={ (e) => inputChange(e) }
                />

          </div>
          <button>{ buttonLabel }</button>
          <button onClick={ () => navigate("/") } className="cancelBtn">Cancel</button>
        </form>
    </div>
  )
}

export default PostForm;