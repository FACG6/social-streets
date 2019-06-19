import React, { Component } from "react";
import { Icon, Divider, Spin, notification } from "antd";
import PropTypes from "prop-types";

import Button from "components/utils/Button";
import "./style.css";
import axios from "axios";

class Event extends Component {
  state = {};

  handleBack = e => {
    e.preventDefault();
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    // fetch
    axios
      .get(`/api/v1/post/${id}`, {
        params: {
          postType: "event"
        }
      })
      .then(res => {
        res.data.data[0].topic = res.data.data.map(res => res.topic);
        this.setState({ ...res.data.data[0] });
      })
      .catch(err => {
        const { statusCode, error } = err.response.data;
        const errObj = {
          message: "Error",
          description: "There is Error please try again"
        };
        if (statusCode === 500) {
          errObj.message = "Server Error";
          errObj.description = "Internal Server Error, Please try again later";
        } else if (statusCode === 400) {
          errObj.message = "Validation Error";
          errObj.description = error;
        }
        notification.error(errObj);
      });
  }

  render() {
    const {
      image,
      title,
      publish_datetime,
      organisation_name,
      category,
      topic,
      description,
      event_datetime,
      venue,
      website,
      cost,
      alt_text
    } = this.state;
    const pargraphs = description ? description.split("\n") : null;

    return (
      <>
        {!title ? (
          <Spin
            className="event-spin"
            tip="Loading..."
            size="large"
            indicator={<Icon type="loading" style={{ fontSize: 50 }} spin />}
          />
        ) : (
          <section className="event-container">
            <img className="event-img" src={image} alt={alt_text} />
            <h1 className="event-title">{title}</h1>
            <div className="event-icon">
              <div className="event-icon--col">
                <h5>
                  <Icon
                    type="calendar"
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  Posted on {publish_datetime}
                </h5>
                <h5>
                  <Icon
                    type="folder"
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  {category}
                </h5>
              </div>
              <div className="event-flex--col">
                <h5>
                  <Icon
                    type="user"
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  {organisation_name}
                </h5>
                <h5>
                  <Icon
                    type="folder"
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  Event
                </h5>
              </div>
            </div>
            <Divider />
            <div className="event-body">
              <h3 className="event--lable">Event Type</h3>
              <span>{category}</span>
              <Divider />
              <h3 className="event--lable">Event Topic</h3>
              <span>
                {topic.map((tag, index) => {
                  return <span key={index}>{tag} </span>;
                })}
              </span>
              <Divider />
              <h3 className="event--lable">Event Description</h3>
              <span>
                {pargraphs.map((paragraph, index) => {
                  return (
                    <p key={index} className="public-service--paragraph">
                      {paragraph}
                    </p>
                  );
                })}
              </span>
              <Divider />
              <h3 className="event-lable">Event Date & Time</h3>
              <span>{event_datetime}</span>
              <Divider />
              <h3 className="event--lable">Event Venue</h3>
              <span>{venue}</span>
              <Divider />
              <h3 className="event--lable">Organizer Website</h3>
              <span>
                <a href={website} style={{ color: "#e85f5f" }}>
                  {website}
                </a>
              </span>
              <Divider />
              <h3 className="event--lable">Cost</h3>
              <span style={{ paddingBottom: "1rem" }}>
                <Icon type="euro" />
                {cost}
              </span>
            </div>
            <Button
              onClick={() => this.props.history.push("/posts")}
              className="event-btn--back"
            >
              Back
            </Button>
          </section>
        )}
      </>
    );
  }
}

Event.propTypes = {
  id: PropTypes.number
};

export default Event;
