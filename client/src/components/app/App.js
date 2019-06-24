import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { notification, Spin } from "antd";
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
  Profile,
  AdminPosts
} from "components/pages";

import { Header, Footer } from "components/utils";
import ProtectedRoute from "./../auth/protectedRoute";
import "./App.css";
import AdminLayout from "components/utils/AdminLayout";

class App extends Component {
  state = {
    user: { role: "member" },
    isAuth: true,
    isLoading: true
  };

  componentDidMount = async () => {
    try {
      const user = (await axios.get("/api/v1/isAuth")).data;
      notification.success({ message: "Welcome Back" });
      this.setState({
        isAuth: true,
        user: { ...user, role: "admin" }, // this should be { ...user } but just for development
        isAdmin: true,
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
            <Switch>
              <Route
                path="/login"
                component={props => (
                  <Login {...props} handleLogin={this.handleLogin} />
                )}
              />
              <Route path="/signup" component={CreateProfile} />
              <Route exact path="/" component={Home} />
              <Route
                path="/logout"
                component={() => {
                  this.handleLogout();
                  return <Redirect to="/login" />;
                }}
              />

              <ProtectedRoute
                exact
                isAdmin={false}
                path="/profile"
                isAuth={isAuth}
                user={user}
                component={props => (
                  <Profile {...props} handleUnauth={this.handleUnauth} />
                )}
              />
              <ProtectedRoute
                isAdmin={false}
                path="/posts/live"
                isAuth={isAuth}
                user={user}
                component={props => (
                  <Post
                    handleUnauth={this.handleUnauth}
                    {...props}
                    postType="live"
                  />
                )}
              />
              <ProtectedRoute
                isAdmin={false}
                isAuth={isAuth}
                user={user}
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
                isAdmin={false}
                path="/posts/new"
                isAuth={isAuth}
                user={user}
                component={PostForm}
              />
              <ProtectedRoute
                isAdmin={false}
                exact
                path="/post/public-service/:id/edit"
                isAuth={isAuth}
                user={user}
                render={props => (
                  <PostForm postFormType="public service" {...props} />
                )}
              />
              <ProtectedRoute
                isAdmin={false}
                exact
                path="/post/event/:id/edit"
                isAuth={isAuth}
                user={user}
                render={props => <PostForm postFormType="event" {...props} />}
              />
              <ProtectedRoute
                isAdmin={false}
                isAuth={isAuth}
                user={user}
                path="/post/event/:category/:id"
                render={props => <Event {...props} />}
              />
              <ProtectedRoute
                isAdmin={false}
                isAuth={isAuth}
                user={user}
                path="/post/public-service/:category/:id"
                render={props => <PublicService {...props} />}
              />
              <ProtectedRoute
                isAdmin={false}
                user={user}
                isAuth={isAuth}
                path="/posts"
                component={Posts}
              />
              <AdminLayout>
                <ProtectedRoute
                  isAdmin={true}
                  user={user}
                  isAuth={isAuth}
                  path="/admin/1"
                  component={() => <h1>Hello World</h1>}
                />
                <ProtectedRoute
                  exact
                  isAdmin={true}
                  path="/admin/posts"
                  isAuth={isAuth}
                  user={user}
                  component={props => (
                    <AdminPosts {...props} handleUnauth={this.handleUnauth} />
                  )}
                />
              </AdminLayout>
            </Switch>
          </main>
          {user.role !== "admin" && <Footer />}
        </>
      </Router>
    );
  }
}

export default App;
