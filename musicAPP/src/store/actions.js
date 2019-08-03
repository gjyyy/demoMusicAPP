//异步操作 提交mutations

//多次改变mutation 进行封装
import {
    SET_SEQUENCE_LIST,
    SET_PLAY_LIST,
    SET_CURRENT_INDEX,
    SET_FULLSCREEN,
    SET_PLAYING,
    SET_SEARCH_HISTORY,
    SET_PLAY_HISTORY,
    SET_FAVORITE_LIST
} from './mutation-type'
import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite,deleteFavorite } from '@/assets/js/cache.js'

//查找列表中知否已经有该歌曲
function findIndex(list,song){
    return list.findIndex((item)=>{
        return item.id===song.id
    })
}

export const selectPlay = function ({commit,state},{list,index}){
    commit(SET_SEQUENCE_LIST,list)
    commit(SET_PLAY_LIST,list)
    commit(SET_CURRENT_INDEX,index)
    commit(SET_FULLSCREEN,true)
    commit(SET_PLAYING,true)
}

export const insertSong=function ({commit,state},song){
    let playList=state.playList.slice()
    let sequenceList=state.sequenceList.slice()
    let currentIndex=state.currentIndex

    let currentSong=playList[currentIndex]
    let fpIndex=findIndex(playList,song)

    //插入歌曲，索引+1
    currentIndex++
    //插入这首歌到当前索引位置(splice(要添加删除的位置，删除的个数，添加的内容))
    playList.splice(currentIndex,0,song)
    if (fpIndex > -1) {
        // 如果当前插入的序号大于列表中的序号
        if (currentIndex > fpIndex) {
          playList.splice(fpIndex, 1)
          currentIndex--
        } else {
          playList.splice(fpIndex + 1, 1)
        }
    }

    let currentSequenceIndex=findIndex(sequenceList,currentSong)+1
    //查看是否已经存在歌曲
    let fsIndex=findIndex(sequenceList,song)
    sequenceList.splice(currentSequenceIndex, 0, song)

    if (fsIndex > -1) {
        if (currentSequenceIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
        } else {
        sequenceList.splice(fsIndex + 1, 1)
        }
    }
    commit(SET_PLAY_LIST, playList)
    commit(SET_SEQUENCE_LIST, sequenceList)
    commit(SET_CURRENT_INDEX, currentIndex)
    commit(SET_FULLSCREEN, true)
    commit(SET_PLAYING, true)
}

export const deleteSong=function({commit,state},song){
    let playList=state.playList.slice()
    let sequenceList=state.sequenceList.slice()
    let currentIndex=state.currentIndex

    let pIndex=findIndex(playList,song)
    playList.splice(pIndex,1)
    let sIndex=findIndex(sequenceList,song)
    sequenceList.splice(sIndex,1)

    if(currentIndex>pIndex|| currentIndex===playList.length){
        currentIndex--
    }

    commit(SET_PLAY_LIST, playList)
    commit(SET_SEQUENCE_LIST, sequenceList)
    commit(SET_CURRENT_INDEX, currentIndex)

    if(!playList.length){
        commit(SET_PLAYING, false)
    }else{
        commit(SET_PLAYING, true)
    }
}

export const deleteSongList = function ({commit}) {
    commit(SET_CURRENT_INDEX, -1)
    commit(SET_PLAY_LIST, [])
    commit(SET_SEQUENCE_LIST, [])
    commit(SET_PLAYING, false)
  }

export const saveSearchHistory=function({commit},query){
    commit(SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
    commit(SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
    commit(SET_SEARCH_HISTORY, clearSearch())
}

export const savePlayHistory = function ({commit}, song) { // 保存播放记录
    commit(SET_PLAY_HISTORY, savePlay(song))
}
  
export const saveFavoriteList = function ({commit}, song) { // 保存我的收藏
    commit(SET_FAVORITE_LIST, saveFavorite(song))
}
  
export const deleteFavoriteList = function ({commit}, song) { // 取消收藏
    commit(SET_FAVORITE_LIST, deleteFavorite(song))
}