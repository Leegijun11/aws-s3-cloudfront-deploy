import React from 'react';

const MenuButton = ({content, onClick}) => {
    return (
        <button onClick={onClick} className="rounded-full bg-white px-5 py-2 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 cursor-pointer">
            {content}
        </button>
    );
};

export default MenuButton;