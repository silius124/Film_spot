import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourite,
  deleteFromFavourite,
  getMovie,
} from "./store/slicers/MovieSlice";
import { useNavigate } from "react-router-dom";

function Movies({ filter }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((store) => store.movies.moviesList);
  const favourites = useSelector((store) => store.movies.favourites);
  function handleClickAddFavourite(movie) {
    dispatch(addToFavourite(movie));
  }
  function handleClickDeleteFavourite(movie) {
    dispatch(deleteFromFavourite(movie));
  }
  function handleClickToMovie(title) {
    dispatch(getMovie({ title }));
    navigate("/movie-info");
  }
  return (
    <>
      <ul className="movie-list">
        {filter === "all" &&
          movies.map((movie) => {
            return (
              <li
                key={movie.imdbID}
                onClick={() => handleClickToMovie(movie.Title)}
              >
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
              <li
                key={movie.imdbID}
                onClick={() => handleClickToMovie(movie.Title)}
              >
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
  );
}

export default Movies;
