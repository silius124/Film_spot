import { useDispatch, useSelector } from "react-redux";
import { clearMovieList, getMovies } from "../store/slicers/MovieSlice";
import { useState } from "react";

function Header({ setFilter }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.movies.filters);
  const [title, setTitle] = useState("");

  function handleChangeInp(inp) {
    setTitle(inp.trim().length === 0 ? null : inp);
    dispatch(clearMovieList());
  }

  function handleSearch() {
    dispatch(getMovies({ title, index: 1 }));
  }

  return (
    <header className="header" data-testid="header">
      <div className="header__inner">
        <h1 className="header__title">Film Spot</h1>

        <div className="header__search">
          <input
            type="text"
            onChange={(e) => handleChangeInp(e.target.value)}
            autoComplete="off"
            name="title_input"
            id="title_input"
            className="input-movie"
            placeholder="Введите название фильма..."
          />

          <div className="filters-wrapper">
            <div className="filters">
              {filters.map((filter, index) => (
                <button
                  type="button"
                  className="btn-box-green"
                  key={index}
                  style={{ backgroundImage: `url(${filter.icon})` }}
                  onClick={() => setFilter(filter.name)}
                >
                  {filter.name === "all" ? filter.name : ""}
                </button>
              ))}
            </div>

            <button className="btn-green" onClick={handleSearch}>
              Поиск
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
