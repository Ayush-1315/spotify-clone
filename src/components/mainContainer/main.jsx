import { useData } from "../../context/dataContext";
import { Loader } from "../loader/loader";
import { MusicCard } from "../musicCard/musicCard";
import { SearchBar } from "../searchBar/searchBar";
import mainCSS from "./main.module.css";
import logo from "../../assets/Logo.svg";

export const Main = () => {
  const { dataState, dispatch, loadingPlaylist, playlists } = useData();
  const clickHandler = (_id) => {
    dispatch({ type: "PLAY_SONG", payload: _id });
  };
  return (
    <div className={mainCSS.container}>
      <div className={mainCSS.head}>
        <img src={logo} alt="logo" className={mainCSS.brand} />
        <h2 className={mainCSS.track}>{dataState?.playlist}</h2>
        <SearchBar value={dataState?.search} />
        <div className={mainCSS.playlists}>
          {playlists?.getPlaylists?.map((playlist) => (
            <span key={playlist.id}>
              <input
                type="radio"
                name="playlist"
                id={playlist.id}
                onChange={() =>
                  dispatch({ type: "SWITCH_TAB", payload: playlist?.id })
                }
                checked={dataState.currentTab === playlist?.id}
              />
              <label htmlFor={playlist.id} className={mainCSS.chips}  style={{backgroundColor:dataState?.currentTab===playlist?.id?"rgba(255,255,255,0.3)":""}}>
                {playlist?.title}
              </label>
            </span>
          ))}
        </div>
          <h2>{dataState?.playlist}</h2>
      </div>
      <div className={mainCSS.content}>
        {loadingPlaylist ? (
          <Loader height="100%" width="100%" zIndex="3" />
        ) : dataState?.search !== "" && dataState.displayData.length === 0 ? (
          <span> Nothing here matches your search</span>
        ) : (
          <div className={mainCSS.list}>
            {dataState?.displayData.map((music) => (
              <MusicCard
                key={music?._id}
                {...music}
                onClick={clickHandler}
                currentPlay={dataState?.currentlyPlaying?._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
