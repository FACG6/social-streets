import React from "react";
import { Divider, Select } from "antd";

import WrappedEventForm from "components/pages/PostForm/Event";
import WrappedPublicServices from "components/pages/PostForm/PublicServices";
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
    postType: this.props.postFormType || "event",
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
      { key: 1, value: "event" },
      { key: 2, value: "public pervices" }
    ];

    const {
      postType,
      eventTypeValues,
      eventTopicValues,
      primaryTag
    } = this.state;

    const { id } = this.props.match.params;

    return (
      <section className="create-post-page-main">
        <h1 style={{ margin: 0 }}>Publish New Post</h1>
        <Divider style={{ margin: "0 0 30px 0" }} />
        <h4>Post Type</h4>
        <Select
          defaultValue={postType}
          placeholder="Post Type"
          onChange={this.handlePostTypeChange}
          size="large"
          disabled={id ? true : false}
        >
          {postTypes.map(({ key, value }) => (
            <Option key={key} value={value}>
              {value}
            </Option>
          ))}
        </Select>
        <Divider style={{ margin: "20px 0" }} />
        {postType === "event" ? (
          <WrappedEventForm
            id={id}
            postType={postType}
            eventTopicValues={eventTopicValues}
            eventTypeValues={eventTypeValues}
          />
        ) : (
          <WrappedPublicServices
            id={id}
            postType={postType}
            primaryTag={primaryTag}
            secondaryTag={secondaryTag}
          />
        )}
      </section>
    );
  }
}

export default CreatPostPage;
