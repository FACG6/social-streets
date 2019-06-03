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
} from 'components/pages/index';
import { Header, Footer } from 'components/utils/index'
import "./App.css";

function App() {
  return <>
    <Header />
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          component={Home}
        />
        <Route
          exact
          path='/signup'
          component={CreateProfile}
        />
        <Route
          exact
          path='/login'
          component={Login}
        />
        {/* <Route
          exact
          path='/profile/:id'
          component={Profile}
        /> */}
        <Route
          exact
          path='/posts'
          component={Posts}
        />
        <Route
          exact
          path='/posts/live'
          render={() => <Post postType='live' />}
        />
        <Route
          exact
          path='/posts/draft'
          render={() => <Post postType='draft' />}
        />
        <Route
          exact
          path='/posts/new'
          component={PostForm}
        />
        <Route
          exact
          path='/post/event/:category/:id'
          render={() => <Event postStatus='published' />}
        />
        <Route
          exact
          path='/post/public-service/:category/:id'
          render={() => <PublicService postStatus='published' />}
        />
        <Route
          exact
          path='/post/event/:category/:id/preview'
          render={() => <Event postStatus='published' />}
        />
        <Route
          exact
          path='/post/public-service/:category/:id/preview'
          render={() => <PublicService postStatus='published' />}
        />
        <Route
          exact
          path='/logout'
          component={<h1>Logout</h1>}
        />
        <Route compoennt={PageNotFound} />

      </Switch>
    </Router>

    <Footer />
  </>;
}

export default App;
