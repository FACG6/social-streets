import React from "react";
import "antd/dist/antd.css";

import "./App.css";
import Header from 'components/utils/Header';
import Post from 'components/pages/Post'
import Footer from 'components/utils/footer';

function App() {
  return <><Header /> <Post postType='draft' /> <Footer /></>;
}

export default App;
