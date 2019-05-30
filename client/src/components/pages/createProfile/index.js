import React, { Component } from 'react'
import { Steps } from 'antd';

import './style.css'

const { Step } = Steps;

export default class Profile extends Component {
  state = {
    personal: {},
    current: 0,
  }
  render() {
    const { current } = this.state
    return (
      <div>
        <div className='create-profile--header'>
          <h1>Create New Profile</h1>
          { current === 0 ? <p>Complete this step to provide us with some personal information</p> : <p>Complete this step to provide us with some information about your organization</p> }
        </div>
        <Steps size="small" current={current} labelPlacement='vertical'>
          <Step title="Personal" />
          <Step title="Busniss" />
        </Steps>
      
      </div>
    )
  }
}
