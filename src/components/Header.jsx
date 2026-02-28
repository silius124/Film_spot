import { useDispatch, useSelector } from "react-redux";
import { clearMovieList, getMovies } from "../store/slicers/MovieSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonFavourite from "./ButtonFavourite";
import ButtonFilter from "./ButtonFilter";

function useDebounce(callback, delay) {
  const timeoutId = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return useCallback(
    (...args) => {
      if (timeoutId.current) clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}

function Header({ setFilter }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.movies.filters);
  //const [title, setTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  function handleChangeInp(inp) {
    setSearchTitle(inp.trim());
    handleSearch(inp.trim());
  }

  const handleSearch = useDebounce((inp) => {
    dispatch(clearMovieList());
    dispatch(getMovies({ title: inp, index: 1 }));
    console.log("handleSearch: " + inp);
  }, 500);

  return (
    <header className="header" data-testid="header">
      <div className="header__inner">
        <h1 className="header__title">Film Spot</h1>

        <div className="header__search">
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => {
              handleChangeInp(e.target.value);
            }}
            name="title_input"
            id="title_input"
            className="input-movie"
            placeholder="Введите название фильма..."
          />

          <div className="filters-wrapper">
            <div className="filters">
              {filters.map((filter, index) => (
                <ButtonFilter
                  key={index}
                  name={filter.name === "all" ? filter.name : ""}
                  icon={filter.icon}
                  callback={() => setFilter(filter.name)}
                />
              ))}
            </div>

            {/* <button className="btn-green" onClick={(e) => handleSearch(e)}>
              Поиск
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
