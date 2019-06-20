import React from "react";
import { Spin } from "antd";

import "./index.css";

export default function index() {
  return (
    <div className="loading-page-container">
      <Spin size="large" />
    </div>
  );
}
