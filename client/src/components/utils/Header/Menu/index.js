import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.css";

export default function Menu({ show = false, handleMenuToggle }) {
  const links = [
    { target: "/profile", label: "Profile" },
    { target: "/new-post", label: "Create Post" },
    { target: "/posts/live", label: "Live Posts" },
    { target: "/posts/draft", label: "Draft" },
    { target: "/logout", label: "Logout" }
  ];
  if (show)
    return (
      <Router>
        <div className="header--menu">
          {links.map(({ target, label }, i) => (
            <Link
              key={`label_${i}`}
              to={target}
              onClick={handleMenuToggle}
              className="header--menu-text"
            >
              {label}
            </Link>
          ))}
        </div>
      </Router>
    );
  else return null;
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  handleMenuToggle: PropTypes.func.isRequired
};
