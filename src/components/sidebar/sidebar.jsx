import { useQuery } from "@apollo/client";

import { useData } from "../../context/dataContext";
import sidebarCSS from "./sidebar.module.css";
import logo from "../../assets/Logo.svg";
import profile from "../../assets/Profile.png";
import { PLAYLISTS } from "../../utils/queries";
import { Loader } from "../loader/loader";

export const Sidebar = () => {
  const { loading, error, data } = useQuery(PLAYLISTS);
  const { dataState, dispatch } = useData();

  if (error) {
    console.log(error);
  }
  return (
    <div className={sidebarCSS.container}>
      {!loading?
        <>
          <div className={sidebarCSS.brand}>
            <img src={logo} alt="logo" />
            {
              <ul>
                {data?.getPlaylists.map((playlist) => (
                  <li
                    key={playlist?.id}
                    className={sidebarCSS.links}
                    style={{
                      opacity:
                        dataState?.currentTab === playlist?.id
                          ? "1"
                          : "0.4000000059604645",
                    }}
                    onClick={() =>
                      dispatch({ type: "SWITCH_TAB", payload: playlist?.id })
                    }
                  >
                    {playlist?.title}
                  </li>
                ))}
              </ul>
            }
          </div>
          <div>
            <img src={profile} alt="profile" className={sidebarCSS.profile} />
          </div>
        </>:
        <Loader/>
      }
    </div>
  );
};
