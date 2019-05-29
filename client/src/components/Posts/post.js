import React from 'react';
import { Icon } from 'antd';

export default function Post({ post }) {
  return (
    <button className='posts--button posts--button-white'>
      <Icon className='posts--icon posts--form-icon' type='form' />
      {post}
    </button>
  )
}