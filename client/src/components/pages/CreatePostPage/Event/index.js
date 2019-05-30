import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
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

import { InputAntd, TextAreaAntd, DropDownAntd } from "components/utils";
import { Button as Btn } from "components/utils";
import "./style.css";

const AutoCompleteOption = AutoComplete.Option;
const InputGroup = Input.Group;

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
      autoCompleteResult = [".com", ".org", ".net", ".co"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { autoCompleteResult } = this.state;

    const {
      eventTypeValues,
      eventTopicValues,
      form: { getFieldDecorator }
    } = this.props;

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form className="main--eventForm" onSubmit={this.handleSubmit}>
        <InputGroup size="large">
          <InputAntd
            withTip={true}
            label="Title"
            tipInfo="Title for Event"
            getFieldDecorator={getFieldDecorator}
            name="title"
            validationMsg="Please input your Event’s Title!"
            placeholder="Event’s Title"
            validation={{ max: 60 }}
          />
        </InputGroup>
        <DropDownAntd
          label="Event’s Type"
          getFieldDecorator={getFieldDecorator}
          name="eventType"
          required={true}
          validationMsg="Please select your Event’s Type!"
          placeholder="Event’s Type"
          handleSelectChange={this.handleSelectChange}
          optionsMenu={eventTypeValues}
        />
        <DropDownAntd
          label="Event’s Topic"
          getFieldDecorator={getFieldDecorator}
          name="eventTopic"
          required={true}
          validationMsg="Please select your Event Topic!"
          placeholder="Event’s Topic"
          handleSelectChange={this.handleSelectChange}
          optionsMenu={eventTopicValues}
        />
        <TextAreaAntd
          withTip={true}
          style={{}}
          label="Description"
          getFieldDecorator={getFieldDecorator}
          name="description"
          validationMsg="Please input your description!"
          placeholder="Enter Event Description"
          min={10}
          max={false}
        />
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
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator("website", {
            rules: [
              {
                required: true,
                message: "Please input website!",
                pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
              }
            ]
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
              size="large"
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
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Image&nbsp;
              <Tooltip title="Image for event">
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
              <Button size="large">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Divider style={{ margin: "20px 0" }} />
        <InputGroup size="large">
          <InputAntd
            withTip={false}
            label="Focus Keyword"
            tipInfo=""
            getFieldDecorator={getFieldDecorator}
            name="focusKeyword"
            validationMsg="Please input your keyword!"
            placeholder="Your main keyword"
          />
        </InputGroup>
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
          <TextAreaAntd
            withTip={false}
            style={{ fontSize: "15px" }}
            label="Meta Description"
            getFieldDecorator={getFieldDecorator}
            name="metaDescription"
            validationMsg="Please input your Meta Description!"
            placeholder="Your main Meta Description"
            min={5}
            max={false}
          />
        </Card>
        <Form.Item>
          <Btn onClick={() => {}} type="primary" htmlType="submit">
            Publish
          </Btn>
          <Btn
            className="main--form-btn-gradient main--form-btn"
            onClick={() => <Redirect for="/home" />}
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

WrappedEventForm.propTypes = {
  eventTopicValues: PropTypes.array.isRequired,
  eventTypeValues: PropTypes.array.isRequired
};
export default WrappedEventForm;
