import React from "react";
import { Divider, Select, notification } from "antd";
import axios from 'axios';

import WrappedEventForm from "components/pages/PostForm/Event";
import WrappedPublicServices from "components/pages/PostForm/PublicServices";
// import {
//   eventTypeValues,
//   eventTopicValues,
//   primaryTag,
//   secondaryTag
// } from "./dumyData";

import "./style.css";

const { Option } = Select;

class CreatPostPage extends React.Component {
  state = {
    postType: this.props.postFormType || "Event",
    eventTypeValues: [],
    eventTopicValues: [],
    primaryTag: [],
    secondaryTag: []
  };

  async componentDidMount() {
    try {
      const eventRespons = await axios.get('/api/v1/post/event/static')
      const PublicServicesResponse = await axios.get('/api/v1/post/public-service/static')
      const { categories, topics } = eventRespons.data.data
      const { primaryTags, secondaryTags } = PublicServicesResponse.data.data
      await this.setState({
        eventTypeValues: categories,
        eventTopicValues: topics,
        primaryTag: primaryTags,
        secondaryTag: secondaryTags
      })
    } catch (err) {
      notification.error({
        message: "Error",
        description: "There is an error try again"
      })
    }
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
      primaryTag,
      secondaryTag
    } = this.state;

    const { id } = this.props;

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
        {postType === "Event" ? (
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
              secondaryTags={secondaryTag}
            />
          )}
      </section>
    );
  }
}

export default CreatPostPage;
