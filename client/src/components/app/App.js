import React from "react";
import "antd/dist/antd.css";

import "./App.css";
import { Header, Footer } from "components/utils";
import { Home } from "components/pages";

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
