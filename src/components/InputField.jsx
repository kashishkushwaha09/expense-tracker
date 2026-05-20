import React from "react";

const InputField = ({
  type,
  placeholder,
  name,
  value,
  label,
  error,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${error ? "border-danger" : ""}`}
        placeholder={placeholder}
        required
      />
      <small className="text-danger mt-1 d-block">
   {error}
  </small>
    </div>
  );
};

export default InputField;
