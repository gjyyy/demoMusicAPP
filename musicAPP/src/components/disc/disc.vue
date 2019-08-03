<template>
<div class="disc">
    <MusicList 
    :title="title"
    :bgImg="bgImg"
    :songs="songs"
    ></MusicList>
</div>
</template>
<script>
import {getSongList} from '@/api/recommend.js'
import MusicList from '@/components/music-list/music-list.vue'
import { mapGetters } from 'vuex';
import {ERR_OK} from '@/api/config.js'
import { recomSongList ,creatSong} from '@/assets/js/song.js'
export default {
    components:{
        MusicList,
    },
    data(){
        return {
          songs:[]
        }
    },
    created(){
        this._getSongList()
    },
    computed:{
        title(){
            return this.disc.dissname
        },
        bgImg() {
            return this.disc.imgurl
        },
        //从vuex中获得disc
        ...mapGetters([
            'disc'
        ])
    },
    methods:{
        //获取推荐歌单详情
        _getSongList(){
            if (!this.disc.dissid) {
                    this.$router.push('/recommend')
                    return
            }
            getSongList(this.disc.dissid).then((res)=>{
                let ret= recomSongList(res)
                if(ret.code===ERR_OK){
                   this.songs= this._normalizeSongs(ret.cdlist[0].songlist)
                   console.log(this.songs)
                }
            })
        },
        _normalizeSongs(list){
            let ret=[]
            list.forEach(musicData => {
                if(musicData.songid && musicData.albummid){
                    ret.push(creatSong(musicData))
                }
            })
            return ret
        }   
    }
    
}
</script>
<style lang="stylus" scoped>
.disc
    position fixed 
    top 0
    left 0
    right 0
    bottom 0
    background #333
    z-index 100
</style>
