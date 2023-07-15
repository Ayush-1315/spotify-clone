import SearchBarCSS from "./searchbar.module.css";
import searchIcon from "../../assets/search.svg";
export const SearchBar = ({onChange,value}) => {
  return (
    <div className={SearchBarCSS.searchbar}>
      <input type="text" placeholder="Search Song, Artist" onChange={e=>onChange(e.target.value)} value={value}/>
      <img src={searchIcon} alt="search" />
    </div>
  );
};
