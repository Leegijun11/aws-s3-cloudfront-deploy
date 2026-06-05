import React from 'react';
import NavCardLink from './NavCardLink';
import NavButtonLink from './NavButtonLink';
const IntroNav = () => {
    {/* 초기화면 네비바 */}
    return (
        <>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <NavCardLink to="/trading" icon={"🎯"} text={"트레이드"}/>
                <NavCardLink to="/ranking" icon={"🏅"} text={"랭킹"}/>
            </div>
            <div className="mt-10 flex justify-center gap-6">
                <NavButtonLink to="/login" text={"로그인"} />
                <NavButtonLink to="/signup" text={"회원가입"} />
            </div>
        </>
    );
};

export default IntroNav;