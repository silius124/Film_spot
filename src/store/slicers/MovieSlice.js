import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk(
  "movie/getMovies",
  async ({ title, index }) => {
    try {
      if (title === null) {
        throw new Error("Пустое значение");
      }

      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=6007e8be&s=${title}&type=movie&page=${index}`,
      );
      if (res.data.Error) {
        throw new Error("Ошибка!");
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getMovie = createAsyncThunk(
  "movie/getMovie",
  async ({ title }) => {
    if (title === null) {
      throw new Error("Пустое значение");
    }
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=6007e8be&t=${title}&type=movie`,
    );
    if (res.data.Error) {
      throw new Error("Ошибка!");
    }
    return res.data;
  },
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
      { name: "favourite", icon: "./icons/favourite.svg" },
      { name: "recent", icon: "./icons/recent.svg" },
    ],
  },
  reducers: {
    toggleFavourite(state, action) {
      if (
        state.favourites.findIndex(
          (el) => el.imdbID === action.payload.imdbID,
        ) < 0
      ) {
        state.favourites.push(action.payload);
      } else {
        state.favourites.splice(
          state.favourites.findIndex(
            (el) => el.imdbID === action.payload.imdbID,
          ),
          1,
        );
      }
    },
    addToRecent(state, action) {
      if (
        state.recent.findIndex(
          (movie) => movie.imdbID === action.payload.imdbID,
        ) < 0
      ) {
        state.recent.push(action.payload);
      } else {
        return;
      }
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
        if (action.payload) {
          state.status = "successed";
          state.moviesList = [...action.payload.Search];
        } else {
          state.status = "failed";
        }
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

export const { toggleFavourite, clearMovieList, addToRecent } =
  movieSlice.actions;
export default movieSlice.reducer;
