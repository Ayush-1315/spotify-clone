import { useData } from "../../context/dataContext"
import { SearchBar } from "../searchBar/searchBar";
import mainCSS from "./main.module.css";
export const Main=()=>{
    const {dataState}=useData();
    return <div className={mainCSS.container}>
        <h2>{dataState?.playlist}</h2>
        <SearchBar/>
    </div>
}