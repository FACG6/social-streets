import React from "react";
import { Select } from "antd";

const { Option } = Select;

const Options = typeValues => {
  const selectOption = typeValues.map(({ key, value }) => (
    <Option children={value} key={key} value={value} />
  ));

  return selectOption;
};

export default Options;