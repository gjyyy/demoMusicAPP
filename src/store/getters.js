export const singer=function(state){
    return state.singer
}

export const playing=state=>state.playing

export const fullScreen=state=>state.fullScreen

export const playList=state=>state.playList

export const sequenceList=state=>state.sequenceList

export const mode=state=>state.mode

export const currentIndex=state=>state.currentIndex

//通过currentIndex获得currentIndex
export const currentSong=function (state){
    return state.playList[state.currentIndex] || {}
}

export const disc=state=>state.disc

export const topList=state=>state.topList

export const searchHistory=state=>state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList