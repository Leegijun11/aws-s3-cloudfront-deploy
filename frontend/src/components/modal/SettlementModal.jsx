import { useEffect } from 'react';
import{ useSelector, useDispatch } from 'react-redux';
import { fetchProgress } from '../../Slice/progressSlice';


const SettlementModal = ({ success,isOpen, onClose, day = 1 }) => {
  const dispatch = useDispatch();
  const data =useSelector((state)=>state.progress.next_data);

  useEffect(() => {
      if (success === true) {
          dispatch(fetchProgress()); 
      }
  }, [success, dispatch]); 
  if (!isOpen) return null;

  if (!data) {
    return <div>정산 데이터 불러오는 중...</div>;
  }

  const formatWon = (value) => `₩${value.toLocaleString()}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* 상단 제목 영역 */}
        <div className="bg-linear-to-r from-blue-500 to-purple-600 px-8 py-7 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/80">정산 완료</p>
              <h2 className="mt-1 text-3xl font-bold">
                {data.day-1}일차 트레이딩 결과
              </h2>
            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-white/20 px-4 py-2 text-sm hover:bg-white/30 cursor-pointer"
            >
              닫기
            </button>
          </div>

          {/* 요약 정보 */}
          <div className="mt-7 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-sm text-white/75">총 자산</p>
              <p className="mt-2 text-2xl font-bold">₩{data.today_asset.toLocaleString()}</p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-sm text-white/75">현금</p>
              <p className="mt-2 text-2xl font-bold">₩{data.cash.toLocaleString()}</p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-sm text-white/75">평가금액</p>
              <p className="mt-2 text-2xl font-bold">₩{data.valuation.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* 테이블 영역 */}
        <div className="px-8 py-6">
          <h3 className="mb-4 text-lg font-bold text-gray-900">잔고 목록</h3>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">종목명</th>
                  <th className="px-4 py-3 text-right font-medium">수량</th>
                  <th className="px-4 py-3 text-right font-medium">매입단가</th>
                  <th className="px-4 py-3 text-right font-medium">평가금액</th>
                  <th className="px-4 py-3 text-right font-medium">평가손익</th>
                  <th className="px-4 py-3 text-right font-medium">수익률</th>
                </tr>
              </thead>

              <tbody>
                {data.jongmok.map((item, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {item.item_name}
                    </td>
                    <td className="px-4 py-4 text-right">{item.quantity}</td>
                    <td className="px-4 py-4 text-right">
                     {(item.purchase_price/item.quantity).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-right">
                      {(item.val_price).toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-4 text-right font-semibold ${
                        item.val_profit_and_loss > 0
                          ? "text-red-500"
                          : item.val_profit_and_loss < 0
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      {item.val_profit_and_loss.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-4 text-right font-semibold ${
                        item.rate_of_return > 0
                          ? "text-red-500"
                          : item.rate_of_return < 0
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      {item.rate_of_return.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 하단 버튼 */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementModal;