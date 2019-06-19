import React from "react";

import "./App.css";
import { Header, Footer } from "components/utils";
import Posts from 'components/pages/Post';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Posts postType='draft' />
      </main>
      <Footer />
    </>
  );
}

export default App;
