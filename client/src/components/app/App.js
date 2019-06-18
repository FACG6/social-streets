import React from "react";

import "./App.css";
import { Header, Footer } from "components/utils";
import { PostForm } from 'components/pages'

function App() {
  return (
    <div>
      <PostForm />
      <main className="container" />
      <Footer />
    </div>
  );
}

export default App;
