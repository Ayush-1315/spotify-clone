import { gql, useQuery } from "@apollo/client";

import sidebarCSS from "./sidebar.module.css";
import logo from "../../assets/Logo.svg";
import profile from "../../assets/Profile.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useData } from "../../context/dataContext";

const PLAYLISTS = gql`
  query Query {
    getPlaylists {
      id
      title
    }
  }
`;
export const Sidebar = () => {
  const { loading, error, data } = useQuery(PLAYLISTS);
  const [currTab, setCurrTab] = useState(null);
  const {dataState,dispatch}=useData()
  const location = useLocation().pathname;
  useEffect(() => {
    switch (location) {
      case "/":
        setCurrTab(1);
        break;
      case "/top-tracks":
        setCurrTab(2);
        break;
      case "/favrouites":
        setCurrTab(3);
        break;
      case "/recentlly-played":
        setCurrTab(4);
        break;
      default:
        setCurrTab(null);
        break;
    }
  }, [location]);
  // if(loading){
  //     return <div>Loading...</div>
  // }
  if (error) {
    console.log(error);
  }
  console.log(data)
  return (
    <div className={sidebarCSS.container}>
      <div className={sidebarCSS.brand}>
        <img src={logo} alt="logo" />
        {!loading && (
          <ul>
            {data?.getPlaylists.map((playlist) => (
              <li key={playlist?.id} className={sidebarCSS.links} style={{opacity:dataState?.currentTab===playlist?.id?"1":"0.4000000059604645"}} onClick={()=>dispatch({type:"SWITCH_TAB",payload:playlist?.id})}>
                {playlist?.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <img src={profile} alt="profile" className={sidebarCSS.profile}/>
      </div>
    </div>
  );
};
