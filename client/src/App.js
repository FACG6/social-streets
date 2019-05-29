import React from "react";
import "./App.css";
import Posts from './components/Posts'

function App() {
  return (
    <div className='app'>
    <div style={{background:'black', height: '115px'}}>Header</div>
    <Posts />
    <div style={{ background: 'black', height: '70px' }}>Header</div>

    </div>
  );
}

export default App;
