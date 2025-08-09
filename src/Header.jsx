import { useDispatch, useSelector } from "react-redux";
import { clearMovieList, getMovies } from "./store/slicers/MovieSlice";
import { useState } from "react";

function Header({ changeFilter }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.movies.filters);
  const [title, setTitle] = useState("");
  function handleChangeInp(inp) {
    setTitle(inp.split("").length === 0 ? null : inp);
    setTimeout(
      () =>
        dispatch(
          getMovies({
            title,
            index: "1",
          })
        ),
      1500
    );
    dispatch(clearMovieList());
  }
  return (
    <header className="header" data-testid="header">
      <h1>Film Spot</h1>{" "}
      <input
        type="text"
        onChange={(e) => handleChangeInp(e.target.value)}
        autoComplete="true"
        className="input_movie"
      />{" "}
      <select
        name="filter"
        id="filter"
        onChange={(e) => changeFilter(e.target.value)}
        className="select_filter"
      >
        {filters.map((filter, index) => (
          <option value={filter} key={index}>
            {filter}
          </option>
        ))}
      </select>{" "}
      <button
        className="btn"
        onClick={() => {
          dispatch(getMovies({ title, index: 1 }));
        }}
      >
        Поиск
      </button>
    </header>
  );
}

export default Header;
