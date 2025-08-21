import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  onChange,
}) => {
  return (
    <fieldset className="form-group">
      <legend>
        {label} {required && <span className="required">*</span>}
      </legend>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </fieldset>
  );
};

export default InputField;
