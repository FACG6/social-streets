import React from "react";
import { Divider, Select } from "antd";
import { eventTypeValues, eventTopicValues } from "./dumyData";
import PropTypes from "prop-types";

import EventFrom from "./Event";
import SocialBusiness from "./SocialBusiness";
import "./style.css";

const { Option } = Select;

class CreatPostPage extends React.Component {
  state = {
    postType: "Event",
    eventTypeValues: "",
    eventTopicValues: ""
  };
  componentDidMount() {
    this.setState({
      eventTypeValues: eventTypeValues,
      eventTopicValues: eventTopicValues
    });
  }
  handlePostTypeChange = e => {
    this.setState({ postType: e });
  };
  render() {
    const { postType, eventTypeValues } = this.state;
    return (
      <section className="main">
        <h1 style={{ margin: 0 }}>Publish New Post</h1>
        <Divider style={{ margin: "0 0 30px 0" }} />
        <h4>Post Type</h4>
        <Select
          placeholder="Event’s Title"
          onChange={this.handlePostTypeChange}
        >
          <Option value="Event">Event</Option>
          <Option value="Social Business">Social Business</Option>
        </Select>
        <Divider style={{ margin: "20px 0" }} />
        {eventTypeValues && eventTopicValues && postType === "Event" ? (
          <EventFrom
            eventTopicValues={eventTopicValues}
            eventTypeValues={eventTypeValues}
          />
        ) : (
          <SocialBusiness />
        )}
      </section>
    );
  }
}

EventFrom.propTypes = {
  eventTopicValues: PropTypes.array.isRequired,
  eventTypeValues: PropTypes.array.isRequired
};

export default CreatPostPage;
