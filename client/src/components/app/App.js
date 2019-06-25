import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { notification } from "antd";
import axios from "axios";

import { Loading } from "components/pages";
import { isAuthRoutes, unAuthRoutes } from "../routes";
import { Header, Footer } from "components/utils";
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
                ? unAuthRoutes(this.handleLogin)
                : isAuthRoutes(this.handleUnauth, this.handleLogout, user)}
            </Switch>
          </main>
          {(!user.role || user.role !== "admin") && <Footer />}
        </>
      </Router>
    );
  }
}

export default App;
