import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default function Button({
  children,
  onClick = undefined,
  className = ""
}) {
  return (
    <div className={`btn ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};
