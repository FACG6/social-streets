import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Header from "components/utils/Header";
import Footer from "components/utils/footer";
import "./style.css";

export default () => (
  <>
    <Header showHamburger={false} />
    <section className="not-found">
      <span className="not-found--msg">Oops! That page can’t be found.</span>
      <span className="not-found--code">404</span>
      <Router>
        <Link to="/" className="not-found--back-home">
          Back to Home Page
        </Link>
      </Router>
    </section>
    <Footer />
  </>
);
