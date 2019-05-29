import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default function Button({
  children,
  onClick,
  className = "",
  type = "button"
}) {
  return (
    <button className={`btn ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string
};
