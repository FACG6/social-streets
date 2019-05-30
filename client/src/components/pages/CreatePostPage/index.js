import React from "react";
import { Divider, Select } from "antd";
import PropTypes from "prop-types";

import { Options } from "components/utils";
import WrappedEventForm from "components/pages/CreatePostPage/Event";
import WrappedPublicServices from "components/pages/CreatePostPage/PublicServices";
import {
  eventTypeValues,
  eventTopicValues,
  primaryTag,
  secondaryTag
} from "./dumyData";
import "./style.css";

class CreatPostPage extends React.Component {
  state = {
    postType: "Event",
    eventTypeValues: [],
    eventTopicValues: [],
    primaryTag: [],
    secondaryTag: []
  };
  componentDidMount() {
    this.setState({
      eventTypeValues: eventTypeValues,
      eventTopicValues: eventTopicValues,
      primaryTag: primaryTag,
      secondaryTag: secondaryTag
    });
  }
  handlePostTypeChange = e => {
    this.setState({ postType: e });
  };
  render() {
    const postTypes = [
      {
        key: 1,
        value: "Event"
      },
      {
        key: 2,
        value: "Social Business"
      }
    ];
    const {
      postType,
      eventTypeValues,
      eventTopicValues,
      primaryTag
    } = this.state;
    return (
      <section className="main">
        <h1 style={{ margin: 0 }}>Publish New Post</h1>
        <Divider style={{ margin: "0 0 30px 0" }} />
        <h4>Post Type</h4>
        <Select
          defaultValue="Event"
          placeholder="Event’s Title"
          onChange={this.handlePostTypeChange}
          size="large"
        >
          {Options(postTypes)}
        </Select>
        <Divider style={{ margin: "20px 0" }} />
        {postType === "Event" ? (
          <WrappedEventForm
            eventTopicValues={eventTopicValues}
            eventTypeValues={eventTypeValues}
          />
        ) : (
          <WrappedPublicServices
            primaryTag={primaryTag}
            secondaryTag={secondaryTag}
          />
        )}
      </section>
    );
  }
}

WrappedEventForm.propTypes = {
  eventTopicValues: PropTypes.array.isRequired,
  eventTypeValues: PropTypes.array.isRequired
};

WrappedPublicServices.propTypes = {
  primaryTag: PropTypes.array.isRequired,
  secondaryTag: PropTypes.array.isRequired
};

export default CreatPostPage;
