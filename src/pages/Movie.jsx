import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourite,
  deleteFromFavourite,
} from "../store/slicers/MovieSlice";
import { useEffect, useState } from "react";

function Movie() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movie);
  const status = useSelector((state) => state.movies.status);
  const favourites = useSelector((state) => state.movies.favourites);
  const [isFavourite, setIsFavourite] = useState();

  useEffect(() => {
    setIsFavourite(
      favourites.findIndex((el) => el.imdbID === movie.imdbID) >= 0
        ? true
        : false
    );
  }, [favourites]);

  return (
    <div className="main">
      {status === "loading" && <div>Загрузка...</div>}
      {status === "successed" && (
        <>
          <div className="head_movie">
            <img src={movie.Poster} alt="" />
            <div>
              <h2>{movie.Title}</h2>
              <p>{movie.Plot}</p>
              {isFavourite && (
                <button
                  className="btn-box-red"
                  style={{
                    backgroundImage: 'url("./public/favourite.svg")',
                  }}
                  onClick={() => dispatch(deleteFromFavourite(movie))}
                ></button>
              )}
              {!isFavourite && (
                <button
                  className="btn-box-green"
                  style={{
                    backgroundImage: 'url("./public/favourite.svg")',
                  }}
                  onClick={() => dispatch(addToFavourite(movie))}
                ></button>
              )}
            </div>
          </div>
          <div className="main_content">
            <h3>О фильме</h3>
            <div>
              <label htmlFor="">Жанр: </label>
              <span>{movie.Genre}</span>
              <label htmlFor="">Страна: </label>
              <span>{movie.Country}</span>
              <label htmlFor="">Год выпуска: </label>
              <span>{movie.Year}</span>
              <label htmlFor="">Рейтинги: </label>
              {movie.Ratings.map((rat, i) => (
                <>
                  <label key={i} htmlFor="">
                    {rat.Source}
                  </label>
                  <span>{rat.Value}</span>
                </>
              ))}
              <label htmlFor="">Звезды: </label>
              <span>{movie.Actors}</span>
            </div>
          </div>
        </>
      )}
      {status === "failed" && <p>Такого не найдено</p>}
    </div>
  );
}

export default Movie;
