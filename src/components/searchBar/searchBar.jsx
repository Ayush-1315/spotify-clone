import { useEffect} from "react";
import {useLazyQuery } from "@apollo/client";

import { useData } from "../../context/dataContext";
import { SEARCH } from "../../utils/queries";
import SearchBarCSS from "./searchbar.module.css";
import searchIcon from "../../assets/search.svg";

export const SearchBar = () => {
  const { dataState, dispatch } = useData();
  const playlistId = dataState?.currentTab;
  
  const changeHandler = (str) => {
    dispatch({type:"SEARCH",payload:str})
  };
  const [search, {  data }] = useLazyQuery(SEARCH);
  useEffect(() => {
    if (dataState?.search.length > 0) {
      search({ variables: { search: dataState?.search, playlistId } });
    }
    else{
      dispatch({type:"SET_SEARCH_RESULTS",payload:dataState?.allData})
    }
  }, [dataState?.search,dataState?.allData,playlistId,search,dispatch]);

useEffect(()=>{
   if(data){ dispatch({ type: "SET_SEARCH_RESULTS", payload: data?.getSongs });
}
 
},[data,dispatch])
 
  return (
    <div className={SearchBarCSS.searchbar}>
      <input
        type="text"
        placeholder="Search Song, Artist"
        onChange={(e) => changeHandler(e.target.value)}
        value={dataState?.search}
      />
      <img src={searchIcon} alt="search" />
    </div>
  );
};
