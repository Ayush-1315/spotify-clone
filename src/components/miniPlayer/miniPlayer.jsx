import { useData } from "../../context/dataContext";
import CSS from "./miniPlayer.module.css";
import playIcon from "../../assets/play.svg";
import pauseIcon from "../../assets/pause.svg";
import nextIcon from "../../assets/next.svg";

export const MiniPlayer = ({ isPlaying, play, pause, playNext }) => {
  const {
    dataState: { currentlyPlaying },setShowMiniPlayer
  } = useData();
  console.log(currentlyPlaying);
  const handlePlay=(e)=>{
    e.stopPropagation();
    play();
  }
  const handlePause=(e)=>{
    e.stopPropagation();
    pause();
  }

  const handlePlayNext=(e)=>{
    e.stopPropagation();
    playNext();
  }
  return (
    <>
      {Object.keys(currentlyPlaying).length > 0 && (
        <div className={CSS.container} onClick={()=>setShowMiniPlayer(false)}>
          <img src={currentlyPlaying?.photo} alt={currentlyPlaying?.title} />
          <div className={CSS?.head}>
            <p>{currentlyPlaying?.title}</p>
            <span>{currentlyPlaying?.artist}</span>
          </div>
          <div>
            {isPlaying ? (
              <button className={CSS.buttons} onClick={handlePause}>
                <img src={pauseIcon} alt="pause" />
              </button>
            ) : (
              <button className={CSS.buttons} onClick={handlePlay}>
                <img src={playIcon} alt="playIcon" />
              </button>
            )}
            <button className={CSS.buttons}>
              <img src={nextIcon} alt="next" onClick={handlePlayNext}/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
