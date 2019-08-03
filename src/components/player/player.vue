<template>
<div class="player" v-show="playList.length>0">
    <transition name="normal"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <div class="normal-player" v-show="fullScreen">
            <div>
                <img :src="currentSong.image" class="play-background">
            </div>
            <div class="top">
                <div class="play-back" @click="back">
                    <a>《</a>
                </div>
                <h1 class="play-title" v-html="currentSong.name"></h1>
                <h2 class="play-subtitle" v-html="currentSong.singer"></h2>
            </div>
            <div class="middle" 
                @touchstart.prevent="middleTouchStart"
                @touchmove.prevent="middleTouchMove"
                @touchend="middleTouchEnd">
            <div class="middle-l" ref="middleL">
                <div class="cd-wrapper" ref="cdWrapper" >
                    <img class="image" :src="currentSong.image" :class="playing?'playimg':'pauseimg'">
                </div>
            </div>
            <Scroll class="middle-r" ref="lyricList" :data="currentLyric&&currentLyric.lines">
                <!--歌词-->
                <div class="lyric-wrapper">
                    <div v-if="currentLyric">
                        <p ref="lyricLine" class="text" :class="{'current':currentLineNumber.lineNum===index}" v-for="(line,index) in currentLyric.lines" :key="index" >{{line.txt}}</p>
                    </div>
                </div>
            </Scroll>
            </div>
            <div class="bottom">
                <div class="dot-wrapper">
                    <span class="dot" :class="{'active':currentShow==='cd'}"></span>
                    <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
                </div>
                <div class="progress-wrapper">
                    <span class="time time-l">{{format(currentTime)}}</span>
                    <div class="progress-bar-wrapper">
                       <ProgressBar :percent="percent" @percentChange="onprogressBarchange"></ProgressBar>
                    </div>
                    <span class="time time-r">{{format(currentSong.duration)}}</span>
                </div>
                <div class="operators">
                    <div class="icon icon-left" >
                        <img src="@/components/player/next.png" alt="">
                    </div>
                    <div @click="prev" class="icon icon-left" >
                        <img src="@/components/player/left.png" alt="">
                    </div>
                    <div class="icon icon-center" @click="togglePlaying" >
                        <img src="@/components/player/pause.png" alt="" v-show="!playing">
                        <img src="@/components/player/play.png" alt="" v-show="playing">
                    </div>
                    <div @click="next" class="icon icon-right" >
                        <img src="@/components/player/right.png" alt="">
                    </div>
                    <div class="icon icon-right" @click="toggleFavoriteList(currentSong)">
                        <img src="@/components/player/like.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </transition>

    <transition name="mini">
        <div class="mini-player" v-show="!fullScreen" @click="open">
            <div class="mini-icon">
                <img :src="currentSong.image" alt="" :class="playing?'playimg':'pauseimg'">
            </div>
            <div class="text">
                <h2 class="name" v-html="currentSong.name"></h2>
                <p class="desc" v-html="currentSong.singer"></p>
            </div>
            <div class="control" @click.stop="togglePlaying">
                <img src="@/components/player/pause.png" alt="" v-show="!playing">
                <img src="@/components/player/play.png" alt="" v-show="playing">
            </div>
            <div class="control" @click.stop="showlist">
                <img src="@/components/player/like.png" alt="">
            </div>
        </div>
    </transition>
    <PlayList ref="playlist"></PlayList>
    
</div>
</template>
<script>
import PlayList from '@/components/playList/playList.vue'
import Scroll from '@/base/scroll.vue'
import {mapGetters,mapMutations,mapActions} from 'vuex'
import animations from 'create-keyframe-animation'
import { setInterval, setTimeout, clearInterval } from 'timers'
import ProgressBar from '@/base/progress-bar.vue'
import Lyric from 'lyric-parser'


