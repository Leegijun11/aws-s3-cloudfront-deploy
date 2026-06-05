import React, { useState, useEffect } from 'react';
import StockListArea from '../components/traiding/stock/StockListArea';
import ChartArea from '../components/traiding/stockchart/ChartArea';
import NewsArea from '../components/news/NewsArea';
import AccountSummary from '../components/traiding/account/AccountSummary';
import BalanceSummary from '../components/traiding/account/BalanceSummary';
import TradePanel from '../components/traiding/trade/TradePanel';
import HistoryArea from '../components/traiding/HistoryArea';
import NewsModal from '../components/modal/NewsModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews_last, fetchNewsUser, setNewsChecked } from '../Slice/newsuserSlice';
import { resetLastNews } from '../Slice/newsuserSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../Slice/userSlice';
import { fetchChart_code, fetchChartUser } from '../Slice/chartuserSlice';
const TradingPage = () => {
    const [isNewsOpen, setIsNewsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const last_news = useSelector((state) => state.newsuser.last_news);    
    const news_checked = useSelector((state) => state.newsuser.news_checked); 
    


    useEffect(() => {
        const loadNews = async () => {
            const userResult = await dispatch(fetchUser()); 
            
            if (!userResult.payload?.login_id) {
                
                navigate("/");
                return;
            }

            await dispatch(fetchNews_last());
            //await dispatch(fetchChartUser());
            const chartResult = await dispatch(fetchChartUser());
            const firstCode = chartResult.payload?.list?.[0]?.item_code;
            if(firstCode){
                await dispatch(fetchChart_code(firstCode));
            }
           
        };
        loadNews();
    }, []);

    useEffect(() => {
        if (last_news && !news_checked) {  
            setIsNewsOpen(true);
        }
    }, [last_news, news_checked]);
    const handleNewsClose = async () => {
        await dispatch(fetchNewsUser());
        await dispatch(setNewsChecked());
        await dispatch(resetLastNews())
        setIsNewsOpen(false);
    };    
    return (
        <div className="grid grid-cols-12 gap-4 px-4 py-3">
            <section className="col-span-12 lg:col-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <StockListArea />
            </section>
            <section className="col-span-12 lg:col-span-8 min-w-0 space-y-4 flex flex-col">
                <ChartArea />
                <NewsArea />
                <HistoryArea />
            </section>
            <section className="col-span-12 lg:col-span-2 min-w-0 space-y-4">
                <AccountSummary />
                <BalanceSummary />
                <TradePanel />
                {/* <HistoryArea /> */}
            </section>
            {/* ✅ 뉴스 모달 */}
            <NewsModal
                
                isNewsOpen={isNewsOpen}
                onClose={handleNewsClose}
            />
        </div>
        
    );
};

export default TradingPage;