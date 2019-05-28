import React from 'react';
import { Button } from 'antd';
import './style.css';

function Home() {
  return (
    <section className='home'>
      <h1 className='home--heading'>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      </h1>
      <div className='home--buttons-container'>
        <Button type='primary' block className='home--button'>Login</Button>
        <Button type='primary' block className='home--button'>Create Profile</Button>
      </div>
    </section>
  )
}

export default Home;