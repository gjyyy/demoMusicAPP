<template>
    <div class="recommend">
        <Scroll :data="discList" class="recommend-content" ref="scroll">
            <div>
                <section class="swiper-container">
                    <swiper :options="options" v-if="banner.length" class="swiper-wrapper">
                        <swiperSlide v-for="(item,index) in banner" :key="index" class="swiper-slide">
                            <a :href="item.linkUrl">
                                <img @load="imgLoding" :src="item.picUrl" alt="">
                            </a>
                        </swiperSlide>
                        <div class="swiper-pagination"></div>
                    </swiper>
                </section>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul class="list-item">
                        <li class="item" v-for='(item,index) in discList' :key='index' @click="selectItem(item)">
                            <div class="icon">
                                <img :src="item.imgurl" alt="" class="item-img">
                            </div>
                            <div  class="text">
                                <h2 class="name">{{item.creator.name}}</h2>
                                <p class="desc">{{item.dissname}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="loading" v-show="discList.length===0?1:0">
                    <img src="./loading.gif" alt="" class="loading-img">
                    <p class="loading-title">加载中</p>
                </div>
            </div>
        </Scroll>
        <router-view></router-view> 
    </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.min.css'
import {getRecommend,getDiscList} from '@/api/recommend.js'
import {ERR_OK} from '@/api/config.js'
import Scroll from '@/base/scroll.vue'
import { setTimeout } from 'timers';
import {mapMutations} from 'vuex'

export default {
    components:{
        swiper,
        swiperSlide,
        Scroll,
    },
    data(){
        return {
            banner:[],
            discList:[],
            options:{
                autoplay: true, //自动滚动
                loop: true,//循环
                pagination:{
                    el:"swiper-pagination",//设置指示器
                    type: "progressbar"
               },
            }
        }
    },
    created(){
        this._getRecommend()
        this._getDiscList()
    },
    methods:{
        _getRecommend(){
            getRecommend().then(res=>{
                if(res.code===ERR_OK)
                this.banner=res.data.slider
            })
        },
        _getDiscList(){
            getDiscList().then(res=>{
                if(res.code===ERR_OK)
                this.discList=res.data.list
            })
        },
        imgLoding(){
            if(!this.checkloaded){
                this.$refs.scroll.refresh()
                this.checkloaded=true
            }
        },
        selectItem(item){
            this.$router.push({
                path:`/recommend/${item.dissid}`
            })
            //将disc数据传入vuex
            this.setDisc(item)

        },
        ...mapMutations({
            setDisc:'SET_DISC'
        })
    }
    
}
</script>
<style lang="stylus" scoped>
.recommend
    top: 88px
    background: rgb(34, 34, 34)
    .recommend-content
        height: 800px
        overflow: hidden
        .swiper-container 
            width: 100%
            height: 150px
            background: #fff
            img 
                width: 100%
                height: 100%
        .recommend-list
            .list-title
                height: 65px
                line-height: 65px
                text-align: center
                color: #ffcd32
            .list-item
                .item
                    display: flex
                    align-items: center
                    box-sizing: border-box
                    padding: 0 20px 20px 20px
                    .icon
                        padding-right:20px
                        width: 60px
                        img
                            width: 60px
                            height: 60px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        overflow: hidden
                        color: #fff
        .loading
            width: 100%
            text-align: center
            .loading-title
                color: #fff
</style>

