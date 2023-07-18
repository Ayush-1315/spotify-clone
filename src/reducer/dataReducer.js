const playlist = ["For You", "Top Tracks", "Favourites", "Recently Played"];
export const initialState = {
  allData:[],
  displayData: [],
  currentPlaylist: [],
  currentlyPlaying: {},
  search: "",
  playlist: playlist[0],
  currentTab: 1,
  autoplay:false,
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
        search: payload,
        
      };
      case "SET_SEARCH_RESULTS":
        return {
          ...state,
          displayData: payload,
          
        };
      case "PLAY_NEXT":
        const currentIndex=state?.currentPlaylist?.findIndex(({_id})=>_id===payload);
        const nextSong=currentIndex===state.currentPlaylist.length-1?state.currentPlaylist[0]:state.currentPlaylist[currentIndex+1];
        return {...state,currentlyPlaying:nextSong}
      case "PLAY_PREV":
        const currIndex=state?.currentPlaylist?.findIndex(({_id})=>_id===payload);
        const prevSong=currIndex===0?state.currentPlaylist[state.currentPlaylist.length-1]:state.currentPlaylist[currIndex-1];
        return {...state,currentlyPlaying:prevSong}
      case "AUTOPLAY":
        return {...state,autoplay:!state?.autoplay}
    default:
      return state;
  }
};
