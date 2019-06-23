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
  state = { user: { role: "" }, isAuth: false, isLoading: true };

  componentDidMount = async () => {
    try {
      const user = (await axios.get("/api/v1/isAuth")).data;
      notification.success({ message: "Welcome Back" });
      this.setState({
        isAuth: true,
        user: { ...user, role: "member" },
        isLoading: false
      });
    } catch (e) {
      if (e.response.status !== 401)
        notification.error({
          message: "Sorry There is an error"
        });
      this.setState({ isLoading: false });
    }
  };

  handleLogin = () => {
    console.log(5);
    this.setState({ isAuth: true });
  };

  handleUnauth = () => {
    this.setState({ isAuth: false, user: {} });
  };

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
    const { isAuth, isLoading, user } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Router>
        <>
          {user.role !== "admin" && <Header showHamburger={isAuth} />}
          <main
            className="container"
            style={isAuth ? {} : { minHeight: "calc(100vh - (129px + 70px))" }}
          >
            {!isAuth ? (
              <Switch>
                <Route
                  path="/login"
                  component={props => (
                    <Login {...props} handleLogin={this.handleLogin} />
                  )}
                />
                <Route path="/signup" component={CreateProfile} />
                <Route component={PageNotFound} />
              </Switch>
            ) : user.role === "member" ? (
              <Switch>
                <Route
                  path="/logout"
                  component={() => {
                    this.handleLogout();
                    // return <h1>Hi</h1>;
                    return <Redirect to="/login" />;
                  }}
                />
                <ProtectedRoute
                  exact
                  path="/profile"
                  isAuth={isAuth}
                  component={props => (
                    <Profile {...props} handleUnauth={this.handleUnauth} />
                  )}
                />
                <ProtectedRoute
                  path="/posts/live"
                  isAuth={isAuth}
                  component={props => (
                    <Post
                      handleUnauth={this.handleUnauth}
                      {...props}
                      postType="live"
                    />
                  )}
                />
                <ProtectedRoute
                  isAuth={isAuth}
                  path="/posts/draft"
                  component={props => (
                    <Post
                      handleUnauth={this.handleUnauth}
                      {...props}
                      postType="draft"
                    />
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
                <ProtectedRoute
                  isAuth={isAuth}
                  path="/posts"
                  component={Posts}
                />
                <Route component={PageNotFound} />
              </Switch>
            ) : (
              user.role === "admin" && (
                <Switch>
                  <h2>Welcome admin</h2>
                </Switch>
              )
            )}
          </main>
          {user.role !== "admin" && <Footer />}
        </>
      </Router>
    );
  }
}

export default App;
