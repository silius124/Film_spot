import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite, addToRecent } from "../../store/slicers/MovieSlice";
import { useEffect, useState } from "react";
import ButtonFavourite from "../ButtonFavourite";
import styles from "./movie.module.scss";

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
        : false,
    );
  }, [favourites, movie.imdbID]);

  useEffect(() => {
    if (movie.imdbID) dispatch(addToRecent(movie));
  }, [movie.imdbID]);

  return (
    <div className={styles.main}>
      {status === "loading" && <div>Загрузка...</div>}
      {status === "successed" && (
        <div>
          <div className={styles.head_movie}>
            <div className={styles.poster_wrapper}>
              <img src={movie.Poster} alt="poster" className={styles.poster} />
            </div>

            <div className={styles.title_movie}>
              <div>
                <span className={styles.title_movie_span}>Название</span>
                <h2>{movie.Title}</h2>
              </div>
              <div>
                <span className={styles.title_movie_span}>Описание</span>
                <p>{movie.Plot}</p>
                <ButtonFavourite
                  isFavourite={isFavourite}
                  callback={() => dispatch(toggleFavourite(movie))}
                />
              </div>
            </div>
          </div>
          <div className={styles.main_content}>
            <h3>О фильме</h3>
            <div className={styles.meta}>
              <div className={styles.meta_wrapper}>
                <h4>Жанр: </h4>
                <p>{movie.Genre}</p>
              </div>
              <div className={styles.meta_wrapper}>
                <h4>Страна: </h4>
                <p>{movie.Country}</p>
              </div>
              <div className={styles.meta_wrapper}>
                <h4>Год выпуска: </h4>
                <p>{movie.Year}</p>
              </div>

              <div className={styles.meta_wrapper}>
                <h4>Рейтинги: </h4>
                {movie.Ratings.map((rat, i) => (
                  <div key={i} className={styles.ratings}>
                    <p>{rat.Source}:</p>
                    <p>{rat.Value}</p>
                  </div>
                ))}
              </div>
              <div className={styles.meta_wrapper}>
                <h4>Звезды: </h4>
                <p>{movie.Actors}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "failed" && <p>Такого не найдено</p>}
    </div>
  );
}

export default Movie;
