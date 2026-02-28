function ButtonFavourite({ isFavourite, callback }) {
  return (
    <button
      className={`btn-box-${isFavourite ? "red" : "green"}`}
      style={{
        backgroundImage: 'url("./icons/favourite.svg")',
      }}
      onClick={() => callback()}
    ></button>
  );
}

export default ButtonFavourite;
