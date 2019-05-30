import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;
const { Item } = Form;

const DropDownAntd = (
  label,
  getFieldDecorator,
  name,
  required,
  validationMsg,
  placeholder,
  handleSelectChange,
  OoptionsMenu
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
        {OoptionsMenu.map(({ key, value }) => (
          <Option key={key} value={value}>
            {value}
          </Option>
        ))}
      </Select>
    )}
  </Item>
);

export default DropDownAntd;
