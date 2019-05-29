import React from "react";
import { Select } from "antd";

const { Option } = Select;

const Options = optionsForSelect => {
  const selectOption = optionsForSelect.map(({ key, value, children }) => (
    <Option children={value} key={key} value={value} />
  ));

  return selectOption;
};

export default Options;
