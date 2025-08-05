import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "./store/slicers/MovieSlice";

function App() {
  const movies = useSelector((store) => store.movies.moviesList);
  const status = useSelector((state) => state.movies.status);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(getMovie());
  }

  return (
    <>
      <div data-testid="divApp">Привет</div>{" "}
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
