import React from 'react';

const Input = ({ 
  label = "", 
  id = "input", 
  name = "input", 
  value = "", 
  onChange = () => {}, 
  type = "text", 
  placeholder = "", 
  required = false 
}) => {
  return (
    <div>
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required={required}
      />
    </div>
  );
};

export default Input;
