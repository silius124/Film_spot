import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk(
  "movie/getMovies",
  async ({ title, index }) => {
    if (title === null) {
      throw new Error("Пустое значение");
    }
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=6007e8be&s=${title}&type=movie&page=${index}`
      );
      if (res.data.Error) {
        throw new Error("Ошибка!");
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getMovie = createAsyncThunk(
  "movie/getMovie",
  async ({ title }) => {
    if (title === null) {
      throw new Error("Пустое значение");
    }
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=6007e8be&t=${title}&type=movie`
    );
    if (res.data.Error) {
      throw new Error("Ошибка!");
    }
    return res.data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    moviesList: [],
    movie: {},
    recent: [],
    favourites: [],
    status: "idle",
    filters: [
      { name: "all", icon: null },
      { name: "favourite", icon: "src/assets/favourite.svg" },
      { name: "recent", icon: "src/assets/recent.svg" },
    ],
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
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "successed";
        state.moviesList = [...action.payload.Search];
      })
      .addCase(getMovies.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.status = "successed";
        state.movie = { ...action.payload };
      });
  },
});

export const { addToFavourite, deleteFromFavourite, clearMovieList } =
  movieSlice.actions;
export default movieSlice.reducer;
