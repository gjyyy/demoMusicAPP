<template>
    <div class="rank">
        <Scroll :data="topList" class="topList">
            <ul>
                    <li class="rank-item" v-for="(item,index) in topList" :key="index" @click="selectItem(item)">
                        <div class="icon">
                            <img :src="item.picUrl" alt="">
                        </div>
                        <ul class="songlist">
                            <li class="song" v-for="(item1,index) in item.songList" :key="index" >
                                <span>{{index+1}}</span>
                                <span class="name">{{item1.songname}}-{{item1.singername}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
        </Scroll>
        <router-view></router-view>
    </div>

</template>
<script>
import {getTopList} from '@/api/rank.js'
import Scroll from '@/base/scroll.vue'
import { mapGetters, mapMutations } from 'vuex';
export default {
    data(){
        return {
            topList:[]
        }
    },
    created(){
        this._getTopList()
    },
    methods:{
        _getTopList(){
            getTopList().then((res)=>{
                if(res.code===0){
                    this.topList=res.data.topList
                }
            })
        },
        selectItem(item){
            this.$router.push({
                path:`/rank/${item.id}`
            })
            this.setTopList(item)
        },
        ...mapMutations({
            setTopList:'SET_TOPLIST'
        }),
    },
    
    components:{
        Scroll,
    }
}
</script>
<style lang="stylus" scoped>
.rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .topList
        display flex
        flex-direction column
        height: 100%
        overflow: hidden
        background rgb(34, 34, 34)
        .rank-item
            display flex
            flex-direction row
            margin 20px 20px
            height 100px
            .icon
                width 100px
                height 100px
                img 
                    width 100px
                    height 100px
            .songlist
                display flex
                flex-direction column
                justify-content center
                padding 0 20px
                height 100px
                background #333
                .song
                    display flex
                    flex-direction row
                    span 
                        font-size 12px
                        padding 7px 7px
                    .name
                        padding 7px 0
                        width 220px
                        white-space nowrap
                        text-overflow:ellipsis
                        overflow hidden
                        font-size 12px
                        color rgba(255, 255, 255, 0.3)
</style>


