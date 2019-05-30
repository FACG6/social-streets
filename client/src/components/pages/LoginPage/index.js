import React, { Component, Fragment } from "react";

import Header from "components/utils/Header";
import LoginForm from "components/utils/LoginForm";
import Footer from "components/utils/footer";
import "./style.css";

export default class LoginPage extends Component {
  render() {
    return (
      <Fragment>
        <Header showHamburger={false} />
        <main className="login-page--main-section">
          <LoginForm />
        </main>
        <Footer />
      </Fragment>
    );
  }
}
