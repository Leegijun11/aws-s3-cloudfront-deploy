import { Star } from 'lucide-react';
import React from 'react';

const StockItem = ({item, onClick, handleWishClick}) => {

    const onWishClick = (e, item_code, isWish) => {
        // 관심종목 추가/삭제 클릭했을 때
        e.stopPropagation(); // 종목 자체도 클릭 이벤트 있으니까 별 눌렀을 떄는 버블링 방지 넣어줌
        alert("관심종목 추가 또는 삭제");
    }

    return (
        <div
            key={item.item_code}
            onClick={onClick}
            className={`flex w-full items-start justify-between px-4 py-4 text-left transition hover:bg-gray-50 ${
                item.active ? "bg-blue-50" : "bg-white"
            }`}
            >
            <div>
                <div className="flex items-center gap-1">
                <span className="font-semibold">{item.item_name}</span>
                <button onClick={(e)=>(handleWishClick(e, item))}>
                    <Star
                        size={14}
                        className={
                            item.is_wish
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                    />
                </button>
                </div>
                <div className="text-xs text-gray-400">{item.item_code}</div>
                <div className="mt-1 font-semibold">{"₩"+item.end_price.toLocaleString()}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <span
                className={`text-sm font-medium ${
                    item.flu_range_percent>0 ? "text-red-500" : "text-blue-500"
                }`}
                >
                {`${item.flu_range_percent>0?"+":""}${item.flu_range_percent.toFixed(2)}%`}
                </span>
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                {item.category_name}
                </span>
            </div>
        </div>
    );
};

export default StockItem;