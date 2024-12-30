import React from "react";

const RadioField = ({ id, label, value, checked, onChange, name, disabled }) => (
  <>
    <div className="inline-flex items-center space-x-2">
      <input
        id={id}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        className="form-radio h-5 w-5 text-blue-600"
      />
      <label htmlFor={id} className="ml-2 text-gray-700 text-sm font-bold">
        {label}
      </label>
    </div>
  </>
);

export default RadioField;
