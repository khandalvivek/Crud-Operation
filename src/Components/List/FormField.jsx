import React from "react";

const FormField = ({
  id,
  label,
  type,
  value,
  placeholder,
  disabled,
  error,
  onChange,
  name,
  pattern
}) => {
  return (
    <>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error && "border-red-500"
          }`}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          name={name}
          pattern={pattern}
        />
        <p className="text-red-500 text-xs italic">{error}</p>
      </div>
    </>
  );
};

export default FormField;
