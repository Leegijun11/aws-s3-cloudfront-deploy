import React from 'react';

const FormTextInput = ({type, label, icon, placeholder, value, onChange, onBlur}) => {
    return (
        <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">
              {label}
            </label>
            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-white px-3">
              {icon}
              <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
        </div>
    );
};

export default FormTextInput;