import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css';

import { Header, Footer } from 'components/utils'
import { Event } from "components/pages";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Event />
      </main>
      <Footer />
    </Router>
  )
}

export default App;
