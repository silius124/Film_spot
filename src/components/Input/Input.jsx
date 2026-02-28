import styles from "./input.module.scss";

function Input({ searchTitle, handleChange }) {
  return (
    <input
      type="text"
      value={searchTitle}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      name="title_input"
      id="title_input"
      className={styles.input_movie}
      placeholder="Введите название фильма..."
    />
  );
}

export default Input;
