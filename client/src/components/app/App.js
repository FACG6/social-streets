import React from "react";

import "./App.css";
import { Header, Footer } from "components/utils";
import { Profile } from "components/pages";

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
