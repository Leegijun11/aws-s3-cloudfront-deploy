import React from 'react';
import LoginForm from '../components/user/LoginForm';

const LoginPage = () => {
    return (
        <div>
            <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4 py-10">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;