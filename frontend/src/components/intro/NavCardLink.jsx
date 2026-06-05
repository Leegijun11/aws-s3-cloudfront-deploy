import React from 'react';
import { Link } from 'react-router-dom';

const NavCardLink = ({to, icon, text}) => {
    return (
        <Link to={to} className="bg-blue-500 rounded-3xl shadow-lg h-60 flex flex-col items-center justify-center transition hover:scale-[1.02] hover:shadow-xl">
            <div className="text-7xl mb-6">{icon}</div>
            <span className="text-white text-4xl font-medium">{text}</span>
        </Link>
    );
};

export default NavCardLink;