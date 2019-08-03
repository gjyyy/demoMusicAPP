<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li v-for="item in searches" :key="item" class="search-item" @click="selectItem(item)" >
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          X
        </span>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
    props:{
        searches:{
            type:Array,
            default:[]
        }
    },
    methods:{
        selectItem(item){
            this.$emit('select',item)
        },
        deleteOne(item){
            this.$emit('deleteOne',item)
        }
    
    }
}
</script>
<style lang="stylus" scoped>
.search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      overflow: hidden
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        width:330px
        color: rgba(255, 255, 255, 0.5)
      .icon
        font-size: 12px
        color: rgba(255, 255, 255, 0.3)
</style>

