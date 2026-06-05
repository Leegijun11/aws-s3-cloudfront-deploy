import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";


export const fetchProgress = createAsyncThunk("progress/fetchProgress",async()=>{
    const res = await api.get("/progress/next_data");
    return res.data;
})

export const fetchNextTurn = createAsyncThunk("progress/fetchNextTurn",async()=>
{
    const res = await api.put("/progress/next_turn");
    return res.data;
})
const progressSlice = createSlice({
    name : "progress",
    initialState:{
        next_data: null,
        next_turn : false
    },
    reducers:{
        resetNextTurn :(state)=>{
            state.next_turn=false;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProgress.fulfilled,(state,action)=>{
            state.next_data = action.payload;
        })
        .addCase(fetchNextTurn.fulfilled, (state,action)=>{
            state.next_turn = action.payload;
        })
    }



})

export const { resetNextTurn } = progressSlice.actions; 
export default progressSlice.reducer;