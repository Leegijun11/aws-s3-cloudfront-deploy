import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBalance } from './../../../Slice/balanceSlice';
import { fetchChart_code } from '../../../Slice/chartuserSlice';

const BalanceList = () => {
    const dispatch = useDispatch();
    const mybalance = useSelector((state) => state.balance.my_balance);

    // 정렬 상태
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    });

    useEffect(() => {
        dispatch(fetchMyBalance());
    }, [dispatch]);

    const balances = Array.isArray(mybalance) ? mybalance : [];

    // 정렬 함수
    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc',
                };
            }
            return {
                key,
                direction: 'asc',
            };
        });
    };

    // 정렬된 데이터
    const sortedBalances = useMemo(() => {
        const sortableData = [...balances];

        if (!sortConfig.key) return sortableData;

        sortableData.sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // 문자열 처리
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortableData;
    }, [balances, sortConfig]);

    // 정렬 화살표 표시
    const renderArrow = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    };

    return (
        <div className="max-h-[25vh] overflow-y-auto">
            <table className="w-full text-sm table-fixed border-collapse">
                <thead className="sticky top-0 z-10 bg-gray-50 text-gray-600">
                    <tr className="border-b border-gray-100">
                        <th onClick={() => handleSort('item_code')} className="px-2 py-2 text-center border-r border-gray-100 cursor-pointer hover:bg-gray-100">
                            종목코드{renderArrow('item_code')}
                        </th>
                        <th onClick={() => handleSort('item_name')} className="px-2 py-2 text-center border-r border-gray-100 cursor-pointer hover:bg-gray-100">
                            종목명{renderArrow('item_name')}
                        </th>
                        <th onClick={() => handleSort('quantity')} className="px-2 py-2 text-center border-r border-gray-100 cursor-pointer hover:bg-gray-100">
                            수량{renderArrow('quantity')}
                        </th>
                        <th onClick={() => handleSort('purchase_price')} className="px-2 py-2 text-center border-r border-gray-100 cursor-pointer hover:bg-gray-100">
                            매입단가{renderArrow('purchase_price')}
                        </th>
                        <th onClick={() => handleSort('val_price')} className="px-2 py-2 text-center border-r border-gray-100 cursor-pointer hover:bg-gray-100">
                            평가금액{renderArrow('val_price')}
                        </th>
                        <th onClick={() => handleSort('val_profit_and_loss')} className="px-2 py-2 text-center border-r border-gray-100 cursor-pointer hover:bg-gray-100">
                            평가손익{renderArrow('val_profit_and_loss')}
                        </th>
                        <th onClick={() => handleSort('rate_of_return')} className="px-2 py-2 text-center cursor-pointer hover:bg-gray-100">
                            수익률{renderArrow('rate_of_return')}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {sortedBalances.map((item, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                            onClick={() => dispatch(fetchChart_code(item.item_code))}
                        >
                            <td className="px-2 py-2 border-r border-gray-100">{item.item_code}</td>
                            <td className="px-2 py-2 border-r border-gray-100 truncate">{item.item_name}</td>
                            <td className="px-2 py-2 text-right border-r border-gray-100">{item.quantity}</td>
                            <td className="px-2 py-2 text-right border-r border-gray-100">
                                {Math.floor(item.purchase_price / item.quantity).toLocaleString()}
                            </td>

                            <td className={`px-2 py-2 text-right font-medium border-r border-gray-100 ${
                                item.val_profit_and_loss > 0
                                    ? "text-red-500"
                                    : item.val_profit_and_loss < 0
                                    ? "text-blue-500"
                                    : "text-gray-500"
                            }`}>
                                {item.val_price.toLocaleString()}
                            </td>

                            <td className={`px-2 py-2 text-right font-medium border-r border-gray-100 ${
                                item.val_profit_and_loss > 0
                                    ? "text-red-500"
                                    : item.val_profit_and_loss < 0
                                    ? "text-blue-500"
                                    : "text-gray-500"
                            }`}>
                                {item.val_profit_and_loss > 0 ? "+" : ""}
                                {item.val_profit_and_loss.toLocaleString()}
                            </td>

                            <td className={`px-2 py-2 text-right font-medium ${
                                item.rate_of_return > 0
                                    ? "text-red-500"
                                    : item.rate_of_return < 0
                                    ? "text-blue-500"
                                    : "text-gray-500"
                            }`}>
                                {item.rate_of_return > 0 ? "+" : ""}
                                {item.rate_of_return.toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BalanceList;