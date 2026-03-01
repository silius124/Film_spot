const generateConfetti = (e, isFavourite) => {
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";

    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";

    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 60;

    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    heart.style.setProperty("--x", x);
    heart.style.setProperty("--y", y);

    heart.style.fontSize = 16 + Math.random() * 18 + "px";
    if (!isFavourite) {
      heart.style.color = "green";
    } else {
      heart.style.color = "red";
    }

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 800);
  }
};

function ButtonFavourite({ isFavourite, callback }) {
  return (
    <div>
      <button
        className={`btn-box-${isFavourite ? "red" : "green"}`}
        style={{
          backgroundImage: 'url("./icons/favourite.svg")',
        }}
        onClick={(e) => {
          callback();
          generateConfetti(e, isFavourite);
        }}
      ></button>
    </div>
  );
}

export default ButtonFavourite;
