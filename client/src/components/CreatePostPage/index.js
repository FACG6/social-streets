import React from "react";
import Event from "./Event";
import SocialBusiness from "./SocialBusiness";
import "./style.css";
import { Select } from "antd";

const { Option } = Select;

class CreatPostPage extends React.Component {
  state = {
    postType: "Event"
  };
  handlePostType = e => {
    this.setState({ postType: e });
  };
  render() {
    const { postType } = this.state;
    return (
      <section className="main">
        <Select
          defaultValue="Event"
          onChange={this.handlePostType}
          style={{ width: "100%" }}
        >
          <Option value="Event">Event</Option>
          <Option value="Social Business">Social Business</Option>
        </Select>
        {postType === "Event" ? <Event /> : <SocialBusiness />}
      </section>
    );
  }
}

export default CreatPostPage;
