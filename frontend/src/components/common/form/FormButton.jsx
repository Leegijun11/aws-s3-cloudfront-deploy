import React from 'react';

const FormButton = ({content, onClick}) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className="h-11 w-full rounded-lg bg-blue-500 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
            {content}
        </button>
    );
};

export default FormButton;