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
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        fetch("/login", { method: "POST", body: JSON.stringify(values) });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="Email Address">
          {getFieldDecorator("username", {
            rules: [
              { required: true, message: "Email address is required !" },
              { type: "email", message: "Please enter a valid email address" }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="example@example.com"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please enter your Password !" }]
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
            initialValue: false
          })(<Checkbox>Remember me</Checkbox>)}
        </Form.Item>
        <div>
          <Button type="submit">Log in</Button>
          <Router>
            <span className="form--create-acc">
              Don't have an account?{" "}
              <Link to="/signup" className="sign-up">
                Sign up
              </Link>{" "}
              now
            </span>
          </Router>
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "Login_Form" })(LoginForm);
