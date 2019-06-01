import React from 'react'
import { Icon } from 'antd'

import 'antd/dist/antd.css'

import eventInfo from './staticData'
import './style.css'

function renderInfo(props) {
  const keys = Object.keys(props);
  const elements = keys.map((element, index) => {
    if (element === 'title' || element === 'image' || element === 'publishDate' || element === 'publisher') return null
    return (
      <section key={index} className={'event' + element}>
        {element === 'description' ? (
          <>
            <h2>Event {element.charAt(0).toUpperCase() + element.slice(1)}</h2>
            <p>{props[element]}</p>
          </>
        )
          : (element === 'organiserWebsite' ? (
            <>
              <h2>{element.charAt(0).toUpperCase() + element.slice(1)}</h2>
              <h5><a href={props[element]}>{props[element]}</a></h5>
            </>
          ) : (element === 'cost' ? (
            <>
              <h2>{element.charAt(0).toUpperCase() + element.slice(1)}</h2>
              <h5><Icon type="euro" /> {props[element]}</h5>
            </>
          ) : (
              <>
                <h2>Event {element.charAt(0).toUpperCase() + element.slice(1)}</h2>
                <h6>{props[element]}</h6>
              </>
            )
            ))
        }
        <hr />
      </section >
    )
  })
  return elements
}

export default function Event(props) {
  const { image, title, publishDate, publisher, type } = eventInfo
  return (
    <div className='event-container'>
      <section>
        <img className='event-img' src={image} alt="Event image" />
        <h1>{title}</h1>
      </section>
      <section className='event-flex'>
        <div className='event-flex--div' >
          <h5> <Icon type="calendar" style={{ fontSize: '20px' }} /> Posted on {publishDate}</h5>
          <h5> <Icon type="folder" style={{ fontSize: '20px' }} /> Posted in Events</h5>
        </div>
        <div className='event-flex--div' >
          <h5> <Icon type="user" style={{ fontSize: '20px' }} /> {publisher}</h5>
          <h5> <Icon type="folder" style={{ fontSize: '20px' }} /> {type}</h5>
        </div>
      </section>
      {renderInfo(eventInfo)}
    </div>
  )
}
