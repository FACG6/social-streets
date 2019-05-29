import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.css';

function Home() {
  return (
    <section className='home'>
      <p className='home--desc'>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Aenean commodo
      </p>
      <div className='home--register'>
        <Router>
          <Link to='/login'>
            <button className='home--button'>Login</button>
          </Link>
          <Link to='/signup'>
            <button className='home--button'>Create Profile</button>
          </Link>
        </Router>
      </div>
    </section>
  )
}

export default Home;
