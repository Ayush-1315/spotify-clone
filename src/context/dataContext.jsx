import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useQuery } from "@apollo/client";

import { PLAYLIST, PLAYLISTS } from "../utils/queries";
import { initialState, dataReducerFun } from "../reducer/dataReducer";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const state = JSON.parse(localStorage.getItem("lastPlayed")) ?? initialState;
  const [dataState, dispatch] = useReducer(dataReducerFun, state);
  const playlistId = dataState.currentTab;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMiniPlayer, setShowMiniPlayer] = useState(windowWidth<481);
  const {
    loading: loadingPlaylist,
    error,
    data,
  } = useQuery(PLAYLIST, {
    variables: { playlistId },
  });
  const { loading: playlistLoader, data: playlists } = useQuery(PLAYLISTS);
  useEffect(() => {
    if (!loadingPlaylist) {
      dispatch({ type: "SET_PLAYLIST", payload: data?.getSongs });
    }
  }, [loadingPlaylist, data?.getSongs]);

  useEffect(() => {
    const handleWindowResize = () => {
     setWindowWidth(window.innerWidth);
     setShowMiniPlayer(window.innerWidth<481)
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  if (error) {
    return `ERROR! ${error.message}`;
  }
  return (
    <DataContext.Provider
      value={{
        dataState,
        dispatch,
        loadingPlaylist,
        playlistLoader,
        playlists,
        showMiniPlayer,
        setShowMiniPlayer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
