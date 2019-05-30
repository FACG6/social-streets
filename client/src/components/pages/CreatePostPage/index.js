import React from "react";
import { Divider, Select } from "antd";

import WrappedEventForm from "components/pages/CreatePostPage/Event";
import WrappedPublicServices from "components/pages/CreatePostPage/PublicServices";
import {
  eventTypeValues,
  eventTopicValues,
  primaryTag,
  secondaryTag
} from "./dumyData";
import "./style.css";

const { Option } = Select;

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

  handlePostTypeChange = e => this.setState({ postType: e });

  render() {
    const postTypes = [
      { key: 1, value: "Event" },
      { key: 2, value: "Public Services" }
    ];

    const {
      postType,
      eventTypeValues,
      eventTopicValues,
      primaryTag
    } = this.state;

    return (
      <section className="create-post-page-main">
        <h1 style={{ margin: 0 }}>Publish New Post</h1>
        <Divider style={{ margin: "0 0 30px 0" }} />
        <h4>Post Type</h4>
        <Select
          defaultValue="Event"
          placeholder="Event’s Title"
          onChange={this.handlePostTypeChange}
          size="large"
        >
          {postTypes.map(({ key, value }) => (
            <Option key={key} value={value}>
              {value}
            </Option>
          ))}
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

export default CreatPostPage;
