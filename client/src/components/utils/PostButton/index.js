import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Icon } from 'antd';

import './style.css';

export default function Post({ postType, path }) {
  return (
    <Router>
      <Link to={path}>
        <button className='posts--button-white'>
          <Icon className='posts--icon posts--form-icon' type='form' />
          {postType}
        </button>
      </Link>
    </Router>
  )
}
