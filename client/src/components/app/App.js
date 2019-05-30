import React from "react";
import "antd/dist/antd.css";

import "./App.css";
import { Header, Footer } from "components/utils";

function App() {
  return (
    <div>
      <Header />
      <main className="container" />
      <Footer />
    </div>
  );
}

export default App;
