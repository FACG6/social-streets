import React from 'react'
import { EventType, EventTopics, PublicPrimaryTags, PublicSecondaryTags } from './QWE'
import './style.css'

export default function Tags() {
  return (
    <div>
      <div>
      <EventTopics />
      <EventType />

      </div>
      <div className=''>
      <PublicPrimaryTags />
      <PublicSecondaryTags />
      </div>
    </div>
  )
}
