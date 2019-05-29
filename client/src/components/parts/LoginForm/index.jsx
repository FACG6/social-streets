import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import Button from "./../Button";
import "./style.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailInput = createRef();
    this.passwordInput = createRef();
  }

  handleSubmit() {
    const user = JSON.stringify({
      email: this.emailInput.current.value,
      password: this.passwordInput.current.value
    });
    fetch("/login", { method: "POST", body: user });
  }

  render() {
    return (
      <form className={`login__form ${this.props.className}`}>
        <label htmlFor="emailInput" className="login__label login__email-label">
          <span className="login__label-text login__email-text">
            Email Address
          </span>
          <input
            type="email"
            id="emailInput"
            className="login__input login__email-input"
            ref={this.emailInput}
          />
        </label>
        <label
          htmlFor="passwordInput"
          className="login__label login__password-label"
        >
          <span className="login__label-text login__password-text">
            Password
          </span>
          <input
            type="password"
            id="passwordInput"
            className="login__input login__password-input"
            ref={this.passwordInput}
          />
        </label>
        <Button onClick={this.handleSubmit}>Log in</Button>
      </form>
    );
  }
}
