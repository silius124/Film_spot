import { useSelector } from "react-redux";
import { useState } from "react";
import Movies from "./components/MoviesPage/Movies";
import Header from "./components/Header/Header";

function App() {
  const status = useSelector((state) => state.movies.status);
  const [filter, setFilter] = useState("all");
  return (
    <div className="main-content">
      <Header setFilter={setFilter} />
      {status === "loading" && <p>Загрузка...</p>}
      {status === "successed" && <Movies filter={filter} />}
      {status === "failed" && <p>Такого фильма не найдено</p>}
    </div>
  );
}

export default App;
