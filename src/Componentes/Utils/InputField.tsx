import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
);

export default InputField;
