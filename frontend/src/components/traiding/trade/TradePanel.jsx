import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addTradeAsync } from './../../../Slice/tradeSlice';
import { fetchMyBalance } from '../../../Slice/balanceSlice';
import { fetchUser } from '../../../Slice/userSlice';
import RoundedButton from '../../common/RoundedButton';

// 오른쪽 매수/매도 패널
const TradePanel = () => {
    const chartDataObj = useSelector((state) => state.chartuser.chartuserlist_code);
    const chartData = chartDataObj?.list || [];
    const dispatch = useDispatch();


    // 오름차순후 젤 마지막 값을 꺼내서 반환
    const latestData = [...chartData].sort((a, b) => a.day - b.day)[chartData.length - 1];

    const money = useSelector((state)=>state.user.money);
    const balances = useSelector((state)=>state.balance.my_balance);

    const [quantity, setQuantity] = useState(0);
    const maxQuantity = useRef(0);    // 렌더링 안하고 계산에만 쓰려고 Ref로 사용
    const remainQuantity = useRef(0);
    const [targetPrice, setTargetPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // 추가한부분(윤호)
    const [tradeType, setTradeType] = useState(""); // 추가한부분(윤호)

    const itemCode = latestData?.item_code || "종목 미선택";
    const unitPrice = latestData?.end_price || 0; 

    // 현재 선택된 종목의 잔고 정보
    const currentBalance = balances.find((balance)=>balance.item_code==itemCode);
    maxQuantity.current = Math.floor(money/unitPrice);
    if(currentBalance){
        remainQuantity.current = currentBalance.quantity;
    }else{
        remainQuantity.current = 0;
    }

    const onQuantityChange = (e) => {
        setTargetPrice(0);
        const val = parseInt(e.target.value);
        const maximum_quantity = Math.max(maxQuantity.current, remainQuantity.current);
        if(isNaN(val) || val < 0 || itemCode==="종목 미선택"){
            setQuantity(0);
        }else if(val > maximum_quantity){
            setQuantity(maximum_quantity);
        }else{
            setQuantity(val);
        }
    }

    const onTargetPriceChange = (e) => {
        const val = parseInt(e.target.value);
        const maximum_quantity = Math.max(maxQuantity.current, remainQuantity.current);
        const maximum_price = Math.max(money, remainQuantity.current * unitPrice);
        if(isNaN(val) || val < 0 || itemCode==="종목 미선택"){
            setQuantity(0);
            setTargetPrice(0);
        }else if((val > money) && (val > maximum_price)){
            setQuantity(maximum_quantity);
            setTargetPrice(maximum_price);
        }else{
            setQuantity(Math.floor(val/unitPrice));
            setTargetPrice(val);
        }
    }

    const openConfirmModal = (type) => {    
        if (itemCode === "종목 미선택") {
            alert("종목을 선택해주세요.");
            return;
        }
        if (!quantity || Number(quantity) <= 0) {
            alert("수량을 입력해주세요.");
            return;
        }
        if(type=="buy" && (quantity * unitPrice > money)){
            alert("현금이 부족합니다.");
            return;
        }
        if(type=="sell" && (quantity > remainQuantity.current)){
            alert("보유수량이 부족합니다.");
            return;
        }
        setTradeType(type);
        setIsModalOpen(true);
    };
    const handleTrade = async(type) => {
        const tradeData = {
            item_code: itemCode,
            buy_type: type,
            price: unitPrice,
            quantity: quantity,
            trade_day: latestData.day >= 1 ? latestData.day : 1
            // 테스트를위해 일단 1넣음
        };

        await dispatch(addTradeAsync(tradeData));
        await dispatch(fetchMyBalance());
        await dispatch(fetchUser());
        setQuantity(0); // 입력창 초기화
        setTargetPrice(0);
        setIsModalOpen(false);
    };

    useEffect(()=>{
        setQuantity(0);
        setTargetPrice(0);
    }, [latestData]);

    return (
        <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="mb-2 text-lg font-semibold">거래</div>

                <div className="flex flex-wrap gap-2 py-3">
                    <RoundedButton content={"가능수량"} onClick={()=>setQuantity(maxQuantity.current)}/>
                    <RoundedButton content={"보유수량"} onClick={()=>setQuantity(remainQuantity.current)}/>
                </div>

                <label className="mb-2 block text-sm font-medium text-gray-600">
                    수량
                </label>
                <div className="relative">
                    <input
                        type="number"
                        value={quantity.toString()}
                        onChange={(e) => onQuantityChange(e)}
                        className="mb-2 w-full rounded-xl border border-blue-400 px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>
                <label className="mb-2 block text-sm font-medium text-gray-600">
                    희망가격
                </label>
                <div className="relative">
                    <input
                        type="number"
                        value={targetPrice.toString()}
                        onChange={(e) => onTargetPriceChange(e)}
                        className="mb-2 w-full rounded-xl border border-blue-400 px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                        <span>수량</span>
                        <span>{quantity>0?quantity:"-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>1주 가격</span>
                        <span>{unitPrice?unitPrice.toLocaleString():"-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>총 금액</span>
                        <span>{quantity>0?(unitPrice*quantity).toLocaleString():"-"}</span>
                    </div>
                </div>
                
                <div className="mt-5 grid grid-cols-2 gap-3">
                <button 
                    onClick={() => openConfirmModal("buy")}
                    className="rounded-xl bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600 cursor-pointer">
                    매수
                </button>
                <button 
                    onClick={() => openConfirmModal("sell")}
                    className="rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer">
                    매도
                </button>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {tradeType === "buy" ? "🔴 매수하시겠습니까?" : "🔵 매도하시겠습니까?"}
                        </h2>
                        
                        <div className="space-y-3 text-sm text-gray-600 mb-6 border-y py-4">
                            <div className="flex justify-between">
                                <span>종목코드</span>
                                <span className="font-semibold text-black">{itemCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>주당 가격</span>
                                <span className="font-semibold text-black">{unitPrice.toLocaleString()} 원</span>
                            </div>
                            <div className="flex justify-between">
                                <span>신청수량</span>
                                <span className="font-semibold text-black">{quantity.toLocaleString()} 주</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t font-bold">
                                <span>총 금액</span>
                                <span className={tradeType === 'buy' ? 'text-rose-500' : 'text-blue-600'}>
                                    {(unitPrice * quantity).toLocaleString()} 원
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 rounded-xl bg-gray-100 py-3 font-semibold text-gray-600 hover:bg-gray-200 cursor-pointer">
                                취소
                            </button>
                            <button 
                                onClick={() => handleTrade(tradeType)}
                                className={`flex-1 rounded-xl py-3 font-semibold text-white cursor-pointer ${
                                    tradeType === 'buy' ? 'bg-rose-500 hover:bg-rose-600': 'bg-blue-600 hover:bg-blue-700'
                                }`}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}            
        </div>
    );
};

export default TradePanel;