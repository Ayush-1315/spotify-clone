import { useData } from "../../context/dataContext"
import { MusicCard } from "../musicCard/musicCard";
import { SearchBar } from "../searchBar/searchBar";
import mainCSS from "./main.module.css";
export const Main=()=>{
    const {dataState,dispatch}=useData();
    const clickHandler=(_id)=>{
        dispatch({type:'PLAY_SONG',payload:_id})
    }
    return <div className={mainCSS.container}>
        <div className={mainCSS.head}>
        <h2>{dataState?.playlist}</h2>
        <SearchBar/>
        </div>
        <div className={mainCSS.list}>
        {dataState?.displayData.map((music)=><MusicCard key={music?._id} {...music} onClick={clickHandler}/>)}
        </div>
    </div>
}