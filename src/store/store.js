import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slicers/MovieSlice";
const store = configureStore({
  reducer: {
    movies: movieSlice,
  },
});
export default store;
