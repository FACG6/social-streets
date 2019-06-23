import React from 'react';
import { Popconfirm, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.css'

export default function Post({ onClick, title, id, type, link }) {


  return (
    <div className='post-row-container'>
      <Link className='post-row-container--link' to={`/${type}/${link}/${id}`}>
        <p className='post-row-container--title'>
          {title}
        </p>
      </Link>
      <div className='post-row-container--icons'>
        <Popconfirm
          title="Are you sure？"
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
          onConfirm={() => onClick(id, type)}
        >
          <Icon
            className='post-row-container--icon post-row-container--delete'
            type="delete"
          />
        </Popconfirm>
        <Link to={`/posts/${id}/edit`} >
          <Icon
            className='post-row-container--icon post-row-container--edit'
            type="edit"
          />
        </Link>
      </div>
    </div>
  )
}
