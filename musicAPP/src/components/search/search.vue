<template>
    <div class="search-wrapper">
        <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
        <div class="shortcut-wrapper"  v-show="!query">
            <Scroll class="shortcut" >
                <div class="hot-key">
                    <h1 class="hottitle">热门搜索</h1>
                    <ul>
                        <li class="item" v-for="(item,index) in hotKey" :key="index" @click="addQuery(item.k)">
                            {{item.k}}
                        </li>
                    </ul>
                </div>
                <div class="searchHistory">
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span class="clear" @click="showConfirm">
                            X
                        </span>
                    </h1>
                    <SearchList :searches="searchHistory" @select="selectItem" @deleteOne="deleteSearchHistory"></SearchList>
                </div>
            </Scroll>
        </div>
        <!--显示查找结果-->
        <div class="search-result">
            <Suggest :query="query" @select="saveHistory"></Suggest>
        </div>
        <Confirm @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"  ref="confirm"></Confirm>
        <router-view></router-view>
    </div>
</template>
<script>
import SearchBox from '@/base/search-box.vue'
import Scroll from '@/base/scroll.vue'
import {getHotKey} from '@/api/search.js'
import Suggest from '@/components/suggest/suggest.vue'
import { mapMutations,mapActions, mapGetters } from 'vuex';
import Confirm from '@/base/confirm.vue'
import SearchList from '@/base/searchList.vue'

export default {
    components:{
        SearchBox,
        Scroll,
        Suggest,
        Confirm,
        SearchList
    },
    data(){
        return {
            hotKey:[],
            query:''
        }
    },
    created(){
        this._getHotKey()
    },
    computed:{
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods:{
        addQuery(item){
            this.$refs.searchBox.setQuery(item)
        },
        //接收searchbox中emit出来的query
        onQueryChange(query){
            this.query=query
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
            'clearSearchHistory'
        ]),
        saveHistory(){
            this.saveSearchHistory(this.query)
        },
        selectItem(item){
          this.addQuery(item)
        },
        showConfirm(){
            this.$refs.confirm.show()
        },
        _getHotKey(){
            getHotKey().then((res)=>{
                if(res.code===0){
                    this.hotKey=res.data.hotkey.slice(0, 10)
                }
            })
        }
    }
    
}
</script>

<style lang="stylus" scoped>
.search-wrapper
    padding 20px
    background #222
    .shortcut-wrapper
        position fixed
        top: 178px
        bottom: 0
        width: 100%
        z-index 100
        .shortcut
            height 100%
            overflow hidden
            z-index 500
            .hot-key
                margin 0 20px 20px 20px
                .hottitle
                    margin-bottom: 20px
                    font-size: 14px
                    color: rgba(255, 255, 255, 0.5)
                .item
                    display: inline-block
                    padding: 5px 10px
                    margin: 0 20px 10px 0
                    border-radius: 6px
                    background: #333
                    font-size: 14px
                    color: rgba(255, 255, 255, 0.3)
            .searchHistory
                position: relative
                margin: 0 20px
                .title
                    display: flex
                    align-items: center
                    height: 40px
                    font-size: 14px
                    color:rgba(255, 255, 255, 0.5)
                    .text
                        width:330px
                    .clear
                        font-size: 14px
                        color: rgba(255, 255, 255, 0.3)
    .search-result
      position: fixed
      background: #222
      width: 100%
      left 0px
      top: 167px
      bottom: 0

</style>

