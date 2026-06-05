import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CONSTANTS_CONFIG } from "@/config";
import { fetchUser } from '../../../Slice/userSlice';

const AccountSummary = () => {
    const dispatch = useDispatch();
    const { money, valuation } = useSelector((state) => state.user);
    const seed_money = CONSTANTS_CONFIG.SEED_MONEY;
    const total_assets = money + valuation;
    // 수익을 전날 대비 수익으로 할건지 정해야함 
    // Progress 할때 전날 money 저장하면 되긴될듯?
    const profit = total_assets - seed_money;
    const profit_rate = profit / seed_money * 100;

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    return (
        <div className="overflow-hidden rounded-2xl bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 p-4 text-white shadow-md">
            <div className="text-sm opacity-80">총 자산</div>
            <div className="mt-2 text-4xl font-bold">₩{total_assets.toLocaleString()}</div>
            <div className="mt-4 text-sm opacity-80">{`~ ₩${profit.toLocaleString()} (${profit_rate>=0?"+":""}${profit_rate.toFixed(2)}%)`}</div>
        </div>
    );
};

export default AccountSummary;