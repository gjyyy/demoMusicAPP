//用于将数据缓存到本地
import storage from 'good-storage'

const SEARCH_KEY='__search__'
//最大存储空间15
const SEARCH_LENGTH=15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

//数组，存储的值，比较函数，最大值
//compare 是一个function
function insertArray(arr,val,compare,maxLen){
    const index=arr.findIndex(compare)
    if(index===0){
        return
    }
    if(index>0){
        //把之前的数据删除
        arr.splice(index,1)
    }
    //插入数组的第一个位置
    arr.unshift(val)
    if(maxLen && arr.length>maxLen){
        //把数组的最后一个pop出来
        arr.pop()
    }
}

function deleteArray(arr,compare){
    const index=arr.findIndex(compare)
    if(index>-1){
        arr.splice(index,1)
    }
}

//把query插入当前的历史列表中
export function saveSearch(query){
    //获取当前存储情况
    let searches=storage.get(SEARCH_KEY,[])
    insertArray(searches,query,(item)=>{
        return item===query
    },SEARCH_LENGTH)
    storage.set(SEARCH_KEY,searches)
    return searches
}

//从本地缓存读取searchHistory
export function loadSearch(){
    return storage.get(SEARCH_KEY,[])
}
//删除历史记录
export function deleteSearch(query){
    let searches = storage.get(SEARCH_KEY, [])
    deleteArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}

export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}

export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}

export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
      return song.id === item.id
    }, PLAY_MAX_LEN)
    storage.set(PLAY_KEY, songs)
    return songs
}

export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (item) => {
      return song.id === item.id
    }, FAVORITE_MAX_LEN)
    storage.set(FAVORITE_KEY, songs)
    return songs
  }
  
export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
      return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
      arr.splice(index, 1)
    }
  }
  