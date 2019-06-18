import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PropTypes from "prop-types";

import Menu from "./Menu";
import * as Logo from "assets/logo.png";
import HamburgerButton from "./HamburgerButton";
import "./style.css";

export default class Header extends Component {
  state = {
    showMenu: false,
    hamToggled: false
  };

  handleMenuToggle = () => {
    const { hamToggled, showMenu } = this.state;
    this.setState({ hamToggled: !hamToggled, showMenu: !showMenu });
  };

  handleMenuToggleOnScroll = () => {
    const { hamToggled, showMenu } = this.state;
    if (!showMenu) return;
    this.setState({ hamToggled: !hamToggled, showMenu: !showMenu });
  };

  render() {
    const { showMenu } = this.state;
    const { showHamburger = true } = this.props;

    window.onscroll = this.handleMenuToggleOnScroll;

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
            handleMenuToggle={this.handleMenuToggle}
            toggled={this.state.hamToggled}
          />
        )}
        <Menu handleMenuToggle={this.handleMenuToggle} show={showMenu} />
      </header>
    );
  }
}

Header.propTypes = {
  showHamburger: PropTypes.bool
};
