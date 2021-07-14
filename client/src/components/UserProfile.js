import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import DeleteButton from "../components/DeleteButton";
import axios from "axios";

const UserProfile = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/posts/" + props.user._id)
      .then((res) => {
        setPosts(res.data);
        //console.log(res.data)
      });
  }, [props.user._id]);

  return (
    <div>
      <div className="headerbody">
        <p className="welcome"></p>
      </div>
      <div className="container-fluid">
        <div className="row align-top">
          <div className="col">
            <div className="post">
              <div className="formheader">User Info</div>
              <div className="formbody">
                <div className="user-label">Username</div>
                <p key={props.user._id} name={props.user._id}>
                  {props.user.username}
                </p>
                <div className="user-label">Email</div>
                <p>{props.user.email}</p>
              </div>
            </div>
          </div>
          <div className="feed col-8">
            <div className="post">
              <div className="formheader">{props.user.username}'s posts</div>
            </div>
            {posts.map((pt) => {
              //header styles
              const JobStyle = { backgroundColor: "#0D6EFD" };
              const CodeStyle = { backgroundColor: "#6da8fd" };
              const shareStyle = { backgroundColor: "#094db1" };
              var style = {};
              if (pt.category === "Job Posting") {
                style = JobStyle;
              } else if ([pt].category === "Share") {
                style = CodeStyle;
              } else {
                style = shareStyle;
              }
              return (
                <div className="post align-middle">
                  <div className="postheader" style={style}>
                    <span className="category-tag">{pt.category}</span>{" "}
                    &nbsp;|&nbsp;
                    <b>{pt.title}</b>
                    <Link
                      to={"/users/profile/" + pt.user_id._id}
                      className="usernamelink"
                    >
                      {pt.user_id.username}
                    </Link>
                  </div>
                  <div className="postbody">
                    <p className="postcontent">{pt.content}</p>
                    {pt.url && (
                      <div>
                        <button
                          className="btn btn-light me-2 btn-outline-primary"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/post/" + pt._id);
                          }}
                        >
                          View
                        </button>
                        {props.user !== undefined &&
                          props.user._id === pt.user_id._id && (
                            <div>
                              <button
                                className="btn btn-light me-2 btn-outline-primary"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate("/post/update/" + pt._id);
                                }}
                              >
                                Update
                              </button>
                              <DeleteButton pid={pt._id} />
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
