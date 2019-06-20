import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

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
  Profile
} from "components/pages";
import { Header, Footer } from "components/utils";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={CreateProfile} />
          <Route path="/login" component={Login} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route
            path="/posts/live"
            render={props => <Post {...props} postType="live" />}
          />
          <Route
            path="/posts/draft"
            render={props => <Post {...props} postType="draft" />}
          />
          <Route path="/posts/new" component={PostForm} />
          <Route
            exact
            path="/post/public-service/:id/edit"
            render={props => (
              <PostForm postFormType="public service" {...props} />
            )}
          />
          <Route
            exact
            path="/post/event/:id/edit"
            render={props => <PostForm postFormType="event" {...props} />}
          />
          <Route
            path="/post/event/:category/:id"
            render={props => <Event {...props} />}
          />
          <Route
            path="/post/public-service/:category/:id"
            render={props => <PublicService {...props} />}
          />
          <Route path="/posts" component={Posts} />
          <Route path="/logout" render={() => <h1>Logout</h1>} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
