import {
    SET_SINGER,
    SET_PLAYING,
    SET_FULLSCREEN,
    SET_PLAY_LIST,
    SET_SEQUENCE_LIST,
    SET_MODE,
    SET_CURRENT_INDEX,
    SET_DISC,
    SET_TOPLIST,
    SET_SEARCH_HISTORY,
    SET_PLAY_HISTORY,
    SET_FAVORITE_LIST

}from '@/store/mutation-type.js'

const mutations={
    [SET_SINGER](state,singer){
        state.singer=singer
    },
    [SET_PLAYING](state,flag1){
        state.playing=flag1
    },
    [SET_FULLSCREEN](state,flag2){
        state.fullScreen=flag2
    },
    [SET_PLAY_LIST](state,list){
        state.playList=list
    },
    [SET_SEQUENCE_LIST](state,list){
        state.sequenceList=list
    },
    [SET_MODE](state,mode){
        state.mode=mode
    },
    [SET_CURRENT_INDEX](state,index){
        state.currentIndex=index
    },
    [SET_DISC](state,disc){
        state.disc=disc
    },
    [SET_TOPLIST](state,topList){
        state.topList=topList
    },
    [SET_SEARCH_HISTORY](state,searchHistory){
        state.searchHistory=searchHistory
    },
    [SET_PLAY_HISTORY](state, history) {
        state.playHistory = history
    },
    [SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list
    }

}

export default mutations