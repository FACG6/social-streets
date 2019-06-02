import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import post from './dummyData'
import './style.css';

export default class PublicService extends Component {
  state = {
    publicService: {},
  }

  componentDidMount() {
    const { postStatus, ...publicService } = this.props;
    if (postStatus === 'published') {
      //fetch the public-service post//
      this.setState({ publicService: post });
    } else {
      this.setState({ ...publicService })
    }
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
    } = this.state;

    const pargraphs = description ? description.split('\n') : null;

    return (
      <section className='public-service-page--main'>
        {title ?
          <>
            <img className='public-service--thumbnail-img' src={image} alt={title}></img>
            <h1 className='public-service--title'>{title}</h1>
            <div className='post-header--container'>
              <div className='post-header--column'>
                <div className='post-header--item'>
                  <Icon type='calendar' className='post-header--icon' />
                  <span className='post-header--meta'>{publishDate}</span>
                </div>
                <div className='post-header--item'>
                  <Icon type='tags' className='post-header--icon' />
                  <span className='post-header--meta'>{primaryTag}</span>
                </div>
              </div>
              <div className='post-header--column'>
                <div className='post-header--item'>
                  <Icon type='user' className='post-header--icon' />
                  <span className='post-header--meta'>{publisher}</span>
                </div>
                <div className='post-header--item'>
                  <Icon type='form' className='post-header--icon' />
                  <span className='post-header--meta'>{contentType}</span>
                </div>
              </div>
            </div>
            <div className='public-service--content'>
              {pargraphs.map((paragraph, index) => {
                return <p key={index} className='public-service--paragraph'>{paragraph}</p>
              })}
            </div>
            <div className='public-service--organizer'>
              <h3 className='public-service--label'>Organizer Website</h3>
              <span className='public-service--website'>{organizerWebsite}</span>
            </div>
            <div className='public-service--tags-container'>
              <h3 className='public-service--label'>Tags</h3>
              <div className='public-service--tags'>
                <span className='public-service--tag'>{primaryTag}</span>
                {secondaryTags.map((tag, index) => <span key={index} className='public-service--tag'>{tag}</span>)}
              </div>
            </div>
            <div className='public-service--link-preview-container'>
              <h3 className='public-service--label public-service--label--link'>Link</h3>
              <div className='public-service--link-preview'>
                <img className='link-preview--image' src={linkImg} alt='link Title'></img>
                <h2 className='link-preview--title'>{linkTitle}</h2>
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

PublicService.propTypes = {
  postStatus: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  publishDate: PropTypes.string,
  publisher: PropTypes.string,
  primaryTag: PropTypes.string,
  contentType: PropTypes.string,
  description: PropTypes.string,
  organizerWebsite: PropTypes.string,
  linkTitle: PropTypes.string,
  linkDescription: PropTypes.string,
  link: PropTypes.string,
  linkImg: PropTypes.string,
  secondaryTags: PropTypes.arrayOf(PropTypes.string),
}
