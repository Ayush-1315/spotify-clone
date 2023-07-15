import { createContext, useContext, useEffect, useReducer } from "react";
import { gql, useQuery } from "@apollo/client";

import { initialState, dataReducerFun } from "../reducer/dataReducer";
const DataContext = createContext();

const PLAY = gql`
  query Query($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;

export const DataProvider = ({ children }) => {
  const [dataState, dispatch] = useReducer(dataReducerFun, initialState);
  const playlistId = dataState.currentTab;
  const {
    loading: loadingPlaylist,
    error,
    data,
  } = useQuery(PLAY, {
    variables: { playlistId },
  });
  useEffect(() => {
    if (!loadingPlaylist) {
      dispatch({ type: "SET_PLAYLIST", payload: data?.getSongs });
    }
  }, [loadingPlaylist, data?.getSongs]);
  if (error) return `ERROR! ${error.message}`;
  console.log(data);

  console.log(dataState);
  return (
    <DataContext.Provider value={{ dataState, dispatch,loadingPlaylist }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
