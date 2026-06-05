import { Search } from "lucide-react";
import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchChart_code, fetchChartUser, toggleWish, syncWishlist } from '../../../Slice/chartuserSlice'; 
import { addWishlistAsync, delWishlistAsync,fetchWishlistAsync } from '../../../Slice/wishlistSlice';
import StockItem from './StockItem';
import WishItem from './WishItem';


const StockList = ({filterName}) => {
    
    const dispatch = useDispatch();
    
    const stockData = useSelector((state) => state.chartuser.chartuserlist);
    
    const [items, setItems] = useState([]);

    const [search, setSearch] = useState('');

    const filteredItems = items.filter((item) =>
        item.item_name.toLowerCase().includes(search.toLowerCase()) ||
        item.item_code.includes(search) ||
        item.category_name.includes(search)
    );
    
    const handleWishClick = (e, stock) => {
        e.stopPropagation(); 
        dispatch(toggleWish(stock.item_code));

        if (!stock.is_wish) { //아직 dispatch전이라 업뎃안됨
            dispatch(addWishlistAsync(stock.item_code));
        } else {
            dispatch(delWishlistAsync(stock.item_code));
        }
    };
    useEffect(() => { // useEffect는 async 가 불가해서 await 쓰기위해
                        // 함수 넣음
        const init = async () => {
            // if (items.length === 0) {
            //     await dispatch(fetchChartUser());
            // }
            await dispatch(fetchChartUser());
            const result = await dispatch(fetchWishlistAsync());
            const wishCodes = (result.payload || []).map(w => w.item_code);
            dispatch(syncWishlist(wishCodes));
        };
        init();
    }, [dispatch]);

    useEffect(() => {
        let stock_list = stockData?.list || [];
        if (filterName === "관심종목"){
            stock_list = stock_list.filter(stock => stock.is_wish === true);
        }else if (filterName === "가나다순"){
            stock_list = [...stock_list].sort(
                (a, b) => a.item_name.localeCompare(b.item_name, "ko")
            );
        }else if (filterName === "카테고리순"){
            stock_list = [...stock_list].sort(
                (a, b) => a.category_name.localeCompare(b.category_name, "ko")
            );
        }else if (filterName === "등락폭순"){
            stock_list = [...stock_list].sort(
                (a, b) => Math.abs(b.flu_range_percent) - Math.abs(a.flu_range_percent)
            );
        }
        setItems(()=>stock_list);
    }, [stockData, filterName]);

    return (
        <div>
            <div className="px-4">
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder="종목명, 코드, 카테고리로 검색"
                        className="
                            w-full rounded-xl border border-gray-200 bg-gray-50
                            py-2.5 pl-10 pr-4
                            text-sm text-gray-700 placeholder:text-gray-400
                            outline-none transition
                            focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100
                        "
                    />

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                </div>
            </div>
            <div className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
                종목 리스트 ({filteredItems.length})
            </div>
            <div className="divide-y divide-gray-100 max-h-[65vh] overflow-y-auto cursor-pointer">
                {filteredItems.map((item) => (<div key={item.item_code}>
                        <StockItem item={item} 
                            onClick={()=>dispatch(fetchChart_code(item.item_code))}
                            handleWishClick={(e)=>handleWishClick(e, item)}
                        />
                    </div>
                ))}
          </div>
        </div>
    );
};

export default StockList;