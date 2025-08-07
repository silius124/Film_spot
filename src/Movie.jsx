import { useSelector } from "react-redux";

function Movie() {
  const movie = useSelector((state) => state.movies.movie);

  return (
    <div>
      <img src={movie.Poster} alt="" />
      <div>
        <h2>{movie.Title}</h2>
        <p></p>
        <button>Добавить в избранное</button>
        <button>Удалить из избранного</button>
        <p>{movie.Plot}</p>
        <h3>О фильме</h3>
        <div>
          <label htmlFor="">Жанр: </label>
          <span>{movie.Genre}</span>
          <label htmlFor="">Страна: </label>
          <span>{movie.Country}</span>
          <label htmlFor="">Год выпуска: </label>
          <span>{movie.Year}</span>
          <label htmlFor="">Рейтинги: </label>
          {movie.Ratings.map((rat) => (
            <>
              <label htmlFor="">{rat.Source}</label>
              <span>{rat.Value}</span>
            </>
          ))}
          <label htmlFor="">Звезды: </label>
          <span>{movie.Actors}</span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
