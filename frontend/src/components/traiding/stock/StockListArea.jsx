import React, { useState } from 'react';
import FilterButtonArea from './FilterButtonArea';
import StockList from './StockList';

const StockListArea = () => {

    const [selectedStockFilter, setSelectedStockFilter] = useState("전체");

    return (
        <>
            <div className="px-4 py-3">
                <div>
                    <div className="inline-block border-b-2 border-blue-500 pb-2 text-sm font-semibold text-blue-600">
                        국내주식
                    </div>
                </div>
                <FilterButtonArea selectedStockFilter={selectedStockFilter} setSelectedStockFilter={setSelectedStockFilter}/>
            </div>
            <StockList filterName={selectedStockFilter}/>
        </>
    );
};

export default StockListArea;