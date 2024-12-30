import React from "react";

const CheckField = ({ id, label, value, disabled, error, onChange, name }) => {
  return (
    <>
      <div className="mb-6">
        <div className="inline-flex items-center">
          <input
            id={id}
            type="checkbox"
            checked={value}
            onChange={onChange}
            name={name}
            disabled={disabled}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor={id} className="ml-2 text-gray-700 text-sm font-bold">
            {label}
          </label>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    </>
  );
};

export default CheckField;
