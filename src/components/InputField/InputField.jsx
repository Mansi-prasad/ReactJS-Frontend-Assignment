import "./InputField.css"
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
      <legend className="label">
        {label} {required && <span className="required">*</span>}
      </legend>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="input-fields"
      />
    </fieldset>
  );
};

export default InputField;
