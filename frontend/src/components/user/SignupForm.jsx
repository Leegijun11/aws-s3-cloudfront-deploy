import React, { useState } from 'react';
import { AtSign, Lock, TrendingUp, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import FormHeader from '../common/form/FormHeader';
import FormTextInput from '../common/form/FormTextInput';
import FormButton from '../common/form/FormButton';
import AuthFooter from '../common/form/AuthFooter';
import api from '../../api/api';
import { useDispatch } from 'react-redux';
import { checkDuplicate } from '../../Slice/userSlice'; // userSlice에 checkDuplicate가 있다고 가정

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        user_id: '',
        user_nickname: '',
        user_password: '',
        password_check: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);
    
    // 중복 확인 메시지 상태 관리
    const [dupErrors, setDupErrors] = useState({ login_id: '', user_nickname: '' });
    // 중복 확인 결과 색상 관리를 위한 상태 (에러면 빨간색, 성공이면 파란색)
    const [isError, setIsError] = useState({ login_id: false, user_nickname: false });

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
        // 값을 수정하면 기존 중복 확인 메시지 초기화
        if (field === 'user_id') setDupErrors(prev => ({ ...prev, login_id: '' }));
        if (field === 'user_nickname') setDupErrors(prev => ({ ...prev, user_nickname: '' }));
    };

    // 중복 확인 로직
    const handleCheckDuplicate = async (field, value) => {
        if (!value) return;
        
        // API 파라미터 키 이름 맞추기 (login_id 또는 nickname)
        const checkField = field === 'user_id' ? 'login_id' : 'nickname';
        const resultAction = await dispatch(checkDuplicate({ [checkField]: value }));
        
        const stateKey = field === 'user_id' ? 'login_id' : 'user_nickname';

        if (checkDuplicate.rejected.match(resultAction)) {
            setDupErrors(prev => ({ ...prev, [stateKey]: resultAction.payload || "이미 사용 중입니다." }));
            setIsError(prev => ({ ...prev, [stateKey]: true }));
        } else {
            setDupErrors(prev => ({ ...prev, [stateKey]: `사용 가능한 ${field === 'user_id' ? '아이디' : '닉네임'}입니다.` }));
            setIsError(prev => ({ ...prev, [stateKey]: false }));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        // 모든 필드가 입력되었는지 확인 (공백 제외)
        if (!formData.user_id.trim() || !formData.user_nickname.trim() || !formData.user_password.trim()) {
            alert("가입 정보를 모두 입력해 주세요.");
            return;
        }

        // 가입 전 최종 체크
        if (isError.login_id || isError.user_nickname) {
            alert("중복된 아이디 혹은 닉네임입니다.");
            return;
        }

        // 비밀번호 길이 체크
        if (formData.user_password.length < 8) {
            alert("비밀번호는 8자 이상이어야 합니다.");
            return;
        }

        if (formData.user_password !== formData.password_check) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const payload = {
                login_id: formData.user_id,  
                user_nickname: formData.user_nickname,
                user_password: formData.user_password
            };

            const res = await api.post("/users", payload);
            if (res.data) {
                setIsSuccess(true);
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert(error.response?.data?.detail || "회원가입에 실패했습니다.");
            
            const detail = error.response?.data?.detail;
            let errorMessage = "회원가입에 실패했습니다.";

            if (Array.isArray(detail)) {
                // Pydantic 에러(배열)일 경우 메시지들만 추출하여 합침
                errorMessage = detail.map(err => err.msg).join("\n");
            } else if (typeof detail === 'string') {
                // 서비스 로직에서 직접 던진 에러(문자열)일 경우
                errorMessage = detail;
            }

            alert(errorMessage);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-sm text-center">
                <TrendingUp className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">가입을 축하합니다!</h2>
                <p className="text-gray-600 mb-6">
                    축하합니다! <br />
                    <span className="font-bold text-blue-600">시드머니 5,000만원</span>이 지급되었습니다.
                </p>
            <form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }}>
                <button 
                    type="submit"
                    autoFocus
                    className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                    로그인 하러가기
                </button>
            </form>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-sm">
            <FormHeader 
                icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
                title={"회원가입"}
                content={"투자 여정을 시작하세요"} 
            />
            <form className='mt-8 space-y-4' onSubmit={handleSignup}>
                <div>
                    <FormTextInput 
                        type={"text"} label={"아이디"} 
                        icon={<User className="mr-2 h-4 w-4 text-gray-400" />} 
                        placeholder={"kosdaqlover"} 
                        value={formData.user_id}
                        onChange={(e) => handleChange(e, 'user_id')}
                        onBlur={() => handleCheckDuplicate('user_id', formData.user_id)}
                    />
                    {dupErrors.login_id && (
                        <p className={`text-xs mt-1 ${isError.login_id ? 'text-red-500' : 'text-blue-500'}`}>
                            {dupErrors.login_id}
                        </p>
                    )}
                </div>

                <div>
                    <FormTextInput 
                        type={"text"} label={"닉네임"} 
                        icon={<AtSign className="mr-2 h-4 w-4 text-gray-400"/>} 
                        placeholder={"코스닥러버"} 
                        value={formData.user_nickname}
                        onChange={(e) => handleChange(e, 'user_nickname')}
                        onBlur={() => handleCheckDuplicate('user_nickname', formData.user_nickname)}
                    />
                    {dupErrors.user_nickname && (
                        <p className={`text-xs mt-1 ${isError.user_nickname ? 'text-red-500' : 'text-blue-500'}`}>
                            {dupErrors.user_nickname}
                        </p>
                    )}
                </div>

                <FormTextInput 
                    type={"password"} label={"비밀번호"} 
                    icon={<Lock className="mr-2 h-4 w-4 text-gray-400"/>} 
                    placeholder={"8자 이상 입력해주세요."} 
                    value={formData.user_password}
                    onChange={(e) => handleChange(e, 'user_password')}
                />
                
                <FormTextInput 
                    type={"password"} label={"비밀번호 확인"} 
                    icon={<Lock className="mr-2 h-4 w-4 text-gray-400"/>} 
                    placeholder={"한번 더 입력해주세요."} 
                    value={formData.password_check}
                    onChange={(e) => handleChange(e, 'password_check')}
                />

                <FormButton content={"가입하기"} type="submit" />
            </form>
            <AuthFooter type={"signup"} />
        </div>
    );
};

export default SignupForm;