import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../Slice/userSlice';
import { fetchMyBalance } from '../../Slice/balanceSlice';

const Assets = () => {
    const dispatch = useDispatch();

    const { login_id, money, valuation } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchMyBalance());
    }, [dispatch]);

    const totalAssets = (money || 0) + (valuation || 0);

    const cashPercent = totalAssets === 0 ? 0 : (money / totalAssets) * 100;
    const stockPercent = totalAssets === 0 ? 0 : (valuation / totalAssets) * 100;

    return (
        <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                자산 구성
            </h3>

            <div className="mt-8 flex justify-center">
                <div
                className="relative h-48 w-48 rounded-full"
                style={{
                    background: `conic-gradient(
                        #3b82f6 0% ${cashPercent}%,
                        #10b981 ${cashPercent}% 100%
                    )`,
                }}
                >
                {/* 가운데 구멍 */}
                <div className="absolute inset-6 flex items-center justify-center rounded-full bg-white text-sm font-medium shadow">
                    ₩{totalAssets.toLocaleString()}
                </div>
                </div>
            </div>

            {/* 범례 */}
            <div className="mt-8 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-blue-500" />
                        현금 보유
                    </div>
                    <span className="text-gray-600">
                        {cashPercent.toFixed(1)}%
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-500" />
                        주식 보유
                    </div>
                    <span className="text-gray-600">
                        {stockPercent.toFixed(1)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Assets;