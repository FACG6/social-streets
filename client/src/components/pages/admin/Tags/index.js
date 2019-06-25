import React, { Component } from "react";
import { Divider } from "antd";
import axios from "axios";
import { Loading } from "components/pages";
import { notification } from "antd";

import AddTagSection from "./tagsSection";
import "./style.css";

export default class TagsPage extends Component {
  state = {
    topics: [],
    categories: [],
    primaryTags: [],
    secondaryTags: [],
    isLoading: true
  };

  async componentDidMount() {
    try {
      const eventStaticRes = await axios.get("/api/v1/post/event/static");
      const publicServiceStaticRes = await axios.get(
        "/api/v1/post/public-service/static"
      );
      const topics = eventStaticRes.data.data.topics.map(
        element => element.topic
      );
      const categories = eventStaticRes.data.data.categories.map(
        element => element.category
      );
      const primaryTags = publicServiceStaticRes.data.data.primaryTags.map(
        element => element.tag
      );
      const secondaryTags = publicServiceStaticRes.data.data.secondaryTags.map(
        element => element.tag
      );
      await this.setState({
        categories,
        topics,
        primaryTags,
        secondaryTags,
        isLoading: false
      });
    } catch (e) {
      notification.error({
        message: "Sorry, There is an error",
        description: "check your network"
      });
      this.props.history.push("/admin/accounts");
    }
  }

  handleUpdateTopics = topics => this.setState({ topics });
  handleUpdateCategories = categories => this.setState({ categories });
  handleUpdatePrimaryTags = primaryTags => this.setState({ primaryTags });
  handleUpdateSecondaryTags = secondaryTags => this.setState({ secondaryTags });

  render() {
    const { topics, categories, primaryTags, secondaryTags } = this.state;
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="tagsContainer">
        <div className="addTag">
          <h1 className="tagContainerText">Event Topics</h1>
          <AddTagSection
            tags={topics}
            handleUpdateTags={this.handleUpdateTopics}
            axiosRoute="/event/topic"
            addNewMessage="New Topic"
            deleteSucessMessage="Topic was deleted"
            addSuccessMessage="Topic was added"
          />
          <Divider />
        </div>
        <div className="addTag">
          <h1 className="tagContainerText">Event Categories</h1>
          <AddTagSection
            tags={categories}
            handleUpdateTags={this.handleUpdateCategories}
            axiosRoute="/event/category"
            addNewMessage="New Category"
            deleteSucessMessage="Category was deleted"
            addSuccessMessage="Category was added"
          />
        </div>
        <Divider />
        <div className="addTag">
          <h1 className="tagContainerText">Public service Primary Tags</h1>
          <AddTagSection
            tags={primaryTags}
            handleUpdateTags={this.handleUpdatePrimaryTags}
            axiosRoute="/public-service/primary-tag"
            addNewMessage="New Primary Tag"
            deleteSucessMessage="Primary Tag was deleted"
            addSuccessMessage="Primary Tag was added"
          />
        </div>
        <Divider />
        <div className="addTag">
          <h1 className="tagContainerText">Public service Secundary Tags</h1>
          <AddTagSection
            tags={secondaryTags}
            handleUpdateTags={this.handleUpdateSecondaryTags}
            axiosRoute="/public-service/secondary-tag"
            addNewMessage="New Secondary Tag"
            deleteSucessMessage="Secondary Tag was deleted"
            addSuccessMessage="Secondary Tag was added"
          />
        </div>
      </div>
    );
  }
}
