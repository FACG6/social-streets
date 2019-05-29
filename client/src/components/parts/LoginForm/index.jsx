import React, { Component, createRef } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Icon, Input, Checkbox } from "antd";
import Button from "./../Button";
import "./style.css";
import "antd/dist/antd.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailInput = createRef();
    this.passwordInput = createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleSubmit() {
    const user = JSON.stringify({
      email: this.emailInput.current.value,
      password: this.passwordInput.current.value
    });
    fetch("/login", { method: "POST", body: user });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          {/* <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button> */}
          <Button onClick={this.handleSubmit}>Log in</Button>
          Or
          <Router>
            <Link to="/signup">register now!</Link>
          </Router>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "Login_Form" })(LoginForm);
