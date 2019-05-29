import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectMenu = ({
  options,
  onChange,
  onBlur,
  value,
  htmlFor,
  style,
  labelchildren,
  defaultValue,
  className,
  name,
  ...props
}) => {
  const optionTags = options.map(({ key, value }) => (
    <Option key={key} value={value}>
      {value}
    </Option>
  ));
  return (
    <>
      <Label htmlFor={htmlFor} style={style} children={labelchildren} />
      <Select
        id={htmlFor}
        name={name}
        defaultValue={defaultValue}
        className={className}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        {optionTags}
      </Select>
    </>
  );
};

const Label = prpos => <label {...prpos} />;

export { SelectMenu, Label };
