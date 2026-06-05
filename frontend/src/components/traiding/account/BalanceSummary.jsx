import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyBalance } from '../../../Slice/balanceSlice';
import { fetchUser } from '../../../Slice/userSlice'
import { useEffect } from 'react';

const BalanceSummary = () => {
    const dispatch = useDispatch();
    const mybalance = useSelector((state)=> state.balance);
    const user = useSelector((state)=>state.user);

    useEffect(() => {
        dispatch(fetchMyBalance());
        dispatch(fetchUser());
    }, [dispatch]);

    const totalPrice = (mybalance.my_balance || []).reduce((acc, cur) => {
        return acc + (Number(cur.val_price) || 0);
    }, 0);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="mb-4 text-lg font-semibold">보유 현금</div>

            <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-gray-500">
                <span>KRW</span>
                <span className="font-semibold text-gray-800">{`₩${user.money.toLocaleString()}`}</span>
            </div>

            <div className="flex items-center justify-between text-gray-500">
                <span>주식 평가액</span>
                <span className="font-semibold text-gray-800">{`₩${totalPrice.toLocaleString()}`}</span>
            </div>
            </div>
        </div>
    );
};

export default BalanceSummary;