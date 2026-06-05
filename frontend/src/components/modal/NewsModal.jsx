import { useEffect, useState } from 'react';
import{ useSelector, useDispatch } from 'react-redux';
import { fetchNews_last } from '../../Slice/newsuserSlice';

const NewsModal = ({ isNewsOpen, onClose }) => {
  const news = useSelector((state)=>state.newsuser.last_news)
  
  if (!isNewsOpen) return null;
  if (!news) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* 상단 */}
        <div className="bg-linear-to-r from-indigo-500 to-blue-600 px-8 py-7 text-white">
          <p className="text-sm text-white/80">NEW MARKET NEWS</p>
          <h2 className="mt-1 text-3xl font-bold">새로운 뉴스 도착</h2>
        </div>

        {/* 본문 */}
        <div className="px-8 py-7">
          <h3 className="text-2xl font-bold text-gray-900">
            {news.news_title}
          </h3>

          <p className="mt-4 leading-7 text-gray-600">
            {news.news_comments}
          </p>

          <div className="mt-7 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              뉴스 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;