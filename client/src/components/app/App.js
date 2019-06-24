import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AdminLayout from "components/utils/AdminLayout";
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
  Event,
  Profile,
  AdminPosts
} from "components/pages";

import { Header, Footer } from "components/utils";
import ProtectedRoute from "./../auth/protectedRoute";
import "./App.css";

class App extends Component {
  state = {
    user: {},
    isAuth: false,
    isLoading: true
  };

  componentDidMount = async () => {
    try {
      const user = (await axios.get("/api/v1/isAuth")).data;
      notification.success({ message: "Welcome Back" });
      this.setState({
        isAuth: true,
        user: { ...user }, // this should be { ...user } but just for development
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

  handleLogin = ({ role, email, id }) => {
    this.setState({ isAuth: true, user: { role, email, id } });
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
    console.log(user);
    return isLoading ? (
      <Loading />
    ) : (
      <Router>
        <>
          {(!user.role || user.role !== "admin") && (
            <Header showHamburger={isAuth} />
          )}
          <main
            className="container"
            style={isAuth ? {} : { minHeight: "calc(100vh - (129px + 70px))" }}
          >
            <Switch>
              {!isAuth
                ? [
                    <Route
                      path="/login"
                      exact
                      component={props => (
                        <Login handleLogin={this.handleLogin} {...props} />
                      )}
                    />,
                    <Route path="/signup" component={CreateProfile} />,
                    <Route path="/" exact component={Home} />,
                    <Route path="*" component={() => <Redirect to="/" />} />
                  ]
                : [
                    <Route
                      path="/logout"
                      exact
                      component={() => {
                        this.handleLogout();
                        return <Redirect to="/login" />;
                      }}
                    />,
                    <ProtectedRoute
                      exact
                      path="/profile"
                      isAuth={isAuth}
                      user={user}
                      component={props => (
                        <Profile {...props} handleUnauth={this.handleUnauth} />
                      )}
                    />,
                    <ProtectedRoute
                      path="/posts/live"
                      exact
                      isAuth={isAuth}
                      user={user}
                      component={props => (
                        <Post
                          handleUnauth={this.handleUnauth}
                          {...props}
                          postType="live"
                        />
                      )}
                    />,
                    <ProtectedRoute
                      isAuth={isAuth}
                      exact
                      user={user}
                      path="/posts/draft"
                      component={props => (
                        <Post
                          handleUnauth={this.handleUnauth}
                          {...props}
                          postType="draft"
                        />
                      )}
                    />,
                    <ProtectedRoute
                      path="/posts/new"
                      exact
                      isAuth={isAuth}
                      user={user}
                      component={PostForm}
                    />,
                    <ProtectedRoute
                      exact
                      path="/post/public-service/:id/edit"
                      isAuth={isAuth}
                      user={user}
                      render={props => (
                        <PostForm postFormType="public service" {...props} />
                      )}
                    />,
                    <ProtectedRoute
                      exact
                      path="/post/event/:id/edit"
                      isAuth={isAuth}
                      user={user}
                      render={props => (
                        <PostForm postFormType="event" {...props} />
                      )}
                    />,
                    <ProtectedRoute
                      isAuth={isAuth}
                      exact
                      user={user}
                      path="/post/event/:category/:id"
                      render={props => <Event {...props} />}
                    />,
                    <ProtectedRoute
                      isAuth={isAuth}
                      exact
                      user={user}
                      path="/post/public-service/:category/:id"
                      render={props => <PublicService {...props} />}
                    />,
                    <ProtectedRoute
                      user={user}
                      exact
                      isAuth={isAuth}
                      path="/posts"
                      component={Posts}
                    />,
                    <ProtectedRoute
                      isAdmin
                      exact
                      user={user}
                      isAuth={isAuth}
                      path="/admin/pending-accounts"
                      component={() => <h1>Pendding Accounts</h1>}
                    />,
                    <ProtectedRoute
                      isAdmin
                      exact
                      user={user}
                      isAuth={isAuth}
                      path="/admin/accounts"
                      component={() => <h1>Accounts</h1>}
                    />,
                    <ProtectedRoute
                      exact
                      isAdmin
                      path="/admin/posts"
                      isAuth={isAuth}
                      user={user}
                      component={props => (
                        <AdminPosts
                          {...props}
                          handleUnauth={this.handleUnauth}
                        />
                      )}
                    />,
                    <ProtectedRoute
                      exact
                      isAdmin
                      path="/admin/seo-tips"
                      isAuth={isAuth}
                      user={user}
                      component={props => <h1>SEO Tips</h1>}
                    />,
                    <ProtectedRoute
                      exact
                      isAdmin
                      path="/admin/tags"
                      isAuth={isAuth}
                      user={user}
                      component={props => <h1>Tags</h1>}
                    />,
                    <Route
                      path="*"
                      component={() => (
                        <Redirect
                          to={
                            user.role === "admin" ? "/admin/accounts" : "/posts"
                          }
                        />
                      )}
                    />
                  ]}
            </Switch>
          </main>
          {(!user.role || user.role !== "admin") && <Footer />}
        </>
      </Router>
    );
  }
}

export default App;
