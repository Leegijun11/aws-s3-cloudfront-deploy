import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'
import Layout from './components/layout/Layout';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TradingPage from './pages/TradingPage';
import RankingPage from './pages/RankingPage';
import MyInfoPage from './pages/MyInfoPage';
const App = () => {

  return (
    <Routes>
      <Route path="/" element={<IntroPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route element={<Layout/>}>
        <Route path='/trading' element={<TradingPage/>}/>
        <Route path="/ranking" element={<RankingPage/>}/>
        <Route path="/myinfo" element={<MyInfoPage/>}/>
      </Route>
    </Routes>
  );
};

export default App;