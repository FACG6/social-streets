import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css';

import {
  Home,
  Login,
  CreateProfile,
  Posts,
  Post,
  PostForm,
  PublicService,
  PageNotFound,
  Event,
  Profile,
} from 'components/pages';
import { Header, Footer } from 'components/utils'
import "./App.css";
import { Header, Footer } from "components/utils";
import { Event } from "components/pages";

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
