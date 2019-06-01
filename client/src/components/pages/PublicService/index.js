import React, { Component } from 'react';
import { Icon } from 'antd';

import './style.css';


export default class PublicService extends Component {
  state = {
    publicService: {},
  }
  render() {
    const {
      image,
      title,
      publishDate,
      publisher,
      primaryTag,
      contentType,
      description,
      organizerWebsite,
      linkTitle,
      linkDescription,
      link,
      linkImg,
      secondaryTags,
    } = this.props.publicService;

    const pargraphs = description.split('\n');

    return (
      <section className='public-service-page--main'>
        <img className='public-service--thumbnail-img' src={image} alt={title}></img>
        <h1 className='public-service--title'>{title}</h1>
        <div className='entry-meta-container'>
          <div className='entry-meta-container--item'>
            <Icon type='calendar' className='entry-meta-container--icon' />
            <span className='entry-meta-container--meta'>{publishDate}</span>
          </div>
          <div className='entry-meta-container--item'>
            <Icon type='user' className='entry-meta-container--icon' />
            <span className='entry-meta-container--meta'>{publisher}</span>
          </div>
          <div className='entry-meta-container--item'>
            <Icon type='tags' className='entry-meta-container--icon' />
            <span className='entry-meta-container--meta'>{primaryTag}</span>
          </div>
          <div className='entry-meta-container--item'>
            <Icon type='form' className='entry-meta-container--icon' />
            <span className='entry-meta-container--meta'>{contentType}</span>
          </div>
        </div>
        <div className='public-service--content'>
          {pargraphs.map((paragraph, index) => {
            return <p key={index} className='public-service--paragraph'>{paragraph}</p>
          })}
        </div>
        <div className='public-service--organizer'>
          <span className='public-service--label'>Organizer Website</span>
          <span className='public-service--website'>{organizerWebsite}</span>
        </div>
        <div className='public-service--tags-container'>
          <span className='public-service--label'>Tags</span>
          <div className='public-service--tags'>
            <span className='public-service--tag'>{primaryTag}</span>
            {secondaryTags.map(tag => <span className='public-service--tag'>{tag}</span>)}
          </div>
        </div>
        <div className='public-service--thumbnail-container'>
          <span className='public-service--label public-service--label--link'>Link</span>
          <div className='public-service--thumbnail-link'>
            <img className='thumbnail-link--image' src={linkImg} alt='link Title'></img>
            <h1 className='thumbnail-link--title'>{linkTitle}</h1>
            <a href={link} className='thumbnail-link--link'>{link}</a>
            <p className='thumbnail-link--description'>{linkDescription}</p>
          </div>
        </div>
      </section>
    )
  }
}