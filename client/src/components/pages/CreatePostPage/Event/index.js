import React from "react";
import { Options } from "components/utils/Option";
import "./style.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Button,
  AutoComplete
} from "antd";

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const { eventTypeValues, eventTopicValues } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span>
              Title&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="info-circle" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Event’s Title">
          {getFieldDecorator("eventTitle", {
            rules: [
              { required: true, message: "Please select your Event’s Title!" }
            ]
          })(
            <Select
              placeholder="Event’s Title"
              onChange={this.handleSelectChange}
            >
              {<Options eventTypeValues={eventTypeValues} />}
            </Select>
          )}
        </Form.Item>
        {/* <Form.Item label="Event Topic">
          {getFieldDecorator("eventTopic", {
            rules: [
              { required: true, message: "Please select your Event Topic!" }
            ]
          })(
            <Select
              placeholder="Event Topic"
              onChange={this.handleSelectChange}
            >
              <Option value="Family and Children">Family and Children</Option>
              <Option value="Food and Drink">Food and Drink</Option>
              <Option value="Exhibitions">Exhibitions</Option>
              <Option value="Courses and workshops">
                Courses and workshops
              </Option>
              <Option value="Walks and Talks">Walks and Talks</Option>
            </Select>
          )}
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
