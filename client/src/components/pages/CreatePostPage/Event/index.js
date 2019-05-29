import React from "react";
import { Options } from "components/utils";
import "./style.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Button,
  DatePicker,
  AutoComplete,
  InputNumber,
  Upload
} from "antd";

const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { autoCompleteResult } = this.state;
    const { getFieldDecorator } = this.props.form;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

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
      <Form className="main--form" onSubmit={this.handleSubmit}>
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
          })(<Input placeholder="Event’s Type" />)}
        </Form.Item>
        <Form.Item label="Event’s Type">
          {getFieldDecorator("eventType", {
            rules: [
              { required: true, message: "Please select your Event’s Type!" }
            ]
          })(
            <Select
              placeholder="Event’s Type"
              onChange={this.handleSelectChange}
            >
              {Options(eventTypeValues)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Event Topic">
          {getFieldDecorator("eventTopic", {
            rules: [
              { required: true, message: "Please select your Event Topic!" }
            ]
          })(
            <Select
              placeholder="Event Topic"
              onChange={this.handleSelectChange}
            >
              {Options(eventTopicValues)}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Description&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="info-circle" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("description", {
            rules: [
              {
                required: true,
                message: "Please input your description!",
                whitespace: true
              }
            ]
          })(
            <TextArea
              placeholder="Enter Description"
              autosize={{ minRows: 10, maxRows: false }}
            />
          )}
        </Form.Item>
        <Form.Item label={<span>Date and Time&nbsp;</span>}>
          {getFieldDecorator("dateAndTime", {
            rules: [
              {
                required: true,
                message: "Please input your Date and Time!"
              }
            ]
          })(
            <DatePicker
              style={{ width: "100%" }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator("website", {
            rules: [{ required: true, message: "Please input website!" }]
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item label="Cost">
          {getFieldDecorator("cost", {
            rules: [{ required: true, message: "Please input cost!" }]
          })(
            <InputNumber
              style={{ width: "100%" }}
              formatter={value =>
                `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Image&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="info-circle" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("image", {
            rules: [
              {
                required: true,
                message: "Please input your image!",
                whitespace: true
              }
            ]
          })(
            <Upload
              style={{ width: "100%" }}
              name="logo"
              action="/upload.do"
              listType="picture"
            >
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>
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
