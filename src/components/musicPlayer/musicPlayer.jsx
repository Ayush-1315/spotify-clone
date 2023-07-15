import { useEffect, useState } from "react";

import { useData } from "../../context/dataContext";
import playerCSS from "./musicPlayer.module.css";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";

export const MusicPlayer = () => {
  const { dataState } = useData();
  const { currentlyPlaying } = dataState;
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pageReload,setPageReload]=useState(true);
  useEffect(() => {
    if (Object.keys) {
      localStorage.removeItem("lastPlayed");
      localStorage.setItem("lastPlayed", JSON.stringify(currentlyPlaying));
    }

    console.log(currentlyPlaying?.url);
    setIsPlaying(false);
    const audioElement = new Audio(currentlyPlaying?.url);
    setAudio(audioElement);

        if(pageReload){
            setPageReload(false);
        }
        else{
            if(currentlyPlaying?.url){
                audioElement.play();
                setIsPlaying(true);
        }
    }
    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioElement.pause();
      audioElement.src = "";
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
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

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (audio) {
      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [audio]);
  const handleSeek = (event) => {
    const seekTime = parseFloat(event.target.value);
    if (audio) {
      audio.currentTime = seekTime;
    }
  };
  const getProgressStyle = () => {
    const progressPercentage = (currentTime / duration) * 100;
    return {
      background: `linear-gradient(to right, #ffffff 0%, #ffffff ${
        progressPercentage + 1
      }%, #393634 ${progressPercentage}%, #393634 100%)`,
    };
  };
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
              <input
                type="range"
                min={0}
                max={duration}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className={playerCSS.seeker}
                style={getProgressStyle()}
              />
              {!isPlaying ? (
                <button onClick={handlePlay} disabled={!audio || isPlaying}>
                  <img src={play} alt="play" />
                </button>
              ) : (
                <button onClick={handlePause} disabled={!audio || !isPlaying}>
                  <img src={pause} alt="play" />
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
