import React, { useEffect } from 'react';
import RankingTable from '../components/ranking/RankingTable';
import RankingHeader from '../components/ranking/RankingHeader';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNewsChecked } from '../Slice/newsuserSlice';
import { fetchUser } from '../Slice/userSlice';
const RankingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const check = async () => {
            const result = await dispatch(fetchUser()); 
            if (!result.payload?.login_id) {         
                
                navigate("/");
                return;
            }
            dispatch(setNewsChecked());
        };
        check();
    }, []);

    return (    
        <div className="min-h-screen bg-[#f8fafc] px-6 py-8">
            <div className="mx-auto max-w-4xl">
                <section className="rounded-2xl bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 p-7 text-white shadow-lg">
                    <RankingHeader />
                </section>
                <section className="mt-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <RankingTable />
                </section>
            </div>
        </div>
    );
};

export default RankingPage;