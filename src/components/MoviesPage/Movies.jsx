import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite, getMovie } from "../../store/slicers/MovieSlice";
import { useNavigate } from "react-router-dom";
import styles from "./movies.module.scss";

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
    console.log(status);
  }

  return (
    <ul className="movie-list">
      {filter === "all" &&
        movies.map((movie) => {
          return (
            <CardMovie
              movie={movie}
              handleClick={() => handleClickToMovie(movie.Title)}
            />
          );
        })}
      {filter === "favourite" &&
        favourites.map((movie) => {
          return (
            <CardMovie
              movie={movie}
              handleClick={() => handleClickToMovie(movie.Title)}
            />
          );
        })}
    </ul>
  );
}

function CardMovie({ movie, handleClick }) {
  return (
    <li
      className={styles.card}
      key={movie.imdbID}
      onClick={() => handleClick()}
    >
      <img src={movie.Poster} alt="poster" className={styles.poster} />
      <div className={styles.title}>
        <h3>{movie.Title} </h3>
        <span>{movie.Year}</span>
      </div>
    </li>
  );
}

export default Movies;
