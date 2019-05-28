import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as Logo from "./logo.png";
import HamburgerButton from "../HamburgerButton";
import "./style.css";

function Menu({ show }) {
  if (show)
    return (
      <Router>
        <div className="header__menu">
          <Link to="/profile" className="header__menu-text">
            Profile
          </Link>
          <Link to="/new-post" className="header__menu-text">
            Create Post
          </Link>
          <Link to="/posts/live" className="header__menu-text">
            Live Posts
          </Link>
          <Link to="/posts/draft" className="header__menu-text">
            Draft
          </Link>
          <a href="/logout" className="header__menu-text">
            Log out
          </a>
        </div>
      </Router>
    );
  else return <Fragment />;
}

function Navbar() {
  return (
    <Router>
      <div className="header__nav">
        <Link to="/profile" className="header__nav-text">
          Profile
        </Link>
        <Link to="/new-post" className="header__nav-text">
          Create Post
        </Link>
        <Link to="/posts/live" className="header__nav-text">
          Live Posts
        </Link>
        <Link to="/posts/draft" className="header__nav-text">
          Draft
        </Link>
        <a href="/logout" className="header__nav-text">
          Log out
        </a>
      </div>
    </Router>
  );
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
          window.innerWidth <= 500 ? (
            <HamburgerButton
              className="header__hamburger-button"
              toggleMenu={this.toggleMenu}
            />
          ) : (
            <Navbar />
          )
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
