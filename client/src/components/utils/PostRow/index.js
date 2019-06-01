import React from 'react';
import { Icon } from 'antd';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import './style.css'

export default function Post({ onClick, postTitle, id, type, category }) {

  function handleClick() {
    onClick(id);
  }

  return (
    <Router>
      <Link to={`/${type}/${category}${id}`}>
        <div className='post'>
          <p className='post--title'>
            {postTitle.length > 30 ? postTitle.substring(0, 31) : postTitle}
          </p>
          <div>
            <Icon
              id={id}
              onClick={handleClick}
              className='post--icon post--delete'
              type="delete"
            />
            <Link to={`/posts/${id}/edit`} >
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
