import { useData } from "../../context/dataContext";
import { MusicCard } from "../musicCard/musicCard";
import { SearchBar } from "../searchBar/searchBar";
import mainCSS from "./main.module.css";
export const Main = () => {
  const { dataState, dispatch, loadingPlaylist } = useData();
  const clickHandler = (_id) => {
    dispatch({ type: "PLAY_SONG", payload: _id });
  };
  const changeHandler = (string) => {
    dispatch({ type: "SEARCH", payload: string });
  };
  return (
    <div className={mainCSS.container}>
      <div className={mainCSS.head}>
        <h2>{dataState?.playlist}</h2>
        <SearchBar onChange={changeHandler} value={dataState?.search} />
      </div>
      {loadingPlaylist ? (
        "Loading"
      ) : (
        <div className={mainCSS.list}>
          {dataState?.displayData.map((music) => (
            <MusicCard key={music?._id} {...music} onClick={clickHandler} />
          ))}
        </div>
      )}
    </div>
  );
};
