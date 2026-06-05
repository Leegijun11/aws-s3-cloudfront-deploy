import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter = ({type}) => {
    return (
        <div>
            <p className="mt-6 text-center text-sm text-gray-500">
            {type === "signup" ? "이미 계정이 있으신가요?" : "계정이 없으신가요?"}{" "}
            <Link
                to={type === "signup" ? "/login" : "/signup"}
                className="font-medium text-blue-500 hover:underline"
            >
                {type === "signup" ? "로그인" : "회원가입"}
            </Link>
            </p>
            <div className="mt-8 flex justify-center">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-base font-semibold text-gray-700 hover:text-blue-600 transition"
                >
                    ← 시작 화면으로
                </Link>
            </div>
        </div>
  );
};

export default AuthFooter;