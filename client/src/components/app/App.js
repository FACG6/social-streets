import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { notification } from "antd";
import axios from "axios";

import {
  Home,
  Loading,
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
import ProtectedRoute from "./../auth/protectedRoute";
import "./App.css";

class App extends Component {
  state = { user: {}, isAuth: false, isLoading: true };

  componentDidMount = async () => {
    try {
      const user = (await axios.get("/api/v1/isAuth")).data;
      notification.success({ message: "Welcome Back" });
      this.setState({ isAuth: true, user, isLoading: false });
    } catch (e) {
      if (e.response.status !== 401)
        notification.error({
          message: "Sorry There is an error"
        });
      this.setState({ isLoading: false });
    }
  };

  handleLogin = () => this.setState({ isAuth: true });

  handleLogout = async () => {
    this.setState({ isAuth: false, isLoading: true });
    try {
      await axios.get("/api/v1/logout");
      this.setState({ isLoading: false, user: {} });
    } catch (e) {
      window.location.href = "/posts";
    }
  };

  render() {
    const { isAuth, isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Router>
        <Header />
        <main className="container">
          <Switch>
            <Route
              path="/logout"
              component={() => {
                this.handleLogout();
                return <Redirect to="/login" />;
              }}
            />
            <ProtectedRoute
              exact
              path="/profile"
              isAuth={isAuth}
              component={Profile}
            />
            <ProtectedRoute
              path="/posts/live"
              isAuth={isAuth}
              render={props => <Post {...props} postType="live" />}
            />
            <ProtectedRoute
              path="/posts/draft"
              render={props => (
                <Post {...props} isAuth={isAuth} postType="draft" />
              )}
            />
            <ProtectedRoute
              path="/posts/new"
              isAuth={isAuth}
              component={PostForm}
            />
            <ProtectedRoute
              exact
              path="/post/public-service/:id/edit"
              isAuth={isAuth}
              render={props => (
                <PostForm postFormType="public service" {...props} />
              )}
            />
            <ProtectedRoute
              exact
              path="/post/event/:id/edit"
              isAuth={isAuth}
              render={props => <PostForm postFormType="event" {...props} />}
            />
            <ProtectedRoute
              isAuth={isAuth}
              path="/post/event/:category/:id"
              render={props => <Event {...props} />}
            />
            <ProtectedRoute
              isAuth={isAuth}
              path="/post/public-service/:category/:id"
              render={props => <PublicService {...props} />}
            />
            <ProtectedRoute isAuth={isAuth} path="/posts" component={Posts} />
            {!isAuth ? (
              <>
                <Route
                  path="/login"
                  component={props => (
                    <Login {...props} handleLogin={this.handleLogin} />
                  )}
                />
                <Route path="/signup" component={CreateProfile} />
                <Route exact path="/" component={Home} />
              </>
            ) : (
              <Redirect to={`/profile`} />
            )}

            <Route component={PageNotFound} />
          </Switch>
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
