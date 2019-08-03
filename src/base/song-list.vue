<template>
    <div class="song-list">
        <ul>
            <li class="song"  v-for="(item,index) in songs" :key="index" @click="selectItem(item,index)">
                <div class="content">
                    <h2 class="name">{{item.name}}</h2>
                    <p class="desc">{{getDesc(item)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        songs:{
            type:Array,
            default:[]
        }
    },
    methods:{
        getDesc(song) {
            return `${song.singer}·${song.album}`
        },
        selectItem(item,index){
            //基础组件，派发事件
            this.$emit('select',item,index)
        }
    }
    
}
</script>
<style lang="stylus" scoped>
.song
    display: flex
    align-items: center
    box-sizing: border-box
    height: 64px
    font-size: 14px
    .content
        line-height: 20px
        overflow: hidden
        .name
            color: #fff
        .desc
            margin-top: 4px
            color: rgba(255, 255, 255, 0.3)
</style>


