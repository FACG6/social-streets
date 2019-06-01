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
      <div className='post'>
        <Link to={`/${type}/${category}/${id}`}>
          <p className='post--title'>
            {postTitle}
          </p>
        </Link>
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
    </Router>
  )
}
