import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class HamburgerButton extends Component {
  state = {
    toggled: false
  };

  toggleHamburger = () => {
    const { toggled } = this.state;
    const { toggleMenu } = this.props;
    this.setState({ toggled: !toggled }, toggleMenu);
  };

  render() {
    const { toggled } = this.state;
    const { className } = this.props || "";
    return (
      <div
        className={`hamburger-container ${className} ${
          toggled ? "hamburger-container--change" : ""
        }`}
        onClick={this.toggleHamburger}
      >
        <div className="hamburger-container__bar1" />
        <div className="hamburger-container__bar2" />
        <div className="hamburger-container__bar3" />
      </div>
    );
  }
}

HamburgerButton.propTypes = {
  toggleMenu: PropTypes.instanceOf(Function).isRequired,
  className: PropTypes.string
};

HamburgerButton.defaultProps = {
  className: ""
};
