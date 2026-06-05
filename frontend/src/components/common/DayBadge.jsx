import React from 'react';

const DayBadge = ({content}) => {
    return (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
            {content}
        </span>
    );
};

export default DayBadge;