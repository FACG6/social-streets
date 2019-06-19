import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

import Button from "components/utils/Button";
import "./style.css";

class ProfilePersonal extends Component {
  state = {
    confirmDirty: false
  };

  componentDidMount = () => {
    this.props.form.setFieldsValue(this.props.personal);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
  };

  handleCancel = () => {};

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("Passwords must match!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="profile-page--form-personal"
      >
        <Form.Item
          label="First Name"
          required={false}
          className="profile-page--form-item"
        >
          {getFieldDecorator("firstName", {
            rules: [
              {
                type: "string",
                message: "The First Name should be string!"
              },
              {
                whitespace: true,
                message: "Delete the spaces!"
              },
              {
                min: 3,
                message: "First Name must be 3 charcter at least!"
              },
              {
                required: true,
                message: "Please Enter your First Name!"
              }
            ]
          })(<Input placeholder="Your First Name" />)}
        </Form.Item>

        <Form.Item
          label="Last Name"
          required={false}
          className="profile-page--form-item"
        >
          {getFieldDecorator("lastName", {
            rules: [
              {
                type: "string",
                message: "The Last Name should be string!"
              },
              {
                whitespace: true,
                message: "Delete the spaces!"
              },
              {
                min: 3,
                message: "Last Name must be 3 charcter at least!"
              },
              {
                required: true,
                message: "Please Enter your Last Name!"
              }
            ]
          })(<Input placeholder="Your Last Name" />)}
        </Form.Item>

        <Form.Item
          label="Email"
          required={false}
          className="profile-page--form-item"
        >
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input placeholder="Email" />)}
        </Form.Item>

        <Form.Item
          label="Password"
          required={false}
          hasFeedback
          className="profile-page--form-item"
        >
          {getFieldDecorator("oldPassword", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                whitespace: true,
                message: "Delete the spaces!"
              },
              {
                validator: this.validateToNextPassword
              },
              {
                min: 8,
                message: "Password must be 8 charcter at least!"
              }
            ]
          })(
            <Input.Password placeholder="Password" visibilityToggle={false} />
          )}
        </Form.Item>
        <Form.Item
          label="New Password"
          required={false}
          hasFeedback
          className="profile-page--form-item"
        >
          {getFieldDecorator("newPassword", {
            rules: [
              {
                required: false
              },
              {
                min: 8,
                message: "Password must be 8 charcter at least!"
              }
            ]
          })(
            <Input.Password
              onBlur={this.handleConfirmBlur}
              placeholder="Confirm Password"
            />
          )}
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          required={false}
          hasFeedback
          className="profile-page--form-item"
        >
          {getFieldDecorator("confirmNewPassword", {
            rules: [
              {
                required: false
              },
              {
                validator: this.compareToFirstPassword
              },
              {
                min: 8,
                message: "Password must be 8 charcter at least!"
              }
            ]
          })(
            <Input.Password
              onBlur={this.handleConfirmBlur}
              placeholder="Confirm Password"
            />
          )}
        </Form.Item>

        <Form.Item className="profile-page--form-btns">
          <Button
            type="submit"
            className="profile-page--form-btn-save"
            onClick={() => undefined}
          >
            Save
          </Button>

          <Button
            className="profile-page--form-btn-cancel"
            onClick={this.handleCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

ProfilePersonal.propTypes = {
  personal: PropTypes.object.isRequired
};

export default Form.create({ name: "Profile_Personal" })(ProfilePersonal);
