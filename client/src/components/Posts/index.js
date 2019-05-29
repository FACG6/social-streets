import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Icon } from 'antd';
import Post from './post';
import './style.css';

export default function Posts() {
  return (
    <Router>
      <section className='posts'>
        <Link to='/posts/new'>
          <button className='posts--button posts--button-pink'>
            <Icon className='posts--icon posts--plus-icon' type='plus' />
            New Post
          </button>
        </Link>
        <div className='posts--post-types'>
          <Link to='/posts/live'>
            <Post post='Live Post' />
          </Link>
        <Link to='/posts/draft'>
            <Post post='Draft Post' />
        </Link>
        </div>
      </section>
    </Router >
  )
}
