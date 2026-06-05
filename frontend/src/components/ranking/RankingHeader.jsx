import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyRanking } from '../../Slice/rankingSlice';
import { useEffect } from 'react';

const RankingHeader = () => {
    const dispatch = useDispatch();
    const myRanking = useSelector((state) => state.rank.myRanking);
    const all_rank =useSelector((state)=>state.rank.all_rankings);

    useEffect(() => {
        dispatch(fetchMyRanking());
    }, [dispatch]);
    if (!myRanking) {
        return <div>랭킹 데이터를 불러올 수 없습니다. (혹은 로딩 중)</div>;
    }

    return (<>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-white/80">내 순위</p>
                    <p className="mt-1 text-4xl font-light">{myRanking.rank}위</p>
                </div>

                <div className="text-right">
                    <p className="text-sm text-white/80">총 참가자</p>
                    <p className="mt-1 text-2xl font-semibold">{all_rank}명</p>
                </div>
            </div>

            <div className="my-6 h-px bg-white/20" />

            <div className="grid grid-cols-2 gap-6">
                <div>
                <p className="text-sm text-white/80">최대 잔고</p>
                <p className="mt-1 text-xl font-semibold">₩{myRanking.max_accounts.toLocaleString()}</p>
                </div>

                <div>
                    <p className="text-sm text-white/80">최대 수익률</p>
                    <div className="mt-1 flex items-center gap-1">
                        {myRanking.max_plus >= 0 ? (
                        <TrendingUp size={18} className="text-white" />
                        ) :
                        <TrendingDown size={18} className="text-white" />
                        }

                        <span className="text-xl font-semibold">
                            {myRanking.max_plus >= 0 ? " +" : " "}
                            {myRanking.max_plus.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RankingHeader;