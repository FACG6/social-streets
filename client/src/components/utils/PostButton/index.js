import React from 'react';
import { Icon } from 'antd';
import './style.css';

export default function PostButton({ postType, className }) {
  return (
    <button className={`${className} posts--button posts--button-white`}>
      <Icon className='posts--icon posts--form-icon' type='form' />
      {postType}
    </button>
  )
}

