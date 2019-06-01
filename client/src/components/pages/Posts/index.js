import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Icon } from 'antd';
import Button from 'components/utils/Button'
import PostButton from 'components/utils/PostButton';
import './style.css';

export default function Posts() {
  return (
    <Router>
      <section className='posts-page-main'>
        <Link to='/posts/new'>
          <Button
            onClick={() => undefined}
            className='posts--button'
          >
            <Icon className='posts--icon posts--plus-icon' type='plus' />
            New Post
          </Button>
        </Link>
        <div className='posts--post-types'>
          <PostButton path='/posts/live' postType='Live Post' />
          <PostButton path='/posts/draft' postType='Draft Post' />
        </div>
      </section>
    </Router >
  )
}

