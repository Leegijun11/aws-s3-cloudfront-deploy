import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import axios from "axios";

export const addWishlistAsync = createAsyncThunk(
    'wishlist/add',
    async (item_code, thunkAPI) => {
        const response = await api.post(`/wishlist/items/${item_code}`);
        return response.data; 
    }
);

export const delWishlistAsync = createAsyncThunk(
    'wishlist/delete',
    async (item_code, thunkAPI) => {
        await api.delete(`/wishlist/items/${item_code}`);
        return item_code; 
    }
);

export const fetchWishlistAsync = createAsyncThunk(
    'wishlist/fetchWishlistAsync',
    async () => {
        const response = await api.get('/wishlist');
        return response.data;
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlists: [] 
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(addWishlistAsync.fulfilled, (state, action) => {
                state.wishlists.push(action.payload);
            })
            .addCase(delWishlistAsync.fulfilled, (state, action) => {
                state.wishlists = state.wishlists.filter(
                    (item) => item.item_code !== action.payload
                );
            });
    }
});

export default wishlistSlice.reducer;