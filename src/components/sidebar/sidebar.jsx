import { gql, useQuery } from "@apollo/client";

import { useData } from "../../context/dataContext";
import sidebarCSS from "./sidebar.module.css";
import logo from "../../assets/Logo.svg";
import profile from "../../assets/Profile.png";

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
  const { dataState, dispatch } = useData();

  if (error) {
    console.log(error);
  }
  return (
    <div className={sidebarCSS.container}>
      <div className={sidebarCSS.brand}>
        <img src={logo} alt="logo" />
        {!loading ? (
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
        ):"Loading Playlist"}
      </div>
      <div>
        <img src={profile} alt="profile" className={sidebarCSS.profile} />
      </div>
    </div>
  );
};
