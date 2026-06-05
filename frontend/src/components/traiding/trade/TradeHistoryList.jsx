import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrade } from './../../../Slice/tradeSlice';

const TradeHistoryList = () => {
    const dispatch = useDispatch();
    const trades = useSelector((state) => state.trade.trades);

    useEffect(() => {
        dispatch(fetchTrade());
    }, [dispatch]);
    return (
        <div className="max-h-[25vh] overflow-y-auto">
            <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-50 text-gray-600">
                <tr className="border-b border-gray-100">
                    <th className="px-2 py-2 text-center border-r border-gray-100">일차</th>
                    <th className="px-2 py-2 text-center border-r border-gray-100">종목명</th>
                    <th className="px-2 py-2 text-center border-r border-gray-100">구분</th>
                    <th className="px-2 py-2 text-center border-r border-gray-100">가격</th>
                    <th className="px-2 py-2 text-center ">수량</th>
                </tr>
                </thead>

                <tbody>
                    {trades.map((trade, index) => (
                        <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 
                                        ${trade.buy_type === "buy" ? "text-red-500" : "text-blue-500"}`}>
                        <td className="px-2 py-2 text-center border-r border-gray-100">{trade.trade_day}</td>
                        <td className="px-2 py-2 border-r border-gray-100">{trade.item_name}</td>
                        <td className="px-2 py-2 border-r border-gray-100">
                            {trade.buy_type === "buy" ? "매수" : "매도"}
                        </td>
                        <td className="px-2 py-2 text-right border-r border-gray-100">{trade.price.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right">{trade.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TradeHistoryList;