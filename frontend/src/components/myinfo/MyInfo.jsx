import { Calendar, Mail, TrendingDown, TrendingUp, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser, updateUser, deleteUser } from '../../Slice/userSlice';
import { fetchMyBalance } from '../../Slice/balanceSlice';
import { CONSTANTS_CONFIG } from '@/config';

const MyInfo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { money, user_nickname, login_id, created_at } = useSelector((state) => state.user);
    const { my_balance } = useSelector((state) => state.balance);

    const [isEditModal, setIsEditModal] = useState(false);
    const [editNickname, setEditNickname] = useState("");
    const [editPassword, setEditPassword] = useState("");

    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchMyBalance());
    }, [dispatch]);

    const handleOpenEdit = () => {
        setEditNickname(user_nickname || "");
        setEditPassword("");
        setIsEditModal(true);
    };

    const handleUpdate = async () => {
        if (!editNickname.trim()) {
            alert("닉네임을 입력해주세요.");
            return;
        }
        await dispatch(updateUser({ 
            user_nickname: editNickname,
            new_password: editPassword || undefined
        }));
        setIsEditModal(false);
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteUser(deletePassword)).unwrap();
            alert("그동안 이용해 주셔서 감사합니다. 다음에 또 만나요.")
            navigate("/");
        } catch (error) {
            setDeleteError(error?.detail || "비밀번호가 올바르지 않습니다.");
            setDeletePassword("");
        }
    };

    if (!login_id) {
            return <div>사용자 정보를 불러오는 중입니다...</div>;
    }

    const safeBalance = Array.isArray(my_balance) ? my_balance : [];
    const totalStockValue = safeBalance.reduce((acc, cur) => acc + (cur.val_price || 0), 0);
    const totalAssets = (money || 0) + totalStockValue;


    const seed_money = CONSTANTS_CONFIG.SEED_MONEY;
    const profitAmount = totalAssets - seed_money; 
    const profitRate = profitAmount / seed_money * 100;


    const formatDate = (dateString) => {
        if (!dateString) return "정보 없음";
        const date = new Date(dateString);
        const yy = String(date.getFullYear()).slice(-2); 
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        return `${yy}년 ${mm}월 ${dd}일`;
    };

    return (<>
            <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white">
                    <User size={42} />
                </div>

                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-semibold text-gray-800">{user_nickname}</h2>
                        <button
                            onClick={()=>handleOpenEdit()}
                            className="text-xs font-medium text-blue-500 hover:underline hover:cursor-pointer">
                            내 정보 수정
                        </button>
                        <button
                            onClick={() => { setIsDeleteMode(true); setDeleteError(""); setDeletePassword(""); }}
                            className="text-xs font-medium text-red-400 hover:underline hover:cursor-pointer">
                            회원 탈퇴
                        </button>
                    </div>

                    <div className="mt-3 flex items-center gap-5 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <User size={16} />
                            {login_id}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {formatDate(created_at)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="my-7 border-t border-gray-100" />

            <div className="grid grid-cols-3 gap-8">
                <div>
                    <p className="text-sm text-gray-500">총 자산</p>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">₩{totalAssets.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">수익금</p>
                    <p className={`mt-2 text-2xl font-semibold ${profitAmount >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {profitAmount>=0?"+":""}₩{profitAmount.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">수익률</p>
                    <div className={`mt-2 flex items-center text-2xl font-semibold ${profitRate >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {profitRate>=0?<TrendingUp size={18} />:<TrendingDown size={18} />}
                        <span className="ml-1">
                            {profitRate>=0?" +":" "}
                            {profitRate.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>

            {isEditModal && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[20vh]" onClick={() => setIsEditModal(false)}>
                    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl text-left" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-gray-800">내 정보 수정</h3>
                        <p className="mt-2 text-sm text-gray-500">변경할 닉네임과 비밀번호를 입력하세요.</p>
                        
                        <div className="mt-5 space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">새 닉네임 (선택)</label>
                                <input
                                    type="text"
                                    value={editNickname}
                                    onChange={(e) => setEditNickname(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">새 비밀번호 (선택)</label>
                                <input
                                    type="password"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    placeholder="변경을 원하시면 새 비밀번호를 입력해주세요."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setIsEditModal(false)}
                                className="flex-1 rounded-lg border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                                취소
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="flex-1 rounded-lg bg-blue-500 py-2 text-sm text-white hover:bg-blue-600 cursor-pointer">
                                수정 완료
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteMode && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[20vh]" onClick={() => setIsDeleteMode(false)}>
                    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-gray-800">회원 탈퇴</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            모든 데이터가 삭제되며 복구할 수 없습니다.<br />
                            정말 탈퇴하시려면 비밀번호를 입력해 주세요.
                        </p>
                        <input
                            type="password"
                            value={deletePassword}
                            onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(""); }}
                            placeholder="비밀번호 입력"
                            className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-400 focus:outline-none"
                        />
                        {deleteError && (
                            <p className="mt-2 text-xs text-red-500">{deleteError}</p>
                        )}
                        <div className="mt-5 flex gap-3">
                            <button
                                onClick={() => setIsDeleteMode(false)}
                                className="flex-1 rounded-lg border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                                취소
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={!deletePassword}
                                className="flex-1 rounded-lg bg-red-500 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-40 cursor-pointer">
                                탈퇴하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyInfo;