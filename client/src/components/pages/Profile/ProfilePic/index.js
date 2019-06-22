import React from "react";
import PropTypes from "prop-types";

import * as DefaultPic from "assets/default-profile-pic.jpg";
import "./style.css";

export default function ProfilePic({ className = "", imgSrc = "" }) {
  const fileInput = React.createRef();
  
  const handleFileInput = () => {
    console.log(fileInput.current.files);
  };
  return (
    <div className={`profile-pic ${className}`}>
      <img
        src={imgSrc || DefaultPic}
        alt="Profile Avatar"
        className="profile-pic--img"
      />
      <span
        className="profile-pic--edit-label"
        onClick={() => fileInput.current.click()}
      >
        Edit Picture
      </span>
      <input
        ref={fileInput}
        onChange={handleFileInput}
        type="file"
        accept="image/*"
        name="avatar"
        className="profile-pic--edit-input"
      />
    </div>
  );
}

ProfilePic.propTypes = {
  className: PropTypes.string,
  imgSrc: PropTypes.string
};
