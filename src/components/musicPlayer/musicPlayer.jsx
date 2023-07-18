import { useEffect, useState } from "react";

import { useData } from "../../context/dataContext";
import playerCSS from "./musicPlayer.module.css";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";
import vol from "../../assets/vol.svg";
import more from "../../assets/more.svg";

export const MusicPlayer = () => {
  const { dataState, dispatch } = useData();
  const { currentlyPlaying } = dataState;
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [pageReload, setPageReload] = useState(true);
  const [showOptions, setShwOptions] = useState(false);
  const [showVolume,setShowVolume]=useState(false);
  useEffect(() => {
    if (Object.keys) {
      localStorage.removeItem("lastPlayed");
      localStorage.setItem("lastPlayed", JSON.stringify(dataState));
    }
    setIsPlaying(false);
    const audioElement = new Audio(currentlyPlaying?.url);
    setAudio(audioElement);

    if (pageReload) {
      setPageReload(false);
    } else {
      if (currentlyPlaying?.url) {
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
    // eslint-disable-next-line
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

  const playNext = () => {
    dispatch({ type: "PLAY_NEXT", payload: currentlyPlaying?._id });
  };
  const prevPlay = () => {
    if (audio && audio.currentTime > 5) {
      audio.currentTime = 0;
    } else dispatch({ type: "PLAY_PREV", payload: currentlyPlaying?._id });
  };
  useEffect(() => {
    const handleEnded = () => {
      if (dataState?.autoplay) {
        playNext();
      } else setIsPlaying(false);
    };

    if (audio) {
      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
    };
    //eslint-disable-next-line
  }, [audio, playNext]);
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
  const getVolumeStyle = () => {
    const volPercentage = audio?.volume * 100;
    return {
      background: `linear-gradient(to right, #ffffff 0%, #ffffff ${
        volPercentage + 1
      }%, #393634 ${volPercentage}%, #393634 100%)`,
    };
  };
  const handleAutoplay = () => dispatch({ type: "AUTOPLAY" });
  const clickHandler = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    document.addEventListener("click", () => {
      setShwOptions(false);
    });
  }, []);

  const volumeControl = (e) => {
    setVolume(e.target.value);
    audio.volume = e.target.value;
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
              <div className={playerCSS.controls}>
                <div onClick={clickHandler}>
                  <button
                    className={playerCSS.extras}
                    onClick={() => setShwOptions((prev) => !prev)}
                  >
                    <img src={more} alt="more-options" />
                  </button>
                  {showOptions && (
                    <div className={playerCSS.options}>
                      <ul>
                        <li onClick={() => handleAutoplay()}>
                          <span>Autoplay</span>
                          <span>
                            {dataState?.autoplay && (
                              <span className="material-symbols-outlined">
                                check_circle
                              </span>
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className={playerCSS.playerControls}>
                  <button onClick={prevPlay}>
                    <img src={prev} alt="prev-Play" />
                  </button>
                  {!isPlaying ? (
                    <button onClick={handlePlay} disabled={!audio || isPlaying}>
                      <img src={play} alt="play" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePause}
                      disabled={!audio || !isPlaying}
                    >
                      <img
                        src={pause}
                        alt="pause"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderRadius: "50%",
                        }}
                      />
                    </button>
                  )}
                  <button onClick={playNext}>
                    <img src={next} alt="next-Play" />
                  </button>
                </div>
                <div onMouseEnter={()=>setShowVolume(true)} onMouseLeave={()=>setShowVolume(false)}>
                  {showVolume &&<div className={playerCSS.volume}>
                    <input
                      type="range"
                      orient="vertical"
                      style={getVolumeStyle()}
                      min={0}
                      max={1}
                      step={0.1}
                      value={volume}
                      onChange={volumeControl}
                      className={playerCSS.volC}
                    />
                  </div>}
                  <button className={playerCSS.extras}>
                    <img src={vol} alt="vol" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Select a song to play</h1>
      )}
    </div>
  );
};
