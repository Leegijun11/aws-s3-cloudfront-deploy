import React, { useState } from 'react';
import TradeHistoryList from './trade/TradeHistoryList';
import BalanceList from './account/BalanceList';

const HistoryArea = () => {
    const [isTradeHistory, setIsTradeHistory] = useState(false);

    return (
        <div className="flex flex-col flex-1 rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex justify-end gap-2 mb-3 overflow-y-auto">
                <button 
                    onClick={() => setIsTradeHistory(false)}
                    className={`rounded-xl px-5 py-2 font-medium transition cursor-pointer
                        ${!isTradeHistory 
                        ? "bg-blue-600 text-white shadow-sm" 
                        : "text-gray-500 hover:text-gray-800"}
                    `}
                >
                잔고
                </button>

                <button 
                    onClick={() => setIsTradeHistory(true)}
                    className={`rounded-xl px-5 py-2 font-medium transition cursor-pointer
                        ${isTradeHistory 
                        ? "bg-blue-600 text-white shadow-sm" 
                        : "text-gray-500 hover:text-gray-800"}
                    `}
                >
                    체결내역
                </button>
            </div>
            <div className="flex-1 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                {isTradeHistory?<TradeHistoryList />
                :<BalanceList />}
            </div>
        </div>
    );
};

export default HistoryArea;