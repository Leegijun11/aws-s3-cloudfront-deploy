import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import axios from "axios";

export const fetchMyBalance  = createAsyncThunk("balance/fetchMyBalance", async () =>{
    const res = await api.get("/balance");
    return res.data;
})


const balanceSlice = createSlice ({
    name : 'balance',
    initialState:{
        my_balance : []
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMyBalance.fulfilled, (state,action)=>{
            state.my_balance = action.payload;
                    

        })
    }
})

export default balanceSlice.reducer;