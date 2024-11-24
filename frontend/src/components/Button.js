import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Importing the spinner icon from react-icons

const Button = ({ type, children, className, onClick, isLoading }) => {
    return (
        <button
            type={type}
            className={`bg-purple-950 text-white py-2 px-4 rounded-md hover:bg-purple-900 ${className} ${isLoading ? 'cursor-wait' : ''}`}
            onClick={onClick}
            disabled={isLoading} // Disable the button when loading
        >
            {isLoading ? (
                <FaSpinner className="animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
