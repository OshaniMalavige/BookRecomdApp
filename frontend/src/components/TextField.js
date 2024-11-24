import React from 'react';

const TextField = ({ label, name, type, register, errors, className }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(name, { required: `${label} is required` })}
            />
            {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
        </div>
    );
};

export default TextField;
