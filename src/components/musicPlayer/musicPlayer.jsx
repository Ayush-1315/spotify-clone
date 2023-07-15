import { useEffect, useState } from "react";
import { useData } from "../../context/dataContext";
import playerCSS from "./musicPlayer.module.css";

export const MusicPlayer = () => {
  const { dataState } = useData();
  const { currentlyPlaying } = dataState;
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log(currentlyPlaying?.url);
    setIsPlaying(false);
    const audioElement = new Audio(currentlyPlaying?.url);
    setAudio(audioElement);
    setIsPlaying(true);
    if (currentlyPlaying?.url) {
      audioElement?.play();
    }
    return () => {
      audioElement.pause();
      audioElement.src = "";
      setAudio(null);
    };
  }, [currentlyPlaying]);

  const handlePlay = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };
  console.log(audio.currentTime)
  console.log(audio.duration)
  console.log(currentlyPlaying?.url);
  return (
    <div className={playerCSS.album}>
      {currentlyPlaying?.url !== undefined ? (
        <>
          <div>
            <div className={playerCSS.header}>
              <h1 className={playerCSS.title}>{currentlyPlaying?.title}</h1>
              <p className={playerCSS.artist}>{currentlyPlaying?.artist}</p>
            </div>
            <img src={currentlyPlaying?.photo} alt={currentlyPlaying?.title} />
            <div>
            {!isPlaying ? (
              <button onClick={handlePlay} disabled={!audio || isPlaying}>
                Play
              </button>
            ) : (
              <button onClick={handlePause} disabled={!audio || !isPlaying}>
                Pause
              </button>
            )}
            </div>
          </div>
        </>
      ) : (
        <h1>Select a song to play</h1>
      )}
    </div>
  );
};
