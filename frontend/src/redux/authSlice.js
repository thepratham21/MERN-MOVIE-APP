import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", data);
            return {
                token: res.data.token,
                role: res.data.user.role,
            };
        } catch (err) {
            return rejectWithValue(err.response?.data || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: token || null,
        role: role || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.error = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.role = action.payload.role;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("role", action.payload.role);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
