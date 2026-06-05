import React from 'react';

const StatCard = ({ label, value, color, bg }) => {
    return (
        <div className={`rounded-xl ${bg} px-4 py-4`}>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className={`mt-2 text-xl font-semibold ${color}`}>{value}</p>
        </div>
    );
}

export default StatCard;