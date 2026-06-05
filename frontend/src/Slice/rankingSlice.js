import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import axios from "axios";
// 1. 내 랭킹 정보 조회 (ID 이용)
export const fetchMyRanking = createAsyncThunk("rank/fetchMyRanking", async () => {
   const res = await api.get("/ranking/me");
   return res.data;
 });

// 2. 상위 10명 조회 (내림차순)
export const fetchTopRankings = createAsyncThunk("rank/fetchTopRankings", async () => {
  const res = await api.get("/ranking");
  return res.data;
});
const rankingSlice = createSlice({
    name: 'rank',
    initialState:{
        myRanking: null,
        topRankings:[],
        all_rankings:0  
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(fetchMyRanking.fulfilled, (state,action)=>{
             state.myRanking = action.payload.my_ranking;
             state.all_rankings = action.payload.total_user;
         })
        .addCase(fetchTopRankings.fulfilled, (state,action)=>{
            state.topRankings =action.payload;
        })
    }


})

export default rankingSlice.reducer;