<template>
<div class="music-list">
    <div class="back" @click="back">《</div>
    <h1 class="title">{{title}}</h1>

    <div class="bg-img" :style="bgStyle" ref="bgImg">
        <div class="play-wrapper">
            <div ref="playBtn" v-show="songs.length>0" class="play" >
                <span class="text">随机播放全部</span>
            </div>
        </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <Scroll :data="songs" class="songsscroll" ref="songsscroll" @scroll="scroll" :probeType="probeType">
        <div class="songs-wrapper">
            <SongList @select="selectItem" :songs="songs"></SongList>
        </div>
    </Scroll>
</div>
</template>
<script>
import Scroll from '@/base/scroll.vue'
import SongList from '@/base/song-list.vue'
import {mapActions} from 'vuex'

export default {
    components:{
        Scroll,
        SongList,
    },
    props:{
        title:{
            type:String,
            default:''
        },
        bgImg:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
            scrollY: 0
        }
    },
    created(){
        this.probeType=3

    },
    mounted(){
        this.imageHeight = this.$refs.bgImg.clientHeight
        this.minTransalteY = -this.imageHeight + 40
        //图片的高度不一样，所以通过计算得到 列表的top
        this.$refs.songsscroll.$el.style.top = `${this.$refs.bgImg.clientHeight}px`
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImg})`
        }
    },
    methods:{
        back(){
            return this.$router.back()
        },
        scroll(pos){
            this.scrollY=pos.y
        },
        selectItem(item,index){
            this.selectPlay({
                list:this.songs,
                index
            })
        },
        ...mapActions([
            'selectPlay'
        ])
    },
    watch: {
      scrollY:function(newVal) {
        //移动距离最大不超过bg-Img的高度
        let translateY = Math.max(this.minTransalteY, newVal)
        let scale = 1
        let zIndex = 0
        let blur = 0
        //下拉时，bg-Img按比例变大，transform-top实现头部放大
        const percent = Math.abs(newVal / this.imageHeight)
        //下拉
        if (newVal > 0) {
          scale = 1 + percent
          zIndex = 10
        }
        //layer层的高度变化
        this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
        //根据css 高度设定
        if (newVal < this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImg.style.paddingTop = 0
          this.$refs.bgImg.style.height = `${40}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImg.style.paddingTop = '70%'
          this.$refs.bgImg.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImg.style['transform'] = `scale(${scale})`
        this.$refs.bgImg.style.zIndex = zIndex
      }
    }
}
</script>
<style lang="stylus" scoped>
.music-list
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    right 0
    background #333
    .back
        position :absolute
        top: 13px
        left: 6px
        z-index: 50
        color: #ffcd32
        font-size: 18px
    .title
        position: absolute
        top: 0
        left: 10%
        z-index: 40
        width: 80%
        text-align: center
        line-height: 40px
        font-size: 18px
        color: white
    .bg-img
        position: relative
        width: 100%
        height: 0
        padding-top: 70%
        transform-origin: top
        background-size: cover
        .play-wrapper
            position: absolute
            bottom: 20px
            z-index: 50
            width: 100%
            .play
                box-sizing: border-box
                width: 135px
                padding: 7px 0
                margin: 0 auto
                text-align: center
                border:1px solid #ffcd32
                color:#ffcd32
                border-radius: 100px
                .text
                    display: inline-block
                    vertical-align: middle
                    font-size: 14px
    .bg-layer
        background: #222
        height: 100%
    .songsscroll
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        background: #222
        .songs-wrapper
            padding: 20px 30px
</style>


