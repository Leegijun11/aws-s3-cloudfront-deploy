import React from 'react';
import { User, Mail, Calendar, PieChart, Activity } from "lucide-react";
import MyInfo from '../components/myinfo/MyInfo';
import Assets from '../components/myinfo/Assets';
import Statistics from '../components/myinfo/Statistics';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setNewsChecked } from '../Slice/newsuserSlice';
import { fetchUser } from '../Slice/userSlice';
const MyInfoPage = () => {
    const user = useSelector((state)=>state.user.login_id)
    const navigate = useNavigate();
    const dispatch = useDispatch();
        useEffect(() => {
            const check = async () => {
                const result = await dispatch(fetchUser());
                if (!result.payload?.login_id) { 
                    
                    navigate("/");
                    return;
                }
                dispatch(setNewsChecked())
            };
            check();
        }, []);



    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 px-6 py-8">
            <div className="mx-auto max-w-5xl space-y-6">
                {/* 프로필 카드 */}
                <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                    <MyInfo />
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* 자산 구성 */}
                    <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                        <Assets />
                    </section>

                    {/* 거래 통계 */}
                    <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                        <Statistics />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default MyInfoPage;