import React from 'react';

const IconMenuButton = ({content, onClick}) => {
    return (
        <button onClick={()=>{onClick()}} className='cursor-pointer'>
            {content}
        </button>
    );
};

export default IconMenuButton;