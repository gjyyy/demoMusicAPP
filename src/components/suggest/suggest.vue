<template>
    <Scroll ref="suggestscroll" class="suggest" :data="result" @scrollToEnd="searchMore" :pullup="pullup" >
        <ul class="suggest-list">
            <li class="item" v-for="(item,index) in result" :key="index" @click="select(item)">
                <div class="icon">
                    <i v-show="item.type==='singer'">P</i>
                    <i v-show="item.type!='singer'">S</i>
                </div>
                <div class="name">
                    <p class="test" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <div class="loading" v-show="hasMore">
                <img src="./loading.gif" alt="" class="loading-img">
            </div>
        </ul>
    </Scroll>
</template>
<script>
import {search} from '@/api/search.js'
import {creatSong} from '@/assets/js/song.js'
import Scroll from '@/base/scroll.vue'
import Singer from '@/assets/js/singer.js'
import { mapMutations, mapActions } from 'vuex';
export default {
    props:{
        query:{
            type:String,
            default:''
        },
        showSinger:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            page: 1,
            pullup: true,
            beforeScroll: true,
            hasMore: true,
            result: [],
        }
    },
    created(){
        this.search()
    },
    methods:{
        refresh() {
            this.$refs.suggest.refresh()
        },
        search(){
            this.page = 1
            this.hasMore = true
            search(this.query,this.page,this.showSinger,20).then((res)=>{
                if(res.code===0){
                    console.log(res)
                    this.result=this._genResult(res.data)
                    this._checkMore(res.data)
                }
            })
        },
        getDisplayName(item) {
            if (item.type === 'singer') {
                return item.singername
            } else {
                return `${item.name}-${item.singer}`
            }
        },
        //下拉新加载一组数据
        searchMore(){
            if (!this.hasMore) {
                return
            }
            this.page++
            search(this.query, this.page, this.showSinger, 20).then((res) => {
                if (res.code === 0) {
                    this.result = this.result.concat(this._genResult(res.data))
                    this._checkMore(res.data)
                }
            })
        },
        select(item){
            if(item.type==='singer'){
                const singer=new Singer({
                    id:item.singermid,
                    name: item.singername
                })
                this.$router.push({
                    path:`/search/${singer.id}`
                })
                this.setSinger(singer)
            }
            else{
                this.insertSong(item)
            }
            this.$emit('select',item)
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ]),
        _genResult(data){
            let ret = []
            if (data.zhida && data.zhida.singerid) {
                //对象扩展运算符
                ret.push({...data.zhida, ...{type: 'singer'}})
            }
            if (data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((musicData) => {
                if (musicData.songid && musicData.albummid) {
                    ret.push(creatSong(musicData))
                }
            })
            return ret
        },
        _checkMore(data) {
            const song = data.song
            if (!song.list.length || (song.curnum + song.curpage * 20) > song.totalnum) {
                this.hasMore = false
            }
        },
    },
    watch:{
        query:function(){
            this.search()
        }
    },
    components:{
        Scroll
    }
    
}
</script>
<style lang='stylus' scoped>
.suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        color white
      .name
        flex: 1
        font-size: 14px
        color: rgba(255, 255, 255, 0.3)
        overflow: hidden
        .text
          no-wrap()
      .loading
        padding-right 30px
        text-align center
        .loading-img
            width 20px
            height 20px 
</style>

