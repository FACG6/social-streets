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
import axios from "axios";
import moment from "moment";

import { InputAntd, TextAreaAntd, DropDownAntd } from "components/utils";
import { Button as Btn } from "components/utils";
import "./style.css";

const InputGroup = Input.Group;

class EventForm extends React.Component {
  state = {
    publishDatetime: moment().format(),
  };
  async componentDidMount() {
    try {
      const {
        form: { setFieldsValue },
        id
      } = this.props;

      if (id) {
        const getRes = await axios.get(`/api/v1/post/${id}`, {
          params: {
            postType: "event"
          }
        });
        const event = getRes.data.data[0];
        event.topic = getRes.data.data.map(event => event.topic_id);
        event.category = event.event_category;
        event.event_start_datetime = moment(getRes.data.data.event_start_date);
        event.event_end_datetime = moment(getRes.data.data.event_start_date);
        delete event.event_category;
        delete event.topic_id;
        this.setState({ publishDatetime: event.publish_datetime }, () => {
          setFieldsValue(event);
        });
      }
    } catch (err) {
      if (Number(err.statusCode) === 400) {
        notification.error({
          message: "Bad Request",
          description: err.message
        });
      } else if (Number(err.statusCode) === 401) {
        notification.error({
          message: "Unauthorized",
          description: err.message
        });
      } else if (Number(err.statusCode) === 500) {
        notification.error({
          message: "Internal Server Error",
          description: err.message
        });
      } else {
        notification.error({
          message: "Error",
          description: "Something went wrong please try again later"
        });
      }
      this.props.history.push('/');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const target = e.target;
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      try {
        if (err) {
          notification.error({
            message: "Error",
            description: "Validation Error"
          });
        } else {
          values.type = 'event'
          values.publishDatetime = moment().format()
          target.textContent === 'Preview' && !this.props.id ? values.isDraft = 'true' : values.isDraft = 'false';
          values.eventStartDatetime = values.event_start_datetime;
          values.eventEndDatetime = values.event_end_datetime;
          values.eventTopic = values.topic;
          values.altText = values.alt_text;
          values.focusKey = values.focus_key;

          const formData = new FormData()
          const file = this.uploadInput.state.fileList.length ? this.uploadInput.state.fileList[0].originFileObj : null;
          formData.append('data', JSON.stringify(values))
          formData.append('image', file)
          if (!file && !this.props.id) return notification.error({ message: "Bad Request", description: 'Add an Image' });

          const { id } = this.props;
          let resPost;

          //Edit Post//
          if (id && target.textContent !== 'Preview') {
            resPost = await axios.put(`/api/v1/post/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            if (resPost.data.data.id)
              notification.success({
                message: "Successfully",
                description: "Post updated successfully"
              })
          }

          //Preview Published Post//
          if (this.props.id && target.textContent === 'Preview') {
            return notification.warning({
              message: 'Sorry!',
              description: 'You have to save the post to review it',
            })

          }

          //Post New Post: Draft or Live//
          if (!id) {
            resPost = await axios.post('/api/v1/post', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            if (resPost.data.data.id)
              notification.success({
                message: "Successfully",
                description: "Post added successfully"
              })
          }

          const { id: postId, category } = resPost.data.data;
          const categories = this.props.eventTypeValues;
          const catId = categories.findIndex(({ id }) => id === category);
          const postCategory = categories[catId].category.toLowerCase().replace(' and ', '-');

          // redirect
          this.props.history.push(`/post/event/${postCategory}/${postId}`)
        }

      } catch (err) {
        if (Number(err.statusCode) === 400) {
          notification.error({
            message: "Bad Request",
            description: err.message
          });
        } else if (Number(err.statusCode) === 401) {
          notification.error({
            message: "Unauthorized",
            description: err.message
          });
        } else if (Number(err.statusCode) === 500) {
          notification.error({
            message: "Internal Server Error",
            description: err.message
          });
        } else {
          notification.error({
            message: "Error",
            description: "Something went wrong please try again later"
          });
        }
      }
    });
  };

  render() {
    const {
      id,
      eventTypeValues,
      eventTopicValues,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;
    const eventCategory = eventTypeValues.map(element => {
      return { id: element.id, value: element.category };
    });
    const eventTopic = eventTopicValues.map(element => {
      return { id: element.id, value: element.topic };
    });

    const urlType = getFieldValue("eventType");

    return (
      <Form className="main--eventForm">
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
          name="topic"
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
        <Form.Item label={<span>Start Date & Time &nbsp;</span>}>
          {getFieldDecorator("event_start_datetime", {
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
        <Form.Item label={<span>End Date & Time &nbsp;</span>}>
          {getFieldDecorator("event_end_datetime", {
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
          {
            <Upload
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
              <span style={{ color: "#f36f18" }}>
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
          <Btn name='publish' type="primary" htmlType="submit" onClick={this.handleSubmit}>
            {id ? "Save" : "Publish"}
          </Btn>
          <Btn
            className="main--form-btn-gradient main--form-btn"
            type="primary"
            htmlType="submit"
            onClick={this.handleSubmit}
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
