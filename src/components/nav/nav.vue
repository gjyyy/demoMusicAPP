<template>
    <div class="app">
        <router-link to="/recommend" class="nav">
            <span>推荐</span>
        </router-link>
        <router-link to="/singer" class="nav">
            <span>歌手</span>
        </router-link>
        <router-link to="/rank" class="nav">
            <span>排行</span>
        </router-link>
        <router-link to="/search" class="nav">
            <span>搜索</span>
        </router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
.app
    display: flex
    width: 100%
    height: 44px
    z-index: 800
    .nav
        flex: 1
        text-align: center
        display: inline-block
        height: 100%
        background: rgb(34, 34, 34)
        line-height: 40px
        text-align: center
        color: rgba(255, 255, 255, 0.5)
        font-size: 15px
        &.router-link-active
            span
                color: #ffcd32
                border-bottom: 2px solid #ffcd32
                padding-bottom: 5px
</style>


