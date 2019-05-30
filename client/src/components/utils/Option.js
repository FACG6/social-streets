import React from "react";
import { Select } from "antd";

const { Option } = Select;

const Options = eventTypeValues =>
  eventTypeValues.map(({ key, value }) => (
    <Option key={key} value={value}>
      {value}
    </Option>
  ));

export default Options;
