import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovie = createAsyncThunk("movie/getMovies", async (title) => {
  const res = await axios.get(
    `https://www.omdbapi.com/?apikey=6007e8be&s=${title}&type=movie&page=1`
  );
  return res.data;
});

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    moviesList: [],
    favourite: [],
    status: "idle",
    filter: "all" | "favourite" | "recent",
  },
  reducers: {
    addToFavourite(state, action) {
      state.favourite.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.status = "successed";
        state.moviesList = [...action.payload.Search];
      })
      .addCase(getMovie.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addToFavourite } = movieSlice.actions;
export default movieSlice.reducer;
