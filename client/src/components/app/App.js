import React from "react";
import "antd/dist/antd.css";

import "./App.css";
import { CreatPostPage } from "components/pages";
import Header from "components/utils/Header";
import { Footer } from "components/utils";

function App() {
  return (
    <>
      <Header />
      <CreatPostPage />
      <Footer />
    </>
  );
}

export default App;
