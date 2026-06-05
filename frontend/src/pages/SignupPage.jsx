import React from 'react';
import SignupForm from '../components/user/SignupForm';

const SignupPage = () => {
    return (
        <div>
            <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4 py-10">
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;