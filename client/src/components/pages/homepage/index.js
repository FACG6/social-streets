import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import Button from 'components/utils/Button'
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
            <Button onClick={() => undefined} className='home--button' children='Login' />
          </Link>
          <Link to='/signup'>
            <Button onClick={() => undefined} className='home--button' children='Create Profile' />
          </Link>
        </Router>
      </div>
    </section>
  )
}

export default Home;
