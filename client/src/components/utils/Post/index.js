import React from 'react';
import { Icon } from 'antd';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import './style.css'

export default function Post({ onClick, postTitle, id, postType }) {
  return (
    <Router>
      <Link to={`/post/${id}`}>
        <div className='post'>
          <p className='post--title'>
            {postTitle.length > 30 ? postTitle.substring(0, 31) : postTitle}
          </p>
          <div>
            <Icon
              id={id}
              onClick={() => onClick(id)}
              className='post--icon post--delete'
              type="delete"
            />
            <Link to={`/posts/${postType}/${id}/edit`} >
              <Icon
                className='post--icon post--edit'
                type="edit"
              />
            </Link>
          </div>
        </div>
      </Link>
    </Router>
  )
}