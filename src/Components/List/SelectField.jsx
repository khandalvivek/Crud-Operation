import React from "react";

const SelectField = ({ label, id, name, value, onChange, options, error, disabled }) => {
  return (
    <>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
        <select
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error && "border-red-500"
          }`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="" hidden>Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    </>
  );
};

export default SelectField;
