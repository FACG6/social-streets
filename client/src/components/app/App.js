import React from "react";

import "./App.css";
import { Header, Footer } from "components/utils";
import { Login } from "components/pages";

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Login/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
