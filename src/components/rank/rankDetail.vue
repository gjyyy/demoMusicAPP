<template>
    <div class="rankdetail">
        <MusicList :title="title" :songs="songs" :bgImg="bgImg"></MusicList>
    </div>
</template>
<script>
import MusicList from '@/components/music-list/music-list.vue'
import {getMusicList} from '@/api/rank.js'
import { mapGetters } from 'vuex';
import {creatSong} from '@/assets/js/song.js'
export default {
    data(){
        return {
            songs:[]
        }
    },
    created(){
        this._getMusicList()
    },
    computed:{
        ...mapGetters([
            'topList'
        ]),
        title(){
            return this.topList.topTitle
        },
        bgImg(){
            if (this.songs.length) {
                return this.songs[0].image
            }
                return ''
        }
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === 0) {
            this.songs = this._normalizeSongs(res.songlist)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
            ret.push(creatSong(musicData))
          }
        })
        return ret
      }
    },
    components:{
        MusicList,
    }
    
}
</script>
<style lang="stylus" scoped>
.rankdetail
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background #333

</style>


