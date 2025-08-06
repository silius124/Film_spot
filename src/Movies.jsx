import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourite,
  deleteFromFavourite,
} from "./store/slicers/MovieSlice";

function Movies({ filter }) {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies.moviesList);
  const favourites = useSelector((store) => store.movies.favourites);
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
  );
}

export default Movies;
