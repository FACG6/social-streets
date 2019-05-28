import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default function Button({ children, onClick, className }) {
  return (
    <div className={`btn ${className}`} type="div" onClick={onClick}>
      {children}
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.instanceOf(Function),
  className: PropTypes.string
};

Button.defaultProps = {
  onClick: undefined,
  className: ""
};
