import React from "react";

import "./App.css";
import { Header, Footer } from "components/utils";
import { Event } from "components/pages";

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Event />
      </main>
      <Footer />
    </div>
  );
}

export default App;
