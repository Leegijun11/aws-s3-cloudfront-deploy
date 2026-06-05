import React from 'react';
import FormTitleIcon from './FormTitleIcon';
import FormTitle from './FormTitle';
import FormComment from './FormComment';

const FormHeader = ({icon, title, comment}) => {
    return (
        <div className='flex flex-col items-center'>
            <FormTitleIcon content={icon} />
            <FormTitle content={title} />
            <FormComment content={comment} />
        </div>
    );
};

export default FormHeader;