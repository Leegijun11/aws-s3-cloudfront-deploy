import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopRankings } from '../../Slice/rankingSlice';
import RankingRow from './RankingRow';

const RankingTable = () => {
    const dispatch = useDispatch();
    const rankings = useSelector((state) => state.rank.topRankings);

    useEffect(() => {
        dispatch(fetchTopRankings());
    }, [dispatch]);

    return (
        <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
                <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-center font-semibold">순위</th>
                    <th className="px-6 py-4 text-left font-semibold">닉네임</th>
                    <th className="px-6 py-4 text-right font-semibold">총 자산</th>
                    <th className="px-6 py-4 text-right font-semibold">수익금</th>
                    <th className="px-6 py-4 text-right font-semibold">수익률</th>
                </tr>
            </thead>

            <tbody>
            {rankings.map((user) => (
                <RankingRow user={user} key={user.rank}/>
            ))}
            </tbody>
        </table>
    );
};

export default RankingTable;