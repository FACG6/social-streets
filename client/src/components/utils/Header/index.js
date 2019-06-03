import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import Menu from "./Menu";
import * as Logo from "assets/logo.png";
import HamburgerButton from "./HamburgerButton";
import "./style.css";

class Header extends Component {
  state = {
    showMenu: false
  };

  toggleMenuHandler = () => {
    const { showMenu } = this.state;
    this.setState({ showMenu: !showMenu });
  };

  render() {
    console.log(this.props, 11111111111111)
    const { showMenu } = this.state;
    const { showHamburger = true } = this.props;

    return (
      <header className="header">
        <Link to="/">
          <img src={Logo} alt="Logo" className="header--logo" />
        </Link>
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

export default withRouter(Header)
