import { useDispatch, useSelector } from "react-redux";
import { deleteFromFavourite, getMovie } from "../store/slicers/MovieSlice";
import { useNavigate } from "react-router-dom";

function Movies({ filter }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((store) => store.movies.moviesList);
  const status = useSelector((store) => store.movies.status);
  const favourites = useSelector((store) => store.movies.favourites);

  function handleClickDeleteFavourite(movie) {
    dispatch(deleteFromFavourite(movie));
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
              style={{
                backgroundImage: `url(${movie.Poster})`,
                position: "relative",
              }}
            >
              <div
                style={{
                  backgroundColor: "gray",
                  bottom: "0",
                  position: "absolute",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "1rem",
                  padding: "1rem 0",
                  opacity: ".8",
                }}
              >
                <div>{movie.Title} </div>
                <div>{movie.Year}</div>
              </div>
            </li>
          );
        })}
      {filter === "favourite" &&
        favourites.map((movie) => {
          return (
            <li
              key={movie.imdbID}
              className="card"
              style={{ backgroundImage: `url(${movie.Poster})` }}
              onClick={() => handleClickToMovie(movie.Title)}
            >
              {movie.Title} был выпущен в {movie.Year}{" "}
              <button
                className="btn-box-red"
                style={{ backgroundImage: 'url("./icons/favourite.svg")' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickDeleteFavourite(movie);
                }}
              ></button>
            </li>
          );
        })}
    </ul>
  );
}

export default Movies;
