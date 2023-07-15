import SearchBarCSS from "./searchbar.module.css";
import searchIcon from "../../assets/search.svg";
export const SearchBar = () => {
  return (
    <div className={SearchBarCSS.searchbar}>
      <input type="text" placeholder="Search Song, Artist"/>
      <img src={searchIcon} alt="search" />
    </div>
  );
};
