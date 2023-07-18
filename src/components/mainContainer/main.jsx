import { useData } from "../../context/dataContext";
import { Loader } from "../loader/loader";
import { MusicCard } from "../musicCard/musicCard";
import { SearchBar } from "../searchBar/searchBar";
import mainCSS from "./main.module.css";

export const Main = () => {
  
  const { dataState, dispatch, loadingPlaylist } = useData();
  const clickHandler = (_id) => {
    dispatch({ type: "PLAY_SONG", payload: _id });
  };

  return (
    <div className={mainCSS.container}>
      <div className={mainCSS.head}>
        <h2>{dataState?.playlist}</h2>
        <SearchBar  value={dataState?.search} />
      </div>
      <div className={mainCSS.content}>
      {loadingPlaylist ? (
        <Loader height="100%" width="100%" zIndex="3"/>
      ) : (
       dataState?.search!=="" && dataState.displayData.length===0?<span> Nothing here matches your search</span>: <div className={mainCSS.list}>
       {dataState?.displayData.map((music) => (
         <MusicCard key={music?._id} {...music} onClick={clickHandler} currentPlay={dataState?.currentlyPlaying?._id}/>
       ))}
     </div>
      )}
      </div>
    </div>
  );
};
