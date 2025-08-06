import { useSelector } from "react-redux";
import { useState } from "react";
import Movies from "./Movies";
import Header from "./Header";

function App() {
  const status = useSelector((state) => state.movies.status);
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Header changeFilter={setFilter} />
      {status === "loading" && <p>Загрузка...</p>}
      {status === "successed" && <Movies filter={filter} />}
      {status === "failed" && <p>Такого фильма не найдено</p>}
    </>
  );
}

export default App;
