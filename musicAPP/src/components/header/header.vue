<template>
<div class="head">
    <div class="head-con">
        <img src="./logo.png" alt="">
        <span class="head-title">
            Listen World!
        </span>
    </div>
    <router-link to='/usercenter'>
        <img src="./icon-mine.png" alt="" class="icon-mine">
    </router-link>
    
</div>
    
</template>

<script>
export default {
 
}
</script>
<style lang="stylus" scoped>
.head
    width: 100%
    height: 44px
    background: rgb(34, 34, 34)
    padding-top: 5px
    box-sizing: border-box
    position: relative
    .head-con
        text-align: center
        display: inline
        display: flex
        align-items: center
        justify-content: center
        img
            width: 30px
            height: 32px
        span
            color:#ffcd32
            font-size: 18px
            margin-left: 5px
      .icon-mine 
        width: 25px
        height: 25px
        line-height: 44px
        position: absolute
        top: 10px
        right: 10px

</style>

