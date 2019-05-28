import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as Logo from "./logo.png";
import HamburgerButton from "./../HamburgerButton";
import "./style.css";

function Menu({ show }) {
  if (show)
    return (
      <Router>
        <div className="header__menu">
          <Link to="/profile" className="header__menu-text">
            Profile
          </Link>
          <Link to="/create-post" className="header__menu-text">
            Create Post
          </Link>
          <Link to="/posts/live" className="header__menu-text">
            Live Posts
          </Link>
          <Link to="/posts/drafts" className="header__menu-text">
            Drafts
          </Link>
          <a href="/logout" className="header__menu-text">
            Log out
          </a>
        </div>
      </Router>
    );
  else return <Fragment />;
}

export default class Header extends Component {
  state = {
    showMenu: false
  };

  toggleMenu = () => {
    const { showMenu } = this.state;
    this.setState({ showMenu: !showMenu });
  };

  render() {
    const { showMenu } = this.state;
    const { showHamburger } = this.props;
    return (
      <header className="header">
        <img src={Logo} alt="Logo" className="header__logo" />
        {showHamburger ? (
          <HamburgerButton
            className="header__hamburger-button"
            toggleMenu={this.toggleMenu}
          />
        ) : (
          <Fragment />
        )}
        <Menu show={showMenu} />
      </header>
    );
  }
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired
};

Header.propTypes = {
  showHamburger: PropTypes.bool
};

Header.defaultProps = {
  showHamburger: true
};
