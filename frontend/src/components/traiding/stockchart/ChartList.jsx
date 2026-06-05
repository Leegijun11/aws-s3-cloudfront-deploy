import React from 'react';
import Candle from './Candle';

const ChartList = ({candleData, max_count, priceToY}) => {
    const emptyCount = Math.max(max_count - candleData.length, 0);

    return (
        <div 
            className={"relative z-10 grid gap-1"}
            style={{
                gridTemplateColumns: `repeat(${max_count}, minmax(0, 1fr))`,
            }}
        >
            {/* 30칸 고정 grid */}
            {/* 🔥 왼쪽 빈칸 */}
            {Array.from({ length: emptyCount }).map((_, i) => (
                <div key={`empty-${i}`} />
            ))}

            {/* 🔥 실제 데이터 */}
            {candleData.map((item, index) => {
                const showLabel = (index + 1) % 3 === 0;

                return (
                <Candle
                    key={item.day}
                    item={item}
                    showLabel={showLabel}
                    priceToY={priceToY}
                />
                );
            })}
        </div>
    );
};

export default ChartList;