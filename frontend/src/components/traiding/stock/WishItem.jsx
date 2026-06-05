import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChart_code } from '../../../Slice/chartuserSlice';

const WishItem = () => {
    const dispatch = useDispatch();
    const stockData = useSelector((state) => state.chartuser.chartuserlist);
    const items = (stockData?.list || []).filter(stock => stock.is_wish === true);

    return (
        <div>
            <h2>관심 종목</h2>
            {items.length > 0 ? (
                items.map((stock) => (
                    <div key={stock.item_code} onClick={() => dispatch(fetchChart_code(stock.item_code))}>
                        <h4>{stock.item_name} ({stock.item_code})</h4>
                        <p>카테고리: {stock.category_name}</p>
                        <p>현재가: {stock.end_price?.toLocaleString()}원</p>
                        <p>수익률: {stock.flu_range_percent}%</p>
                    </div>
                ))
            ) : (
                <p>관심 종목이 없습니다.</p>
            )}
        </div>
    );
};

export default WishItem;