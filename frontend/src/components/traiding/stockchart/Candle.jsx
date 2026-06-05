import React from 'react';
import { CHART_CONFIG } from '@/config';

const Candle = ({ item, showLabel, priceToY }) => {
  const chart_height = CHART_CONFIG.CHART_HEIGHT;

  const isUp = item.end_price >= item.start_price;

  const wickTop = priceToY(item.max_price);
  const wickBottom = priceToY(item.min_price);

  const bodyTop = priceToY(Math.max(item.start_price, item.end_price));
  const bodyBottom = priceToY(Math.min(item.start_price, item.end_price));
  const bodyHeight = Math.max(bodyBottom - bodyTop, 4);

  const candleColor = isUp ? "bg-red-500" : "bg-blue-600";
  const wickColor = isUp ? "bg-red-600" : "bg-blue-700";

  return (
    <div className="group relative flex flex-col items-center">
      {/* 툴팁 */}
      <div className="pointer-events-none absolute -top-4 z-30 hidden w-max rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow-lg group-hover:block">
        <div className="mb-1 font-semibold text-gray-800">{item.label}</div>
        <div>{item.day}일차</div>
        <div>시가: {item.start_price.toLocaleString()}</div>
        <div>종가: {item.end_price.toLocaleString()}</div>
        <div>고가: {item.max_price.toLocaleString()}</div>
        <div>저가: {item.min_price.toLocaleString()}</div>
      </div>

      <div className="relative w-full" style={{ height: `${chart_height}px` }}>
        {/* 심지 */}
        <div
          className={`absolute left-1/2 w-px -translate-x-1/2 ${wickColor}`}
          style={{
            top: `${wickTop}px`,
            height: `${Math.max(wickBottom - wickTop, 2)}px`,
          }}
        />

        {/* 몸통 */}
        <div
          className={`absolute left-1/2 w-3 -translate-x-1/2 ${candleColor}`}
          style={{
            top: `${bodyTop}px`,
            height: `${bodyHeight}px`,
          }}
        />
      </div>

      {/* 🔥 3칸마다 라벨 */}
      <div className="mt-1 h-4 text-[10px] text-gray-600">
        {showLabel ? item.day : ""}
      </div>
    </div>
  );
}

export default Candle;