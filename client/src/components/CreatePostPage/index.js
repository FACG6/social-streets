import React from "react";
import EventFrom from "./Event";
import SocialBusiness from "./SocialBusiness";
import "./style.css";
import { Divider } from "antd";
import { SelectMenu } from "./helper";
import { postTypeValues, eventTypeValues, eventTopicValues } from "./dumyData";

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
        <SelectMenu
          defaultValue="Event"
          onChange={this.handlePostTypeChange}
          className="main--postType"
          options={postTypeValues}
          value={postType}
        />
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

export default CreatPostPage;
