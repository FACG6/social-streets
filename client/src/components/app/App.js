import React from "react";
import "antd/dist/antd.css";

import "./App.css";
import DraftPosts from 'components/pages/DraftPosts'
import Header from 'components/utils/Header'
import Footer from 'components/utils/footer'

function App() {
  return <><Header /><DraftPosts /><Footer /></>;
}

export default App;