export default {
    data(){
        return {
            currentTime:0,
            timer:null,
            currentLyric:null,
            //歌词所在的行
            currentLineNumber:0,
            currentShow:'cd',
            playingLyric:''
        }
    },
    components:{
        Scroll,
        ProgressBar,
        PlayList
    },
    computed:{
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'playing',
            'currentIndex',
            "sequenceList",
            "favoriteList" // 收藏
        ]),
        percent(){
            return this.currentTime/this.currentSong.duration
        }
    }, 
    created(){
        this.touch={}
    },
    methods:{
        showfullScreen(fullScreen){

        },
        back(){
           this.setFullScreen(false)
        },
        open(){
            this.setFullScreen(true)
        },
        enter(el,done){
            //done执行的时候，跳到下一个函数
            const {x, y, scale} = this._getPosAndScale()

            let animation = {
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1.1)`
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1)`
                }
            }

            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,//400毫秒
                    easing: 'linear'
                }
            })
            animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },
        afterEnter(){
            animations.unregisterAnimation('move')
            this.$refs.cdWrapper.style.animation = ''
        },
        leave(el,done){
            this.$refs.cdWrapper.style.transition = 'all 0.4s'
            const {x, y, scale} = this._getPosAndScale()
            this.$refs.cdWrapper.style['transform'] = `translate3d(${x}px,${y}px,0) scale(${scale})`
            this.$refs.cdWrapper.addEventListener('transitionend', done)
        },
        afterLeave(){
            this.$refs.cdWrapper.style.transition = ''
            this.$refs.cdWrapper.style['transform'] = ''
        },
        showlist(){
            this.$refs.playlist.show()
        },
        ...mapMutations({
            setFullScreen:'SET_FULLSCREEN',
            setPlaying:'SET_PLAYING',
            setCurrentIndex:'SET_CURRENT_INDEX',
            setPlayList: "SET_PLAY_LIST"
        }),
        ...mapActions(["savePlayHistory", "saveFavoriteList", "deleteFavoriteList"]),
        _getPosAndScale() {
            const targetWidth = 40
            const paddingLeft = 40
            const paddingBottom = 30
            const paddingTop = 80
            const width = window.innerWidth * 0.8
            const scale = targetWidth / width
            const x = -(window.innerWidth / 2 - paddingLeft)
            const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
            return {x,y,scale}
        },
        togglePlaying(){
            this.setPlaying(!this.playing)
          //歌曲暂停时，歌词暂停
            if (this.currentLyric) {
                this.currentLyric.togglePlay()
            }
        },
        prev(){
            let index=this.currentIndex-1
            if(index===-1){
                index=this.playList.length-1
            }
            if(!this.playing){
                this.togglePlaying()
            }
            this.setCurrentIndex(index)
        },
        next(){
            let index=this.currentIndex+1
            if(index===this.playList.length){
                index=0
            }
            if(!this.playing){
                this.togglePlaying()
            }
            this.setCurrentIndex(index)
        },
        
        format(interval) {
            interval = interval | 0
            const minute = interval / 60 | 0
            const second = this._pad(interval % 60)
            return `${minute}:${second}`
        },
        onprogressBarchange(percent){
            this.currentTime=this.currentSong.duration*percent
            if (this.currentLyric) {
            //拖动进度条，歌词联动
            this.currentLyric.seek(this.currentTime * 1000)
            }
        },
        getlyric(){
            this.currentSong.getLyric().then((lyric)=>{
                this.currentLyric=new Lyric(lyric,this.handleLyric)
                if (this.playing){
                    this.currentLyric.play()
                }
            }).catch(() => {
                    this.currentLyric = null
                    this.currentLineNum = 0
                })
        },
        handleLyric(lineNum,txt){
            //歌词滚动
            this.currentLineNumber=lineNum
            if(lineNum.lineNum>5){
                let lineEl = this.$refs.lyricLine[lineNum.lineNum - 5]
                this.$refs.lyricList.scrollToElement(lineEl, 1000)
            }else {
                this.$refs.lyricList.scrollTo(0, 0, 1000)
            }
            this.playingLyric=txt
        },
        middleTouchStart(e){
            this.touch.init=true
            this.touch.startX=e.touches[0].pageX
            this.touch.startY=e.touches[0].pageY
        },
        middleTouchMove(e){
            if(!this.touch.init){
                return
            }
            const deltaX= e.touches[0].pageX-this.touch.startX
            const deltaY= e.touches[0].pageY-this.touch.startY
            if(Math.abs(deltaY)>Math.abs(deltaX)){
                return
            }
            //移动距离
            const left = this.currentShow==='cd'? 0 : -window.innerWidth
            const width=Math.min(0,Math.max(-window.innerWidth,left+deltaX))
            this.touch.percent=Math.abs(width/window.innerWidth)
            this.$refs.lyricList.$el.style['transform']=`translate3d(${width}px,0,0)`
        },
        middleTouchEnd(e){
            this.touch.init=false
            let width
            let opacity
            if(this.currentShow==='cd'){
                if(this.touch.percent>0.1){
                    width=-window.innerWidth
                    this.currentShow='lyric'
                     opacity = 0
                }else{
                    width=0
                    opacity = 1
                }
            }else{
                if(this.touch.percent<0.9){
                    width=0
                    this.currentShow='cd'
                    opacity = 1
                }else{
                    width=-window.innerWidth
                    opacity = 0
                }
            }
            const time=300
            this.$refs.lyricList.$el.style['transform'] = `translate3d(${width}px,0,0)`
            this.$refs.lyricList.$el.style['transitionDuration'] = `${time}ms`
            this.$refs.middleL.style.opacity = opacity
            this.$refs.middleL.style['transitionDuration'] = `${time}ms`           
        },
        _pad(num, n = 2) {
            let len = num.toString().length
            while (len < n) {
                num = '0' + num
                len++
            }
            return num
        },
        // 点击收藏
        toggleFavoriteList(song) {
            if (this.isFavoriteList(song)) {
                this.deleteFavoriteList(song);
            } else {
                this.saveFavoriteList(song);
            }
        },
        // 判断当前播放歌曲是否收藏
        isFavoriteList(song) {
            const index = this.favoriteList.findIndex(item => {
                return item.id === song.id;
            });
            return index > -1;
        },

      
    },
    watch:{
        currentSong:function(newSong,oldSong){
            if(!newSong.id){
                return
            }
            if(newSong.id===oldSong.id){
                return
            }
            //切换歌曲时，清除上一首歌的定时器
            if (this.currentLyric) {
                this.currentLyric.stop()
                this.currentTime = 0
                this.currentLineNum = 0
            }
            this.$nextTick(()=>{
                this.savePlayHistory(this.currentSong); // 播放歌曲存入本地播放记录
                this.currentTime=0
                this.getlyric()
            })
        },
        playing:function(newPlaying){
            
            if(newPlaying){
                this.timer=setInterval(()=>{
                    if(this.currentTime<this.currentSong.duration){
                        this.currentTime++
                    }
                    else{
                        return
                    }
                },1000)
            }else{
                clearInterval(this.timer)
            }  
        },
        
    }
    
}
</script>
<style lang="stylus" scoped>
.player
    .normal-player
        position: fixed
        left: 0
        right: 0
        top: 0
        bottom: 0
        z-index: 150
        background: #222
        .play-background
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            z-index: -1
            opacity: 0.6
            filter: blur(20px)
        .top
            position: relative
            margin-bottom: 25px
            .play-back
                position absolute
                height :60px;
                display :flex
                align-items :center
                left: 6px
                z-index: 50
                a
                    color: #ffcd32;
                    font-size: 18px;
            .play-title
                width: 70%
                margin: 0 auto
                line-height: 40px
                text-align: center
                no-wrap()
                font-size: 22px
                color: white
                overflow hidden
            .play-subtitle
                line-height: 20px
                text-align: center
                font-size: 14px
                color: white
                overflow hidden
        .middle
            position: fixed
            display inline-block
            width: 100%
            top: 80px
            bottom: 170px
            white-space: nowrap
            .middle-l
                position relative
                display inline-block
                width 100%
                height 0
                padding-top 80%
                .cd-wrapper
                    position absolute
                    top 0
                    left 10%
                    height 100%
                    width 80%
                    .image
                        width :100%
                        height :100%
                        border-radius:50%
                        &.playimg
                            -webkit-animation :rotate 20s linear infinite
                            animation :rotate 20s linear infinite
                        &.pauseimg
                            -webkit-animation-play-state : paused
                            animation-play-state : paused
        
        .middle
            .middle-r
                display: inline-block
                vertical-align: top
                width 100%
                height 100%
                overflow hidden
                .lyric-wrapper
                    width: 80%
                    margin: 0 auto
                    overflow: hidden
                    text-align: center
                    .text
                        display block
                        line-height: 32px
                        color: rgba(255, 255, 255, 0.5)
                        font-size: 14px
                        &.current
                            color: white 
                   
        .bottom
            position: absolute
            bottom: 50px
            width: 100%          
            .dot-wrapper
                text-align: center
                .dot
                    display: inline-block
                    vertical-align: middle
                    margin: 0 4px
                    width: 8px
                    height: 8px
                    border-radius: 50%
                    background: rgba(255, 255, 255, 0.5)
                    &.active
                        width: 20px
                        border-radius: 5px
                        background: rgba(255, 255, 255, 0.8)
            .progress-wrapper
                display: flex
                align-items: center
                width: 80%
                margin: 0px auto
                padding: 10px 0
                .time
                    color: write
                    font-size: 14px
                    flex: 0 0 30px
                    line-height: 30px
                    width: 30px
                    &.time-l
                        text-align: left
                    &.time-r
                        text-align: right
                .progress-bar-wrapper
                    flex:1
            .operators
                width 100%
                display: flex
                align-items: center
                justify-content center
                .icon 
                    flex 1
                    text-align center
                    img 
                        margin 0 auto
                        width 50%
                        height 50%

                        
            
        &.normal-enter-active,.normal-leave-active
            transition: all 0.3s
            .top,.bottom
                transition: all 0.3s cubic-bezier(0.86,0.18,0.82,1.32)

        &.normal-enter,.normal-leave-to
            opacity: 0
            .top
                transform: translate3d(0,-100px,0)
            .bottom
                transform: translate3d(0,100px,0)

    .mini-player
        display: flex
        align-items: center
        position: fixed
        left: 0
        bottom: 0
        z-index: 180
        width: 100%
        height: 60px
        background: #333
        &.mini-enter-active,.mini-leave-active
            transition: all 0.3s

        &.mini-enter,.mini-leave-to
            opacity: 0
        .mini-icon
            flex: 0 0 40px
            padding: 0 10px 0 20px
        img
            border-radius: 50%
            width:40px
            height:40px
            &.playimg
                -webkit-animation: rotate 10s linear infinite
                animation: rotate 10s linear infinite
            &.pauseimg
                -webkit-animation-play-state: paused
                animation-play-state: paused
        .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
        .name
            margin-bottom: 2px
            no-wrap()
            font-size: 14px
            color: #fff
        .desc
            font-size: 12px
            color: rgba(255, 255, 255, 0.3)
        .control
            padding 10px
            z-index 100
@-webkit-keyframes rotate
    0%
        -webkit-transform: rotate(0)
        transform: rotate(0)
    100%
        -webkit-transform: rotate(360deg)
        transform: rotate(360deg)

    
</style>


