import React from "react";
import "antd/dist/antd.css";

import "./App.css";
import Header from '../utils/Header'
import Footer from 'components/utils/footer'
import LivePosts from '../pages/LivePosts'

function App() {
  return <><Header /> <LivePosts /><Footer /></>;
}

export default App;
