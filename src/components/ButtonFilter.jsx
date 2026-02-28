function ButtonFilter({ name, icon, callback }) {
  return (
    <button
      className={"btn-box-green"}
      style={{
        backgroundImage: `url(${icon})`,
      }}
      onClick={() => callback}
    >
      {name}
    </button>
  );
}

export default ButtonFilter;
