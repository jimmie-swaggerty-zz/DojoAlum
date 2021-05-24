import React from "react";

const UserProfile = (props) => {
  return (
    <div className="profile-card">
      <p key={props.user._id} name={props.user._id}>
        {props.user.username}
      </p>
      <p>{props.user.email}</p>
    </div>
  );
};

export default UserProfile;
