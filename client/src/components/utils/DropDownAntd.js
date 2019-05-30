import React from "react";
import { Form, Select } from "antd";

import { Options } from "components/utils";
const { Item } = Form;

const DropDownAntd = (
  label,
  getFieldDecorator,
  name,
  required,
  validationMsg,
  placeholder,
  handleSelectChange,
  OoptionsMenu,
  size
) => (
  <Item label={label}>
    {getFieldDecorator(name, {
      rules: [{ required: required, message: validationMsg }]
    })(
      <Select
        size="large"
        placeholder={placeholder}
        onChange={handleSelectChange}
      >
        {Options(OoptionsMenu)}
      </Select>
    )}
  </Item>
);

export default DropDownAntd;
