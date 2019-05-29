import React from "react";
import { Select } from "antd";

const { Option } = Select;

const Options = eventTypeValues => {
  const selectOption = eventTypeValues.map(({ key, value }) => (
    <Option children={value} key={key} value={value} />
  ));

  return selectOption;
};

export default Options;
