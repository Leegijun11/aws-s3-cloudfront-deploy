import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Slice/userSlice'
import rankingReducer from '../Slice/rankingSlice'
import balanceReducer from '../Slice/balanceSlice'
import wishlistReducer from '../Slice/wishlistSlice'
import chartuserReducer from '../Slice/chartuserSlice'
import newsuserReducer from '../Slice/newsuserSlice'
import tradeReducer from '../Slice/tradeSlice'
import progressReducer from '../Slice/progressSlice'
export const store = configureStore({
    reducer : {
        user : userReducer,
        rank : rankingReducer,
        wishlist : wishlistReducer,
        trade : tradeReducer,
        progress : progressReducer,
        newsuser : newsuserReducer,
        chartuser : chartuserReducer,
        balance : balanceReducer
    }
})