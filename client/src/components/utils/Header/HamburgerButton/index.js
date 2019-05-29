import React, { Component } from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class HamburgerButton extends Component {
  state = {
    toggled: false
  };

  toggleHamburger = () => {
    const { toggled } = this.state;
    const { toggleMenuHandler } = this.props;
    this.setState({ toggled: !toggled }, toggleMenuHandler);
  };

  render() {
    const { toggled } = this.state;
    const { className = "" } = this.props;
    return (
      <div
        className={`hamburger-container ${className} ${
          toggled ? "hamburger-container-change" : ""
        }`}
        onClick={this.toggleHamburger}
      >
        {[1, 2, 3].map(value => (
          <div
            key={value}
            className={`hamburger-container--bar hamburger-container--bar${value}`}
          />
        ))}
      </div>
    );
  }
}

HamburgerButton.propTypes = {
  toggleMenuHandler: PropTypes.func.isRequired,
  className: PropTypes.string
};
