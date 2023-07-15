const playlist=['For You','Top Tracks','Favourites','Recently Played'];
export const initialState={
    displayData:[],
    currentPlaylist:[],
    currentlyPlaying:{},
    search:"",
    playlist:playlist[0],
    currentTab:1
}
export const dataReducerFun=(state,action)=>{
    const {type,payload}=action;
    switch(type){
        case "SWITCH_TAB":return {...state,currentTab:payload,playlist:playlist[payload-1]};
        case "SET_PLAYLIST":return {...state,displayData:payload};
        case "PLAY_SONG":
        console.log(payload)    
        return {...state,currentPlaylist:state?.displayData, currentlyPlaying:state?.displayData?.find(({_id})=>_id===payload)}
        default: return state;
    }
}