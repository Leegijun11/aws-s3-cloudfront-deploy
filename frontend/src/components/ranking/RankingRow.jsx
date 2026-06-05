import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import { CONSTANTS_CONFIG } from "@/config";

const RankingRow = ({user}) => {

    const seed_money = CONSTANTS_CONFIG.SEED_MONEY;
    const profit = user.max_accounts - seed_money;
    const profit_rate = profit / seed_money * 100;

    const rankIcon = (rank) => {
        if (rank === 1) return "🏆";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        return rank;
    };

    return (
        <tr
            className="border-b border-gray-100 transition last:border-b-0 hover:bg-gray-50"
        >
            <td className="px-6 py-4 text-center text-lg">
                {rankIcon(user.rank)}
            </td>
            <td className="px-6 py-4 font-medium text-gray-800">
                {user.user_nickname}
            </td>
            <td className="px-6 py-4 text-right font-medium text-gray-700">
                ₩{user.max_accounts.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-right font-semibold text-emerald-500">
                {profit>=0?"+":""}₩{profit.toLocaleString()}
            </td>
            <td className="flex justify-end px-6 py-4 font-semibold text-emerald-500">
                {profit_rate>=0?(
                    <TrendingUp size={18} className="text-emerald-500" />
                    ) :
                    <TrendingDown size={18} className="text-emerald-500" />
                    } 
                <span>{profit_rate>=0?"+":null}{profit_rate.toFixed(2)}%</span>
            </td>
        </tr>
    );
};

export default RankingRow;