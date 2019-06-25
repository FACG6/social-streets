import React from 'react'
import { Divider } from 'antd'

import { EventType, EventTopics, PublicPrimaryTags, PublicSecondaryTags } from './addTags'
import './style.css'

export default function Tags() {
  return (
    <div className='tagsContainer'>
      <div className='addTag'>
      <h1 className='a'>Event Topics</h1>
      <EventTopics />
      <Divider />
      </div>
      <div className='addTag'>
      <h1>Event Categories</h1>
      <EventType />
      </div>
      <Divider />
      <div className='addTag'>
      <h1>Public service Primary Tags</h1>
      <PublicPrimaryTags />
      </div>
      <Divider />
      <div className='addTag'> 
      <h1>Public service Secundary Tags</h1>
      <PublicSecondaryTags />
      </div>
    </div>
  )
}
