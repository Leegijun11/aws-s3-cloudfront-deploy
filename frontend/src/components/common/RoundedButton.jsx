import React from 'react';

const RoundedButton = ({content, onClick, isSeleted}) => {
    return (
        <button
            key={content}
            onClick={onClick}
            className={`rounded-full px-3 py-1 text-xs font-medium cursor-pointer ${
                isSeleted
                ? "bg-blue-100 text-blue-600"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            >
            {content}
        </button>
    );
};

export default RoundedButton;