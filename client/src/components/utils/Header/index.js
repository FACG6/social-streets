import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

import Menu from "./Menu";
import * as Logo from "assets/logo.png";
import HamburgerButton from "./HamburgerButton";
import "./style.css";

export default class Header extends Component {
  state = {
    showMenu: false
  };

  toggleMenuHandler = () => {
    const { showMenu } = this.state;
    this.setState({ showMenu: !showMenu });
  };

  render() {
    const { showMenu } = this.state;
    const { showHamburger = true } = this.props;

    return (
      <header className="header">
        <Router>
          <Link to="/">
            <img src={Logo} alt="Logo" className="header--logo" />
          </Link>
        </Router>
        {showHamburger && (
          <HamburgerButton
            className="header--hamburger-button"
            toggleMenuHandler={this.toggleMenuHandler}
          />
        )}
        <Menu show={showMenu} />
      </header>
    );
  }
}

Header.propTypes = {
  showHamburger: PropTypes.bool
};
