import React from 'react';

const NewsCard = ({currentNews, currentIndex, length}) => {
    return (
        <div className="min-h-40 flex-1 rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-start justify-between">
                <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
                day {currentNews.day}
                </span>

                <span className="text-sm text-gray-400">
                {currentIndex + 1} / {length}
                </span>
            </div>

            <h3 className="text-2xl font-semibold">
                {currentNews.news_title}
            </h3>

            <p className="mt-3 text-base text-gray-500">
                {currentNews.news_comments}
            </p>
        </div>
    );
};

export default NewsCard;