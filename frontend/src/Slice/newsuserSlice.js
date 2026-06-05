import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import axios from "axios";

export const fetchNewsUser = createAsyncThunk("newsuser/fetchNewsUser", async()=>{
    const res = await api.get("/newsuser");
    return res.data
})

export const fetchNews_init = createAsyncThunk("newsuser/fetchNews_init",async()=>{
    const res = await api.post("/newsuser/generate");
    return res.data
})

export const fetchNews_last = createAsyncThunk("newsuser/fetchNews_last", async () => {
    try {
        const res = await api.get("/newsuser/latest");
        return res.data;
    } catch (e) {
        return null; 
    }
});
const newsuserSlice = createSlice({
    name : 'newsuser',
    initialState :{
        newslist : [],
        today_news : null,
        last_news : null,
        news_checked : false
    },
    reducers:{
        resetLastNews: (state) => {
        state.last_news = null;
        
        },
        resetAllNews: (state) => {       
            state.last_news = null;
            state.news_checked = false;
        },
        setNewsChecked: (state) => {  
            state.news_checked = true;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNewsUser.fulfilled, (state,action)=>{
            state.newslist = action.payload;

        })
        .addCase(fetchNews_init.fulfilled,(state,action)=>{
            state.today_news = action.payload;
        })
        .addCase(fetchNews_last.fulfilled,(state,action)=>{
            state.last_news = action.payload ?? null;
        })
        .addCase(fetchNews_last.rejected, (state) => {
            state.last_news = null; // 에러시 null
        })
    }


})

export const { add_news, resetLastNews, resetAllNews, setNewsChecked } = newsuserSlice.actions;
export default newsuserSlice.reducer;