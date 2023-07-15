const playlist = ["For You", "Top Tracks", "Favourites", "Recently Played"];
export const initialState = {
  allData:[],
  displayData: [],
  currentPlaylist: [],
  currentlyPlaying: JSON.parse(localStorage.getItem("lastPlayed")) ?? {},
  search: "",
  playlist: playlist[0],
  currentTab: 1,
};
export const dataReducerFun = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SWITCH_TAB":
      return { ...state, currentTab: payload, playlist: playlist[payload - 1],displayData:[] };
    case "SET_PLAYLIST":
      return { ...state, displayData: payload,allData:payload };
    case "PLAY_SONG":
      return {
        ...state,
        currentPlaylist: state?.displayData,
        currentlyPlaying: state?.displayData?.find(
          ({ _id }) => _id === payload
        ),
        search:"",
        displayData:state?.allData
      };
    case "SEARCH":
      return {
        ...state,
        displayData: state?.allData?.filter(
          ({ title, artist }) =>
            artist.toLowerCase().includes(payload.toLowerCase()) ||
            title.toLowerCase().includes(payload.toLowerCase())
        ),
        search: payload,
      };
    default:
      return state;
  }
};
