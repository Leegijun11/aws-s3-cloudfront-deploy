import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// 중복 확인 Thunk
export const checkDuplicate = createAsyncThunk(
    "user/checkDuplicate",
    async ({ login_id, nickname }, { rejectWithValue }) => {
        try {
            const params = login_id ? { login_id } : { nickname };
            // 💡 끝에 붙어있던 슬래싱(/)을 지우고 깔끔하게 매pping합니다.
            const res = await api.get("/users/check-duplicate", { params }); 
            return res.data; 
        } catch (err) {
            return rejectWithValue(err.response?.data?.detail || "중복 확인 중 오류 발생");
        }
    }
);

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    // 💡 /users/me 구조도 정석적입니다. 그대로 유지하되 끝에 슬래시가 없는 상태입니다.
    const res = await api.get("/users/me");
    return res.data;
});

export const updateUser = createAsyncThunk("user/updateUser", async (updateData) => {
    const res = await api.put("/users", updateData);
    return res.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
    const res = await api.post("/users/logout");
    return res.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (password) => {
    const res = await api.delete("/users", { data: { password } });
    return res.data;
});

// ... 아래 userSlice 선언 및 extraReducers 로직은 기존과 완전히 동일하므로 생략합니다.
const userSlice = createSlice({
    name: 'user',
    initialState: {
        login_id: null,
        user_nickname: null,
        money: 0,
        valuation: 0,
        created_at: null,
        refresh_token: null,
        isLoggedIn: false,
        status: 'idle',
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            const { login_id, user_nickname, money, valuation, created_at, refresh_token } = action.payload;
            state.login_id = login_id;
            state.user_nickname = user_nickname;
            state.money = money;
            state.valuation = valuation;
            state.created_at = created_at;
            state.refresh_token = refresh_token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkDuplicate.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(checkDuplicate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const { login_id, user_nickname, money, valuation, created_at, refresh_token } = action.payload;
                state.login_id = login_id;
                state.user_nickname = user_nickname;
                state.money = money;
                state.valuation = valuation;
                state.created_at = created_at;
                state.refresh_token = refresh_token;
                state.isLoggedIn = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
            .addCase(logout.fulfilled, (state) => {
                state.login_id = null;
                state.user_nickname = null;
                state.money = 0;
                state.valuation = 0;
                state.created_at = null;
                state.refresh_token = null;
                state.isLoggedIn = false;
                state.error = null;
            });
    }
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
