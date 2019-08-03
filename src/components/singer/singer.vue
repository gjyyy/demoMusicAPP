<template>
<div class="singerList">
    <ListView :data="singerList" @select="selectSinger">
    </ListView>
    <router-view></router-view>
</div>
</template>
<script>
import Scroll from '@/base/scroll.vue'
import {getSingerList} from '@/api/singer.js'
import {ERR_OK} from '@/api/config.js'
import ListView from '@/base/listView.vue'
import {mapMutations} from 'vuex'

export default {
    data(){
        return {
            singerList:[]
        }
    },
    components:{
        Scroll,
        ListView,
    },
    created(){
        this._getSingerList()
    },
    methods:{
        selectSinger(singer){
            this.$router.push({
                path:`/singer/${singer.id}`
            })
            this.setSinger(singer)
            //实际是执行了mutation中的function，相当于往state中传输了数据
        },
        _getSingerList(){
            getSingerList().then((res)=>{
                if(res.code===ERR_OK){
                    this.singerList=this._normalSingerList(res.data.list)
                }
            })
        },
        _normalSingerList(list){
            //从list中提取可用的数据结构
            let map={
                hot:{
                    title:'热门',
                    items:[]
                },
            }
            list.forEach((item,index) => {
                if(index<10){
                    map.hot.items.push({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid,
                        avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    })
                }
                //根据Findex做聚类
                const key=item.Findex
                if(!map[key]){
                    map[key]={
                        title:key,
                        items:[]
                    }
                }
                map[key].items.push({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid,
                    avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                })
            })
            //得到有序列表
            let hot=[]
            let ret=[]
            for(let key in map){
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)){
                    ret.push(val)
                }else if(val.title === '热门'){
                    hot.push(val)
                }
            }
            ret.sort((a,b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
            //设置setSinger方法
        })
        
    }
    
}
</script>
<style lang="stylus" scoped>
.singerList{
    position: fixed;
    top:88px;
    bottom: 0;
    width: 100%
}

</style>

