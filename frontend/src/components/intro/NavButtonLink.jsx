import React from 'react';
import { Link } from 'react-router-dom';

const NavButtonLink = ({to, text}) => {
    return (
        <Link to={to} className="bg-blue-500 text-white text-2xl px-14 py-3 rounded-[20px] shadow-md hover:bg-blue-600 transition">
            {text}
        </Link>
    );
};

export default NavButtonLink;