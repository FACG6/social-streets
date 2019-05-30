import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;
const { Item } = Form;

const DropDownAntd = ({
  label,
  getFieldDecorator,
  name,
  required,
  validationMsg,
  placeholder,
  handleSelectChange,
  optionsMenu
}) => (
  <Item label={label}>
    {getFieldDecorator(name, {
      rules: [{ required: required, message: validationMsg }]
    })(
      <Select
        size="large"
        placeholder={placeholder}
        onChange={handleSelectChange}
      >
        {optionsMenu.map(({ key, value }) => (
          <Option key={key} value={value}>
            {value}
          </Option>
        ))}
      </Select>
    )}
  </Item>
);

export default DropDownAntd;
