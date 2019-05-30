import React from "react";
import { InputAntd, TextAreaAntd, DropDownAntd } from "components/utils";
import "./style.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  DatePicker,
  AutoComplete,
  InputNumber,
  Upload,
  Divider,
  Card,
  Button
} from "antd";

import { Button as Btn } from "components/utils";
const AutoCompleteOption = AutoComplete.Option;

class EventForm extends React.Component {
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
    const { eventTypeValues, eventTopicValues } = this.props;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form className="main--eventForm" onSubmit={this.handleSubmit}>
        {InputAntd(
          true,
          "Title",
          "What do you want others to call you?",
          getFieldDecorator,
          "title",
          "Please input your Event’s Title!",
          "Event’s Title"
        )}
        {DropDownAntd(
          "Event’s Type",
          getFieldDecorator,
          "eventType",
          true,
          "Please select your Event’s Type!",
          "Event’s Type",
          this.handleSelectChange,
          eventTypeValues
        )}
        {DropDownAntd(
          "Event’s Topic",
          getFieldDecorator,
          "eventTopic",
          true,
          "Please select your Event Topic!",
          "Event’s Topic",
          this.handleSelectChange,
          eventTopicValues
        )}
        {TextAreaAntd(
          true,
          {},
          "Description",
          "What do you want others to call you?",
          getFieldDecorator,
          "description",
          "Please input your description!",
          "Enter Event Description",
          10,
          false
        )}
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
              name="eventImage"
              action="/upload.do"
              listType="picture"
            >
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Divider style={{ margin: "20px 0" }} />
        {InputAntd(
          false,
          "Focus Keyword",
          "",
          getFieldDecorator,
          "focusKeyword",
          "Please input your keyword!",
          "Your main keyword"
        )}
        <Card
          title={
            <>
              Event Title
              <br />
              <span style={{ color: "#277839" }}>
                www.socialstreets.co/events/festival
              </span>
            </>
          }
          bordered={true}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          {TextAreaAntd(
            false,
            { fontSize: "15px" },
            "Meta Description",
            "What do you want others to call you?",
            getFieldDecorator,
            "metaDescription",
            "Please input your Meta Description!",
            "Your main Meta Description",
            5,
            false
          )}
        </Card>
        <Form.Item>
          <Btn onClick={() => {}} type="primary" htmlType="submit">
            Publish
          </Btn>
          <Btn
            className="main--form-btn-gradient main--form-btn"
            onClick={() => {}}
            type="primary"
            htmlType="submit"
          >
            Preview
          </Btn>
          <Btn
            className="main--form-btn-black main--form-btn"
            onClick={() => {}}
            type="primary"
            htmlType="submit"
          >
            Cancel
          </Btn>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEventForm = Form.create({ name: "eventForm" })(EventForm);

export default WrappedEventForm;
