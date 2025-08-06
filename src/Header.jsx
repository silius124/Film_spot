import { useDispatch, useSelector } from "react-redux";
import { clearMovieList, getMovie } from "./store/slicers/MovieSlice";

function Header({ changeFilter }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.movies.filters);
  function handleChangeInp(inp) {
    setTimeout(
      () => dispatch(getMovie(inp.split("").length === 0 ? null : inp)),
      500
    );
    dispatch(clearMovieList());
  }
  return (
    <>
      <div data-testid="divApp">Привет. Введи фильм</div>{" "}
      <input
        type="text"
        onChange={(e) => handleChangeInp(e.target.value)}
        autoComplete="true"
      />{" "}
      <select
        name="filter"
        id="filter"
        onChange={(e) => changeFilter(e.target.value)}
      >
        {filters.map((filter, index) => (
          <option value={filter} key={index}>
            {filter}
          </option>
        ))}
      </select>
    </>
  );
}

export default Header;
