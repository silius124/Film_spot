import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "./store/slicers/MovieSlice";
import { useState } from "react";

function App() {
  const movies = useSelector((store) => store.movies.moviesList);
  const status = useSelector((state) => state.movies.status);
  const [movieInp, setmovieInp] = useState("");
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(getMovie(movieInp));
    setmovieInp("");
  }
  function handleChangeInp(inp) {
    setmovieInp(inp);
  }

  return (
    <>
      <div data-testid="divApp">Привет. Введи фильм</div>{" "}
      <input
        type="text"
        value={movieInp}
        onChange={(e) => handleChangeInp(e.target.value)}
      />
      <button onClick={handleClick}>Показать фильмы</button>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "successed" && (
        <ul>
          {movies.map((movie) => {
            return (
              <li key={movie.imdbID}>
                {movie.Title} был выпущен в {movie.Year}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default App;
