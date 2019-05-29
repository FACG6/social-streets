import React from 'react';
import { Icon } from 'antd';
import './style.css';

export default function Post({ postType }) {
  return (
    <button className='posts--button posts--button-white'>
      <Icon className='posts--icon posts--form-icon' type='form' />
      {postType}
    </button>
  )
}
