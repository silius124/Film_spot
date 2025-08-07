import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/slicers/store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./Movie.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movie-info" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
