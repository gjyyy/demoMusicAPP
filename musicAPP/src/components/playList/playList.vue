<template>
  <transition name="list-fade">
    <div class="playlist" @click="hide" v-show="showFlag">
        <div class="list-wrapper" @click.stop>
            <div class="list-header">
                <h1 class="title">
                    <i class="text">顺序播放</i>
                    <span class="clear" @click="showConfirm">X</span>
                </h1>
            </div>
            <Scroll ref="listContent" :data="sequenceList" class="list-content">
                <ul ref="list">
                    <li :key="index" class="item" v-for="(item,index) in sequenceList" @click="selectItem(index)">
                        <img v-if="getCurrentIcon(item)" src="./playButton.png" alt="" class="btnimg">
                        <span class="text">{{item.name}}</span>
                        <span class="collect-box" @click.stop="toggleFavoriteList(item)">
                            <img v-if="getFavoriteListCollect(item)" src="./collect.png" alt="">
                            <img v-else src="./collect2.png" alt="">
                        </span>
                        <span @click.stop="deleteOne(item)" class="delete">
                            X
                        </span>
                    </li>
                </ul>
            </Scroll>
            <div class="list-operate">
                <div  class="add">
                    <i class="icon-add">+</i>
                    <span class="text">添加歌曲到队列</span>
                </div>
            </div>
            <div @click="hide" class="list-close">
                <span>关闭</span>
            </div>
        </div>
        <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Scroll from '@/base/scroll.vue'
import Confirm from '@/base/confirm.vue'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            showFlag:false
        }
    },
  
    computed:{
        ...mapGetters([
            'sequenceList',
            'currentSong',
            'playList',
            "favoriteList"
        ])
    },
    methods:{
        hide(){
            this.showFlag=false
        },
        
        show(){
            this.showFlag=true
            //刷新scroll
            setTimeout(()=>{
                this.$refs.listContent.refresh()
            },20)
        },
        showConfirm() {
            this.$refs.confirm.show()
        },
        selectItem(index){
            this.setCurrentIndex(index)
        },
        getCurrentIcon(item) {
            if (this.currentSong.id === item.id) {
                return true;
            }
            return false;
        },
        deleteOne(item){
            this.deleteSong(item)
            if(!this.playList.length){
                this.hide()
            }
        },
        confirmClear(){
            this.deleteSongList()
        },
        ...mapMutations({
            setCurrentIndex:'SET_CURRENT_INDEX'
        }),
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
        // 添加收藏
        getFavoriteListCollect(song) {
            if (this.isFavoriteList(song)) {
                return false;
            } else {
                return true;
            }
        },
        ...mapMutations({
            setCurrentIndex: "SET_CURRENT_INDEX",
            setPlayingState: "SET_PLAYING_STATE"
        }),
        ...mapActions([
            "deleteSong",
            "deleteSongList",
            "saveFavoriteList",
            "deleteFavoriteList"
        ])
    },
    components:{
        Scroll,
        Confirm,
    },
    

}
</script>
<style lang="stylus" scoped>
.playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: rgba(0, 0, 0, 0.3)
    .list-wrapper
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        background-color: #333
        .list-header
            position: relative
            padding: 20px 30px 10px 20px
            .title
                display: flex
                align-items: center
                .text
                    flex: 1
                    font-size: 14px
                    color: rgba(255, 255, 255, 0.5)
                .clear
                    font-size: 14px
                    color: rgba(255, 255, 255, 0.3)
        .list-content
            max-height: 240px
            overflow: hidden
            .item
                position relative
                display: flex
                align-items: center
                height: 40px
                padding: 0 30px 0 20px
                overflow: hidden
                &.list-enter-active, &.list-leave-active
                    transition: all 0.1s
                &.list-enter, &.list-leave-to
                    height: 0
                .btnimg
                    position absolute
                    left 10px
                    height 20px
                    width 20px  
                .text
                    flex: 1
                    no-wrap()
                    padding 0 0 0 20px
                    font-size: 14px
                    color: rgba(255, 255, 255, 0.3)
                .collect-box
                    position: absolute
                    top: 10px
                    right: 70px
                    img
                        width: 20px
                        height: 20px
                .delete
                    font-size: 14px
                    color: rgba(255, 255, 255, 0.3)
        .list-operate
            width: 140px
            margin: 20px auto 30px auto
            .add
                display: flex
                align-items: center
                padding: 8px 16px
                border: 1px solid rgba(255, 255, 255, 0.5)
                border-radius: 100px
                color: rgba(255, 255, 255, 0.5)
                .icon-add
                    margin-right: 5px
                    font-size: 10px
                .text
                    font-size: 12px
        .list-close
            text-align: center
            line-height: 50px
            background: #222
            font-size: 16px
            color: rgba(255, 255, 255, 0.5)
            

</style>
