import React from 'react';
import IntroNav from '../components/intro/IntroNav';
const IntroPage = () => {
    return (
        <div className="min-h-screen bg-[#efefef] flex items-center justify-center px-4">
            <div className="w-full max-w-5xl text-center">
                <h1 className="text-[72px] md:text-[96px] font-bold text-black tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    모의 주식 투자
                </h1>
                <div className="mt-6 text-xl md:text-2xl text-gray-500 font-medium">
                    실전 같은 주식 투자 시뮬레이션으로 투자 실력을 키워보세요!
                </div>

                <IntroNav/>
            </div>
        </div>
    );
};

export default IntroPage;