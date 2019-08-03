<template>
  <transition name="slide">
    <div class="user-center">
      <div class="user-back" @click="back">
        《
      </div>
      <div class="user-switches-wrapper">
        <Switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></Switches>
      </div>
      <div ref="playBtn" class="user-play-btn" @click="allplay">
        <span class="user-text">随机播放全部</span>
      </div>
      <div class="user-list-wrapper" ref="listWrapper">
        <scroll ref="favoriteList" class="list-scroll" >
          <div class="list-inner">
            <SongList :songs="favoriteList" @select="selectSong" v-if="currentIndex===0"></SongList>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll">
          <div class="list-inner">
            <SongList :songs="playHistory" @select="selectSong" v-if="currentIndex===1"></SongList>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script>
import Switches from '@/base/switches.vue'
import Scroll from '@/base/scroll.vue'
import SongList from '@/base/song-list.vue'
import Song from '@/assets/js/song.js'
import { mapGetters ,mapMutations,mapActions} from 'vuex';
export default {
    components:{
        Switches,
        Scroll,
        SongList,
    },
    created(){
        console.log(this.favoriteList)
        console.log(this.playHistory)
    },
    computed:{
        ...mapGetters([
            'favoriteList',
            'playHistory'
        ])
    },

    data(){
        return {
            currentIndex:1,
            switches:[
                {name:'我喜欢的'},
                {name:'最近听的'}
            ]
        }
    },
    methods:{
        //跳转分页
        switchItem(index){
            this.currentIndex=index
        },
        back(){
            this.$router.back()
        },
        selectSong(song) {
            // 点击插入当前播放列表
            this.insertSong(new Song(song));
        },
        allplay() {
            if (this.currentIndex === 0) {
                if (this.favoriteList) {
                    this.setSequenceList(this.favoriteList.slice());
                    this.setPlayList(this.favoriteList.slice());
                }
            } else {
                if (this.playHistory) {
                    this.setSequenceList(this.playHistory.slice());
                    this.setPlayList(this.playHistory.slice());
                }
            }
                this.setCurrentIndex(0);
                this.setPlaying(true);
        },
        ...mapActions(["insertSong"]),
        ...mapMutations({
            setPlayList: "SET_PLAY_LIST",
            setSequenceList: "SET_SEQUENCE_LIST",
            setCurrentIndex: "SET_CURRENT_INDEX",
            setPlaying: "SET_PLAYING"
        })
    }
}
</script>
<style lang="stylus" scoped>
.user-center 
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: #222
    .user-back 
        position :absolute
        top: 13px
        left: 6px
        z-index: 50
        color: #ffcd32
        font-size: 18px
    .user-switches-wrapper 
        margin: 10px 0 30px 0
    .user-play-btn 
        box-sizing: border-box
        width: 135px
        padding: 9px 0
        margin: 0 auto
        text-align: center
        border: 1px solid rgba(255, 255, 255, 0.5)
        color: rgba(255, 255, 255, 0.788)
        border-radius: 100px
        font-size: 0
        .user-text 
            display: inline-block
            vertical-align: middle
            font-size: 12px
    .user-list-wrapper
        position: absolute
        top: 110px
        bottom: 0
        width: 100%
        padding: 20px 30px
</style>
