import { useDispatch, useSelector } from "react-redux";
import { clearMovieList, getMovies } from "../store/slicers/MovieSlice";
import { useState } from "react";
function Header({ setFilter }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.movies.filters);
  const [title, setTitle] = useState("");
  function handleChangeInp(inp) {
    setTitle(inp.split("").length === 0 ? null : inp);
    dispatch(clearMovieList());
  }
  return (
    <header className="header" data-testid="header">
      <h1>Film Spot</h1>
      <div className="block">
        <input
          type="text"
          onChange={(e) => handleChangeInp(e.target.value)}
          autoComplete="true"
          name="title_input"
          id="title_input"
          className="input_movie"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            {filters.map((filter, index) => (
              <button
                type="button"
                className="btn-box-green"
                key={index}
                onClick={() => setFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <button
            className="btn-green"
            onClick={() => {
              dispatch(getMovies({ title, index: 1 }));
            }}
          >
            Поиск
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
