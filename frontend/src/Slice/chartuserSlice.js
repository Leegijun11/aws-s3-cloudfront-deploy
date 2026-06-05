import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// 전체 종목 리스트 조회
export const fetchChartUser = createAsyncThunk("chartuser/fetchChartUser", async () => {
    const res = await api.get("/chartuser/items");
    return res.data;
});

// 특정 종목 상세 조회
export const fetchChart_code = createAsyncThunk("chartuser/fetchChart_code", async (item_code) => {
    const res = await api.get(`/chartuser/items/${item_code}`);
    return res.data;
});

export const fetchChart_init = createAsyncThunk("chartuser/fetchChart_init", async()=>{
    const res = await api.post("/chartuser/init")
    return res.data;
})

const chartuserSlice = createSlice({
    name: 'chartuser',
    initialState: {
        chartuserlist: { list: [] },      
        chartuserlist_code: null, 
        chart_init : false
    },
    reducers: {
        next_chart: (state, action) => {
            if (action.payload) {
                state.chartuserlist = action.payload;
            }
        },
        toggleWish: (state, action) => {
            const items = state.chartuserlist?.list;
            if (!items) return;
            
            const stock = items.find(s => s.item_code === action.payload);
            if (stock) {
                stock.is_wish = !stock.is_wish;
            }
        },
        syncWishlist: (state, action) => {
            const wishCodes = action.payload; 
            if (state.chartuserlist?.list) {
                state.chartuserlist.list = state.chartuserlist.list.map(stock => ({
                    ...stock,
                    is_wish: wishCodes.includes(stock.item_code)
                }));
            }
        },
        delChart_code:(state,action)=>{
            state.chartuserlist_code = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChartUser.fulfilled, (state, action) => {
                const data = action.payload;
                if (data && data.list) {
                    state.chartuserlist = {
                        ...data,
                        list: data.list.map(stock => ({ ...stock, is_wish: false }))
                    };
                } else if (Array.isArray(data)) {
                    state.chartuserlist = {
                        list: data.map(item => ({
                            ...item,
                            is_wish: false
                        }))
                    };
                }
            })
            .addCase(fetchChart_code.fulfilled, (state, action) => {
                const data = action.payload;
                state.chartuserlist_code ={
                    item_name : data.item_name || "",
                    list : Array.isArray(data) ? data : (data.list || [])
                }
            })
            .addCase(fetchChart_init.fulfilled, (state,action)=>{
                state.chart_init = action.payload;
            });
    }
});

export const { next_chart, toggleWish,syncWishlist, delChart_code } = chartuserSlice.actions;
export default chartuserSlice.reducer;