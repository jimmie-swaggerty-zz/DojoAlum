import React from 'react';
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
    <div className="feed">
      <div className="post align-middle">
        <div className="formheader"><b>New Post</b></div>
        <form onSubmit={ submitHandler } className="formbody">
            <div className="row">
              <div class="col">

                {
                  errors.title ?
                    <span className="error-text">{errors.title.message}</span>
                    : null
                }
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Subject"
                  value={ post.title }
                  onChange={ (e) => inputChange(e) }
                  />
              </div>
              <div className="col">
                {
                  errors.category ?
                    <span className="error-text">{errors.category.message}</span>
                    : null
                }
                <select
                  name="category"
                  value={ post.category }
                  onChange={ (e) => inputChange(e) }
                  className="form-control"
                  >
                  <option>Category</option>
                  {
                    categories.map((category, index) => (
                      <option value={ category } key={ 'category-' + index }>{ category }</option>
                    ))
                  }
                </select>
                </div>
            </div>
              <div class="form-group">
              <textarea
              type="textarea"
              name="content"
              className="form-control"
              value={post.content}
              placeholder="Message"
              onChange={(e) => inputChange(e)}
              />
              </div>
          <div className="form-group">
              <input
                type="URL"
                name="url"
                className="form-control"
                value={post.url}
                placeholder="URL"
                onChange={ (e) => inputChange(e) }
                />

          </div>
          <button className="btn btn-light me-2 btn-outline-primary">{ buttonLabel }</button>
          <button onClick={ () => navigate("/") } className="btn btn-light me-2 btn-outline-primary">Cancel</button>
        </form>
        </div>
    </div>
  )
}

export default PostForm;