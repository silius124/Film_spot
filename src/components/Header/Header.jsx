import { useDispatch, useSelector } from "react-redux";
import { clearMovieList, getMovies } from "../../store/slicers/MovieSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonFilter from "../ButtonFilter";
import styles from "./header.module.scss";
import Input from "../Input/Input";

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
  const [searchTitle, setSearchTitle] = useState("");

  function handleChangeInp(inp) {
    setSearchTitle(inp.trim());
    handleSearch(inp.trim());
  }

  const handleSearch = useDebounce((inp) => {
    dispatch(clearMovieList());
    dispatch(getMovies({ title: inp, index: 1 }));
  }, 500);

  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.header__inner}>
        <h1 className={styles.header__title}>Film Spot</h1>

        <div className={styles.header__search}>
          <Input
            searchTitle={searchTitle}
            handleChange={(e) => handleChangeInp(e)}
          />
          <div className={styles.filters_wrapper}>
            <div className={styles.filters}>
              {filters.map((filter, index) => (
                <ButtonFilter
                  key={index}
                  name={filter.name === "all" ? filter.name : ""}
                  icon={filter.icon}
                  callback={() => setFilter(filter.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
