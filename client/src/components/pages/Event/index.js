import React, { Component } from 'react'
import { Icon, Divider } from 'antd'
import PropTypes from 'prop-types';


import 'antd/dist/antd.css'

import eventInfo from './staticData'
import './style.css'

class Event extends Component {

  state = {
    event: {},
  }

  componentDidMount() {
    const { postStatus } = this.props
    if (postStatus === 'published') {
      // fetch
      this.setState({ event: eventInfo })
    }
    this.setState({ event: this.props })
  }

  render() {
    const { postStatus } = this.props;
    let eventData

    if (postStatus === 'published') {
      eventData = this.state.event
    } else {
      eventData = this.props
    }

    const { image, title, publishDate, publisher, type, topic, description, dateTime, venue, organiserWebsite, cost } = eventData
    const pargraphs = description ? description.split('\n') : null;

    return (
      <>
        {!title
          ? (<h1>Loading ...</h1>)
          : (
            <section className='event-container' >
              <img className='event-img' src={image} alt="Event image" />
              <h1 className='event-title' >{title}</h1>
              <div className='event-icon' >
                <div className='event-icon--col' >
                  <h5> <Icon type="calendar" style={{ fontSize: '12px', paddingRight: '5px' }} /> Posted on {publishDate}</h5>
                  <h5> <Icon type="folder" style={{ fontSize: '12px', paddingRight: '5px' }} /> Posted in Events</h5>
                </div>
                <div className='event-flex--col' >
                  <h5> <Icon type="user" style={{ fontSize: '12px', paddingRight: '5px' }} /> {publisher}</h5>
                  <h5> <Icon type="folder" style={{ fontSize: '12px', paddingRight: '5px' }} /> {type}</h5>
                </div>
              </div>
              <Divider />
              <div className='event-body' >
                <h3 className='event--lable'>Event Type</h3>
                <span>{type}</span>
                <Divider />
                <h3 className='event--lable'>Event Topic</h3>
                <span>{topic.map((tag, index) => {
                  return (
                    <span key={index}>{tag} </span>
                  )
                })}</span>
                <Divider />
                <h3 className='event--lable'>Event Description</h3>
                <span> {pargraphs.map((paragraph, index) => {
                  return <p key={index} className='public-service--paragraph'>{paragraph}</p>
                })}</span>
                <Divider />
                <h3 className='event-lable'>Event Date & Time</h3>
                <span>{dateTime}</span>
                <Divider />
                <h3 className='event--lable'>Event Venue</h3>
                <span>{venue}</span>
                <Divider />
                <h3 className='event--lable'>Organizer Website</h3>
                <span><a href={organiserWebsite} style={{ color: '#e85f5f' }} >{organiserWebsite}</a></span>
                <Divider />
                <h3 className='event--lable'>Cost</h3>
                <span><Icon type="euro" style={{ paddingRight: '5px' }} />{cost}</span>
              </div>
            </section>
          )}
      </>
    )
  }
}

Event.propTypes = {
  postStatus: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  publishDate: PropTypes.string,
  publisher: PropTypes.string,
  type: PropTypes.string,
  topic: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  dateTime: PropTypes.string,
  venue: PropTypes.string,
  organizationWebsite: PropTypes.string,
  cost: PropTypes.number,
}

export default Event
