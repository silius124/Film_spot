import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovie = createAsyncThunk("movie/getMovies", async (title) => {
  if (title === null) {
    throw new Error("Пустое значение");
  }
  const res = await axios.get(
    `https://www.omdbapi.com/?apikey=6007e8be&s=${title}&type=movie&page=1`
  );
  if (res.data.Error) {
    throw new Error("Ошибка!");
  }
  return res.data;
});

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    moviesList: [],
    favourites: [],
    status: "idle",
    filters: ["all", "favourite", "recent"],
  },
  reducers: {
    addToFavourite(state, action) {
      if (
        state.favourites.findIndex(
          (el) => el.imdbID === action.payload.imdbID
        ) < 0
      ) {
        state.favourites.push(action.payload);
      } else {
        return;
      }
    },
    deleteFromFavourite(state, action) {
      state.favourites.splice(
        state.favourites.findIndex((el) => el.imdbID === action.payload.imdbID),
        1
      );
    },
    clearMovieList(state) {
      state.moviesList = [];
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

export const { addToFavourite, deleteFromFavourite, clearMovieList } =
  movieSlice.actions;
export default movieSlice.reducer;
