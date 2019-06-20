import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  DatePicker,
  InputNumber,
  Upload,
  Divider,
  Card,
  Button,
  notification
} from "antd";
import axios from 'axios';
import moment from 'moment';

import { InputAntd, TextAreaAntd, DropDownAntd } from "components/utils";
import { Button as Btn } from "components/utils";
import "./style.css";

const InputGroup = Input.Group;

class EventForm extends React.Component {
  componentDidMount() {
    const {
      form: { setFieldsValue },
      id
    } = this.props;
    // if (id) {
    //   setFieldsValue(event);
    // }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((async (err, values) => {
      try {
        if (err) {
          notification.error({
            message: "Error",
            description: "Validation Error"
          });
        } else {
          values.type = 'event'
          values.publishDatetime = moment().format()
          values.isDraft = 'false'
          values.eventDatetime = values.event_datetime;
          values.altText = values.alt_text;
          values.focusKey = values.focus_key;

          const formData = new FormData()
          const file = this.uploadInput.state.fileList[0].originFileObj
          formData.append('data', JSON.stringify(values))
          formData.append('image', file)
          if (!file) return notification.error({ message: "Bad Request", description: 'Add an Image'});
          const postResponse = await axios.post('/api/v1/post', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
            notification.success({
              message: "Successfully",
              description: "Post added successfully"
            })
            const id = postResponse.rows[0].id
            this.props.history.push(`/post/${id}`)
        }
      } catch (err) {
        if (Number(err.statusCode) === 400) {
          notification.error({
            message: "Bad Request",
            description: err.message
          });
        } else if (Number(err.statusCode) === 500) {
          notification.error({
            message: "Internal Server Error",
            description: err.message
          });
        } else {
          notification.error({
            message: 'Error',
            description: 'There is an error try again'
          });
        }
      }
    }));
  };

  render() {
    const {
      eventTypeValues,
      eventTopicValues,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;

    const eventCategory = eventTypeValues.map((element) => {
      return { id: element.id, value: element.category }
    })
    const eventTopic = eventTopicValues.map((element) => {
      return { id: element.id, value: element.topic }
    });

    const urlType = getFieldValue("eventType");

    return (
      <Form className="main--eventForm" onSubmit={this.handleSubmit}>
        <InputGroup size="large">
          <InputAntd
            withTip
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
          name="category"
          required
          validationMsg="Please select your Event’s Type!"
          placeholder="Event’s Type"
          handleSelectChange={this.handleSelectChange}
          optionsMenu={eventCategory}
        />
        <DropDownAntd
          mode="multiple"
          label="Event’s Topic"
          getFieldDecorator={getFieldDecorator}
          name="eventTopic"
          required
          validationMsg="Please select your Event Topic!"
          placeholder="Event’s Topic"
          handleSelectChange={this.handleSelectChange}
          optionsMenu={eventTopic}
        />
        <TextAreaAntd
          withTip
          label="Description"
          getFieldDecorator={getFieldDecorator}
          name="description"
          validationMsg="Please input your description!"
          placeholder="Enter Event Description"
          min={10}
          max={false}
        />
        <Form.Item label={<span>Date and Time&nbsp;</span>}>
          {getFieldDecorator("event_datetime", {
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
        <InputGroup size="large">
          <InputAntd
            withTip={false}
            label="Website"
            getFieldDecorator={getFieldDecorator}
            name="website"
            validationMsg="Please input website!"
            placeholder="Enter website"
            validation={{
              max: 60,
              pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              message: "Please input website!"
            }}
          />
        </InputGroup>
        <InputGroup size="large">
          <InputAntd
            label="Venue"
            getFieldDecorator={getFieldDecorator}
            name="venue"
            validationMsg="Please input your Event’s venue!"
            placeholder="Event’s Venue"
          />
        </InputGroup>
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
          {<Upload
            style={{ width: "100%" }}
            customRequest={_ => _}
            listType="picture"
            ref={element => (this.uploadInput = element)}
            showUploadList={false}
          >
            <Button size="large">
              <Icon type="upload" /> Click to upload
              </Button>
          </Upload>
          }
        </Form.Item>
        <InputGroup size="large">
          <InputAntd
            withTip={false}
            label="Alt-Text"
            tipInfo=""
            getFieldDecorator={getFieldDecorator}
            name="alt_text"
            validationMsg="Please input Alt Text For Image!"
            placeholder="Your Alt Text For Image"
          />
        </InputGroup>
        <Divider style={{ margin: "20px 0" }} />
        <InputGroup size="large">
          <InputAntd
            withTip={false}
            label="Focus Keyword"
            tipInfo=""
            getFieldDecorator={getFieldDecorator}
            name="focus_key"
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
                www.socialstreets.co/events/{urlType && urlType}
              </span>
            </>
          }
          bordered
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <TextAreaAntd
            withTip={false}
            style={{ fontSize: "15px" }}
            label="Meta Description"
            getFieldDecorator={getFieldDecorator}
            name="meta"
            validationMsg="Please input your Meta Description!"
            placeholder="Your main Meta Description"
            min={5}
            max={false}
          />
        </Card>
        <Form.Item>
          <Btn type="primary" htmlType="submit">
            Publish
          </Btn>
          <Btn
            className="main--form-btn-gradient main--form-btn"
            type="primary"
            htmlType="submit"
          >
            Preview
          </Btn>
          <Btn
            className="main--form-btn-black main--form-btn"
            onClick={() => <Redirect to="/home" />}
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
  eventTypeValues: PropTypes.array.isRequired,
  event: PropTypes.object
};
export default WrappedEventForm;
