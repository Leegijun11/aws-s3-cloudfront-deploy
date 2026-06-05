import React from 'react';
import { useSelector } from 'react-redux';
import { CHART_CONFIG } from '@/config';
import ChartList from './ChartList';
import Candle from './Candle';

const CHART_HEIGHT = CHART_CONFIG.CHART_HEIGHT; // 화면에서 차트가 차지할 세로길이 지정
const MAX_COUNT = CHART_CONFIG.CHART_MAX_COUNT;   // 화면에 보여줄 최대 캔들 개수 지정


const ChartArea = () => {
  const chartDataObj = useSelector((state) => state.chartuser.chartuserlist_code);
  
  const candleData = chartDataObj?.list || []; //리스트만 빼겠다
  const item_name = chartDataObj?.item_name || "종목명"; // 종목 이름을 빼겠다. 이름없으면 기본값 
  const item_code = candleData[0]?.item_code || ""; // 그냥 다 item 코드 같으니 0번째에서 item_code뺌

  if (candleData.length === 0) {
  return (
    <div className="w-full rounded-xl bg-[#f7f7f7] p-4">
      <div className="flex min-w-0 gap-3 p-3">
        {/* Y축 자리 유지 */}
        <div
          className="relative w-14 shrink-0"
          style={{ height: `${CHART_HEIGHT}px` }}
        />

        {/* 차트 영역 자리 유지 */}
        <div className="relative w-full min-w-0 flex-1 overflow-hidden rounded-lg bg-[#eef1f5] p-3">
          <div
            className="flex items-center justify-center text-sm font-semibold text-gray-400"
            style={{ height: `${CHART_HEIGHT + 15}px` }}
          >
            종목을 선택해주세요
          </div>
        </div>
      </div>
    </div>
  );
}

  const getNiceStep = (rawStep) => {
    const exponent = Math.floor(Math.log10(rawStep));
    const base = 10 ** exponent;
    const fraction = rawStep / base;

    if (fraction <= 1) return 1 * base;
    if (fraction <= 2) return 2 * base;
    if (fraction <= 5) return 5 * base;
    return 10 * base;
  };

  const getYAxisTicks = (min_price, max_price) => {
    const range = max_price - min_price;

    // 4구간 → step 후보
    const rawStep = range / 4;

    const step = getNiceStep(rawStep);

    // min보다 작거나 같은 값으로 시작
    let start = Math.floor(min_price / step) * step;

    // 5개 만들기
    let ticks = Array.from({ length: 5 }, (_, i) => start + step * i);

    // max 포함 안 되면 한 칸 위로 이동
    if (ticks[4] < max_price) {
      start += step;
      ticks = Array.from({ length: 5 }, (_, i) => start + step * i);
    }

    // 큰 값부터 반환
    return ticks.reverse();
  };

  // 이것들은 현재 차트 데이터 목록 이용해서 계산
  const min_price = Math.min(...candleData.map(item => item.min_price));
  const max_price = Math.max(...candleData.map(item => item.max_price));
  const priceTicks = getYAxisTicks(min_price, max_price);
  const chart_high = priceTicks[0];
  const chart_low = priceTicks[priceTicks.length-1];

  // 가격을 y 좌표로 변환해줌
  const priceToY = (price) => {
    return ((chart_high - price) / (chart_high - chart_low)) * CHART_HEIGHT;
  }

  return (
    <div className="w-full rounded-xl bg-[#f7f7f7] p-4">
      <div className="mb-2 text-center text-sm font-semibold text-gray-600">
        {item_name}({item_code}) 현재가: {candleData?candleData[0].end_price.toLocaleString():""}
      </div>

      <div className="flex min-w-0 gap-3 p-3">
        {/* Y축 */}
        <div className="relative w-14 shrink-0" style={{ height: `${CHART_HEIGHT}px` }}>
          {priceTicks.map((price) => (
            <div
              key={price}
              className="absolute right-0 text-sm text-gray-600 leading-none"
              style={{
                top: `${priceToY(price)}px`,
                transform: "translateY(50%)"
              }}
            >
              {price.toLocaleString()}
            </div>
          ))}
        </div>

        {/* 차트 영역 */}
        <div className="relative w-full min-w-0 flex-1 bg-[#eef1f5] rounded-lg p-3 overflow-hidden">

          <div className="relative" style={{ height: `${CHART_HEIGHT + 15}px` }}>
            {/* 가로선 */}
            {priceTicks.map((price) => (
              <div
                key={price}
                className="absolute left-0 w-full border-t border-gray-200"
                style={{ top: `${priceToY(price)}px` }}
              />
            ))}
            <ChartList candleData={[...candleData].sort((a, b) => a.day - b.day)} max_count={MAX_COUNT} priceToY={priceToY} />
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default ChartArea;