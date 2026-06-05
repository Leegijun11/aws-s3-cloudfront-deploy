import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchTrade = createAsyncThunk("trade/fetchTrade", async()=>{
    const res = await api.get("/trade");
    return res.data;
})
export const fetchTradeCount = createAsyncThunk("trade/fetchTradeCount", async()=>{
    const res = await api.get("/trade/count");
    return res.data;
})
export const addTradeAsync = createAsyncThunk("trade/addTrade", async (tradeData) => {
    const res = await api.post("/trade", tradeData);
    return res.data;
});

const tradeSlice = createSlice({

    name : 'trade',
    initialState: {
        trades :[],
        count : {"buy_count":0, "sell_count":0}
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchTrade.fulfilled,(state,action)=>{
            state.trades = action.payload;
        })
        .addCase(fetchTradeCount.fulfilled, (state, action)=>{
            state.count = action.payload;
        })
        .addCase(addTradeAsync.fulfilled, (state, action) => {
                state.trades.unshift(action.payload);
        });
    }

})
export default tradeSlice.reducer;