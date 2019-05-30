import React from 'react'
import { Form, Input } from 'antd'
import Button from 'components/utils/Button'

import './style.css'

class PersonalForm extends React.Component {

  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Password must match!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 0 },
        sm: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className='form'>

        <Form.Item label="First Name" className='form--item'>
          {getFieldDecorator('first', {
            rules: [
              {
                type: 'string',
                message: 'The First Name should be string!',
              },
              {
                whitespace: true,
                message: 'Delete the spaces!'
              },
              {
                min: 3,
                message: 'First Name must be 3 charcter at least!',
              },
              {
                required: true,
                message: 'Please inter your First Name!',
              },
            ],
          })(<Input placeholder='Your First Name' />)}
        </Form.Item>

        <Form.Item label="Last Name" className='form--item' >
          {getFieldDecorator('last', {
            rules: [
              {
                type: 'string',
                message: 'The Last Name should be string!',
              },
              {
                whitespace: true,
                message: 'Delete the spaces!'
              },
              {
                min: 3,
                message: 'Last Name must be 3 charcter at least!',
              },
              {
                required: true,
                message: 'Please inter your Last Name!',
              },
            ],
          })(<Input  placeholder='Your Last Name' />)}
        </Form.Item>

        <Form.Item label="Email" className='form--item' >
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input placeholder='Email' />)}
        </Form.Item>

        <Form.Item label="Password" hasFeedback className='form--item' >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                whitespace: true,
                message: 'Delete the spaces!'
              },
              {
                validator: this.validateToNextPassword,
              },
              {
                min: 8,
                message: 'Password must be 8 charcter at least!',
              }
            ],
          })(<Input.Password placeholder='Password' />)}
        </Form.Item>

        <Form.Item label="Confirm Password" hasFeedback className='form--item' >
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },  
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} placeholder='Confirm Password' />)}
        </Form.Item>
          <div className='form-div'>
            <Form.Item {...tailFormItemLayout}>
            <Button type="submit" className='form--btn-save' >
              Save
            </Button>
            <Button className='form--btn-cancel'>
              Cancel
            </Button>
            </Form.Item>
          </div>

      </Form>
    );
  }
}

const PersonalProfile = Form.create({ name: 'register' })(PersonalForm);

export default PersonalProfile
