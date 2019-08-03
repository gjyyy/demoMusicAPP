import {playMode} from '@/assets/js/config.js'
import {loadSearch,loadPlay,loadFavorite} from '@/assets/js/cache.js'

const state={
    singer:{},

    playing:false,  //是否播放
    fullScreen:false, //是否满屏
    playList:[], //随机歌曲列表
    sequenceList:[], //顺序歌曲列表
    mode:playMode.sequence,  //列表模式
    currentIndex:-1,  //当前歌曲下标
    disc:{},//推荐歌单
    topList:{},//排行榜歌单
    searchHistory:loadSearch(),//从本地存储读取数据
    playHistory: loadPlay(),
    favoriteList: loadFavorite()
}

export default state