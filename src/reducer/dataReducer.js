const playlist=['For You','Top Tracks','Favourites','Recently Played'];
export const initialState={
    displayData:[],
    currentPlaylist:[],
    currentlyaying:{},
    search:"",
    playlist:playlist[0],
    currentTab:1
}
export const dataReducerFun=(state,action)=>{
    const {type,payload}=action;
    switch(type){
        case "SWITCH_TAB":return {...state,currentTab:payload,playlist:playlist[payload-1]};
        default: return state;
    }
}