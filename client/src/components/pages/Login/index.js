import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Form, Icon, Input, Checkbox } from "antd";

import Button from "components/utils/Button";
import "./style.css";

class LoginPage extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err)
        fetch("/login", { method: "POST", body: JSON.stringify(values) });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <main className="login-page--main-section">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="Email Address">
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Email address is required!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="example@example.com"
                  className="login-form--input"
                />
              )}
            </Form.Item>

            <Form.Item label="Password">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please enter your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  className="login-form--input"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("rememberMe", {
                valuePropName: "checked",
                initialValue: false
              })(<Checkbox>Remember me</Checkbox>)}
            </Form.Item>

            <div className="login-form--submit-div">
              <Button type="submit">Log in</Button>
              <Router>
                <span className="form--create-acc">
                  Don't have an account?
                  <Link to="/signup" className="login-form--signup-link">
                    Sign up
                  </Link>
                  now
                </span>
              </Router>
            </div>
          </Form>
        </main>
      </Fragment>
    );
  }
}

export default Form.create({ name: "Login_Form" })(LoginPage);
