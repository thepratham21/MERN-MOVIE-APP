import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchMovies = createAsyncThunk(
    "movies/fetch",
    async ({ page = 1 }) => {
        const res = await api.get(`/movies?page=${page}`);
        return res.data;
    }
);

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        totalPages: 0,
        page: 1,
        loading: false,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        clearMovies: (state) => {
            state.movies = [];
            state.totalPages = 0;
            state.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.movies;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setPage, clearMovies } = movieSlice.actions;
export default movieSlice.reducer;
