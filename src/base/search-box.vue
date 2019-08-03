<template>
    <div class="search">
        <i class="icon-search"> O</i>
        <input type="text" class="box" :placeholder="placeholder" v-model="query" ref="input">
        <i class="icon-dismiss" v-show="query" @click="delet">X</i>
    </div>
</template>
<script>
export default {
    props:{
        placeholder:{
            type:String,
            default:'搜索歌曲、歌手'
        }
    },
    data(){
        return {
            query:''
        }
    },
    methods:{
        delet(){
            this.query=''
        },
        //接收参数
        setQuery(query){
            this.query=query
        }
    },
    created(){
        //把query的值暴露给外面，
        this.$watch('query',(newQuery)=>{
            this.$emit('query',newQuery)
        })
    }
    
}
</script>

<style lang="stylus" scoped>
.search
    display flex
    align-items center
    width: 100%
    box-sizing border-box
    padding: 0 6px
    height: 40px
    background: #333
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: white
    .box
      flex: 1
      border #333
      margin: 0 5px
      line-height: 18px
      background: #333
      color: white
      font-size: 14px
      &::placeholder
        color: rgba(255, 255, 255, 0.3)
    .icon-dismiss
      font-size: 16px
      color: white

</style>

