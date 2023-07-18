import cardCSS from "./musicCard.module.css";

export const MusicCard = ({
  _id,
  photo,
  title,
  artist,
  duration,
  onClick,
  currentPlay,
}) => {
  const time = {
    min: Math.floor(duration / 60),
    sec: duration % 60,
  };

  const clickHandler = () => {
    if (typeof onClick === "function") {
      onClick(_id);
    }
  };
  return (
    <div
      className={currentPlay === _id ? cardCSS?.nowPlaying : cardCSS?.card}
      onClick={clickHandler}
    >
      <div className={cardCSS?.details}>
        <img src={photo} alt={title} className={cardCSS.image} />
        <div>
          <span className={cardCSS.title}>{title}</span>
          <span className={cardCSS.artist}>{artist}</span>
        </div>
      </div>
      <span className={cardCSS.timeStamp}>{`${time?.min}:${time?.sec}`}</span>
    </div>
  );
};
