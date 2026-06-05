import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsUser } from '../../Slice/newsuserSlice';

const NewsArea = () => {
    const dispatch = useDispatch();
    const newsList = useSelector((state)=>state.newsuser.newslist)

    useEffect(()=>{
        dispatch(fetchNewsUser());
    },[dispatch])
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentNews = newsList?newsList[currentIndex]:[];

    const prevNews = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? newsList.length - 1 : prev - 1
        );
    };

    const nextNews = () => {
        setCurrentIndex((prev) =>
            prev === newsList.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="rounded-3xl border border-gray-200 bg-[#fafafa] p-4">
            <div className="flex items-center gap-4">
                {/* 왼쪽 화살표 */}
                <button
                    type="button"
                    onClick={prevNews}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm hover:bg-gray-100 cursor-pointer"
                >
                ‹
                </button>

                {/* 뉴스 카드 */}
                {currentNews?
                    <NewsCard currentNews={currentNews} currentIndex={currentIndex} length={newsList.length}/>
                    :<div>뉴스 정보가 없습니다.</div>
                }
                

                {/* 오른쪽 화살표 */}
                <button
                    type="button"
                    onClick={nextNews}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm hover:bg-gray-100 cursor-pointer"
                >
                ›
                </button>
            </div>
        </div>
    );
};

export default NewsArea;