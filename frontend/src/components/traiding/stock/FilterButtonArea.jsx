import React, { useState } from 'react';
import RoundedButton from '../../common/RoundedButton';

const FilterButtonArea = ({selectedStockFilter, setSelectedStockFilter}) => {
    const filterItems = ["전체", "가나다순", "관심종목", "카테고리순", "등락폭순"];

    return (
        <div className="flex flex-wrap gap-2 py-3">
            {filterItems.map((item) => (
                <div key={item}>
                    <RoundedButton
                        content={item}
                        onClick={()=>setSelectedStockFilter(item)}
                        isSeleted={item===selectedStockFilter}
                    />
                </div>
            ))}

        </div>
    );
};

export default FilterButtonArea;