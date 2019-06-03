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
} from 'components/pages';
import { Header, Footer } from 'components/utils'
import "./App.css";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            component={Home}
          />
          <Route
            path='/signup'
            component={CreateProfile}
          />
          <Route
            path='/login'
            component={Login}
          />
          {/* <Route
          exact
          path='/profile/:id'
          component={Profile}
        /> */}
          <Route
            path='/posts/live'
            render={() => <Post postType='live' />}
          />
          <Route
            path='/posts/draft'
            render={() => <Post postType='draft' />}
          />
          <Route
            path='/posts/new'
            component={PostForm}
          />
          <Route
            path='/post/event/:category/:id'
            render={() => <Event postStatus='published' />}
          />
          <Route
            path='/post/public-service/:category/:id'
            render={() => <PublicService postStatus='published' />}
          />
          <Route
            path='/post/event/:category/:id/preview'
            render={() => <Event postStatus='published' />}
          />
          <Route
            path='/post/public-service/:category/:id/preview'
            render={() => <PublicService postStatus='published' />}
          />
          <Route
            path='/posts'
            component={Posts}
          />
          <Route
            path='/logout'
            component={<h1>Logout</h1>}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
      <Footer />
    </>
  )
}

export default App;
