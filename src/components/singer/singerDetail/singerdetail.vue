<template>
<transition name="slide">
    <MusicList
        :title="title"
        :bg-img="bgImg"
        :songs="songs"
    >
    </MusicList>
</transition>
</template>

<script>
import {ERR_OK} from '@/api/config.js'
import {getSinger} from '@/api/singer.js'
import {mapGetters} from 'vuex'
import {creatSong} from '@/assets/js/song.js'
import MusicList from '@/components/music-list/music-list.vue'

export default {
    components:{
        MusicList,
    },
    computed:{
        title() {
            return this.singer.name
        },
        bgImg() {
            return this.singer.avatar
        },
        ...mapGetters([
            //一个数组，可以map多个数据
            'singer' //对应的是getter.js中的singer
        ])
    },
    created(){
        this._getDeteil()
    },
    data(){
        return {
            songs:[]
        }
    },
    methods:{
        _getDeteil(){
            getSinger(this.singer.id).then(res=>{
                if(res.code===ERR_OK){
                    this.songs=this._normalizeSongs(res.data.list)
                }
            })
        },
        _normalizeSongs(list){
            let ret=[]
            list.forEach(item => {
                let {musicData} = item
                if (musicData.songid && musicData.albummid){
                    ret.push(creatSong(musicData))
                }
            })
            return ret
        }
    }
    
}
</script>

<style lang="stylus" scoped>
.slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
}
.slide-leave-to,.slide-enter{
    transform: translate3d(100%,0,0)
}

</style>


