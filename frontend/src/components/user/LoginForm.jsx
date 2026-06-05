import { Lock, TrendingUp, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import FormHeader from '../common/form/FormHeader';
import FormTextInput from '../common/form/FormTextInput';
import FormButton from '../common/form/FormButton';
import AuthFooter from '../common/form/AuthFooter';
import api from '../../api/api';
import { useDispatch } from 'react-redux';
import { fetchUser, login } from '../../Slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { fetchChart_init } from '../../Slice/chartuserSlice';
import { fetchProgress } from '../../Slice/progressSlice';
import { fetchNews_init, fetchNews_last } from '../../Slice/newsuserSlice';
import { resetAllNews } from '../../Slice/newsuserSlice';
const LoginForm = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const handleLogin = async (e) => {
        e.preventDefault(); 

        try {
            const res = await api.post("/users/token", {
                login_id: loginId,
                user_password: password
            });

            const { access_token, user } = res.data;

            dispatch(login({ ...user }));
            await dispatch(fetchChart_init()); // 토큰이 없어서 회원가입에서 안됨
            await dispatch(resetAllNews());
            //await dispatch(fetchNews_init()); 
            //await dispatch(fetchChart_init());
            // dispatch(fetchProgress()); 내 진행일차를 어따보관하지 이거아닌거같은데
            const newsResult = await dispatch(fetchNews_last());
            if (!newsResult.payload){
                await dispatch(fetchNews_init());
                await dispatch(fetchNews_last());
            }
            alert("로그인 성공!, 트레이드 시작");
            navigator('/trading')

        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.detail || "로그인 중 오류가 발생했습니다.");
        } 
    }; 

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
            <FormHeader 
                icon={<TrendingUp className="h-8 w-8 text-blue-500"/>} 
                title={"로그인"}
                content={"모의 주식 투자에 오신 것을 환영합니다"} 
            />
            <form className='mt-8 space-y-4' onSubmit={handleLogin}>
                <FormTextInput 
                    type={"text"} 
                    label={"아이디"} 
                    icon={<User className="mr-2 h-4 w-4 text-gray-400" />} 
                    placeholder={"kosdaqlover"}
                    value={loginId} 
                    onChange={(e) => setLoginId(e.target.value)} 
                />
                <FormTextInput 
                    type={"password"} 
                    label={"비밀번호"} 
                    icon={<Lock className="mr-2 h-4 w-4 text-gray-400"/>} 
                    placeholder={"••••••••"}
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <FormButton content={"로그인"} type="submit" />
            </form>
            <AuthFooter type={"login"} />
        </div>
    );
};

export default LoginForm;