import React from 'react';
import { Icon } from 'antd';
import { Link, BrowserRouter as Router } from 'react-router-dom';
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
            <button className='posts--button posts--button-white'>
              <Icon className='posts--icon posts--form-icon' type='form' />
              Live Posts
        </button>
          </Link>
          <Link to='/posts/draft'>
            <button className='posts--button posts--button-white'>
              <Icon className='posts--icon posts--form-icon' type='form' />
              Draft Posts
        </button>
          </Link>
        </div>
      </section>
    </Router>
  )
}
