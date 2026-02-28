import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite, getMovie } from "../store/slicers/MovieSlice";
import { useNavigate } from "react-router-dom";

function Movies({ filter }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((store) => store.movies.moviesList);
  const status = useSelector((store) => store.movies.status);
  const favourites = useSelector((store) => store.movies.favourites);

  function handleClickDeleteFavourite(movie) {
    dispatch(toggleFavourite(movie));
  }
  function handleClickToMovie(title) {
    dispatch(getMovie({ title }));
    if (status === "successed") navigate("/movie-info");
  }
  return (
    <ul className="movie-list">
      {filter === "all" &&
        movies.map((movie) => {
          return (
            <li
              className="card"
              key={movie.imdbID}
              onClick={() => handleClickToMovie(movie.Title)}
            >
              <img src={movie.Poster} alt="poster" className="poster" />
              <div className="title">
                <h3>{movie.Title} </h3>
                <span>{movie.Year}</span>
              </div>
            </li>
          );
        })}
      {filter === "favourite" &&
        favourites.map((movie) => {
          return (
            <li
              className="card"
              key={movie.imdbID}
              onClick={() => handleClickToMovie(movie.Title)}
            >
              <img src={movie.Poster} alt="poster" className="poster" />
              <div className="title">
                <h3>{movie.Title} </h3>
                <span>{movie.Year}</span>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default Movies;
