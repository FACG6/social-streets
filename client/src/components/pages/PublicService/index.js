import React, { Component } from 'react';
import { Icon } from 'antd';
import publicService from './dummyData'

import './style.css';


export default class PublicService extends Component {
  state = {
    publicService: {},
  }
  componentDidMount() {
    if (this.props.postStatus === 'published') {
      //fetch the public-service post//
      this.setState({ publicService });
    }
  }
  render() {
    let post = this.props.publicService;
    if (this.props.postStatus === 'published') {
      post = this.state.publicService;
    }
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
    } = post;

    const pargraphs = description ? description.split('\n') : null;

    return (
      <section className='public-service-page--main'>
        {post.title ?
          <>
            <img className='public-service--thumbnail-img' src={image} alt={title}></img>
            <h1 className='public-service--title'>{title}</h1>
            <div className='post-header'>
              <div className='mpost-header--item'>
                <Icon type='calendar' className='post-header--icon' />
                <span className='post-header--meta'>{publishDate}</span>
              </div>
              <div className='post-header--item'>
                <Icon type='user' className='post-header--icon' />
                <span className='post-header--meta'>{publisher}</span>
              </div>
              <div className='post-header--item'>
                <Icon type='tags' className='post-header--icon' />
                <span className='post-header--meta'>{primaryTag}</span>
              </div>
              <div className='post-header--item'>
                <Icon type='form' className='post-header--icon' />
                <span className='post-header--meta'>{contentType}</span>
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
                {secondaryTags.map((tag, index) => <span key={index} className='public-service--tag'>{tag}</span>)}
              </div>
            </div>
            <div className='public-service--link-preview-container'>
              <span className='public-service--label public-service--label--link'>Link</span>
              <div className='public-service--link-preview'>
                <img className='link-preview--image' src={linkImg} alt='link Title'></img>
                <h1 className='link-preview--title'>{linkTitle}</h1>
                <a href={link} className='link-preview--link'>{link}</a>
                <p className='link-preview--description'>{linkDescription}</p>
              </div>
            </div>
          </> : <span>...Loading</span>
        }
      </section>
    )
  }
}