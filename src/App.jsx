import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourite,
  clearMovieList,
  deleteFromFavourite,
  getMovie,
} from "./store/slicers/MovieSlice";
import { useState } from "react";

function App() {
  const movies = useSelector((store) => store.movies.moviesList);
  const favourites = useSelector((store) => store.movies.favourites);
  const status = useSelector((state) => state.movies.status);
  const filters = useSelector((state) => state.movies.filters);
  const [filter, setFilter] = useState("all");
  // const [movieInp, setmovieInp] = useState("");
  const dispatch = useDispatch();
  // function handleClick() {
  //   dispatch(getMovie(movieInp.split("").length === 0 ? null : movieInp));
  //   setmovieInp("");
  // }
  function handleChangeInp(inp) {
    // setmovieInp(inp);
    setTimeout(
      () => dispatch(getMovie(inp.split("").length === 0 ? null : inp)),
      500
    );
    dispatch(clearMovieList());
  }
  function handleClickAddFavourite(movie) {
    dispatch(addToFavourite(movie));
    console.log(favourites);
  }
  function handleClickDeleteFavourite(movie) {
    dispatch(deleteFromFavourite(movie));
    console.log(favourites);
  }

  return (
    <>
      <div data-testid="divApp">Привет. Введи фильм</div>{" "}
      <input
        type="text"
        // value={movieInp}
        onChange={(e) => handleChangeInp(e.target.value)}
        autoComplete="true"
      />{" "}
      <select
        name="filter"
        id="filter"
        onChange={(e) => setFilter(e.target.value)}
      >
        {filters.map((filter, index) => (
          <option value={filter} key={index}>
            {filter}
          </option>
        ))}
      </select>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "successed" && (
        <>
          <ul>
            {filter === "all" &&
              movies.map((movie) => {
                return (
                  <li key={movie.imdbID}>
                    <div className="card">
                      <img src={movie.Poster} alt={movie.title} />
                      {movie.Title} был выпущен в {movie.Year}{" "}
                      <button onClick={() => handleClickAddFavourite(movie)}>
                        В избранное
                      </button>
                    </div>
                  </li>
                );
              })}
            {filter === "favourite" &&
              favourites.map((movie) => {
                return (
                  <li key={movie.imdbID}>
                    <div className="card">
                      <img src={movie.Poster} alt={movie.title} />
                      {movie.Title} был выпущен в {movie.Year}{" "}
                      <button onClick={() => handleClickDeleteFavourite(movie)}>
                        Удалить из избранного
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </>
      )}
      {status === "failed" && <p>Такого фильма не найдено</p>}
    </>
  );
}

export default App;
