<template>
  <div id="app">
    <Header/>
    <Nav/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue'
import Nav from '@/components/nav/nav.vue'
import Player from '@/components/player/player.vue'

export default {
  name: 'App',
  components:{
    Header,
    Nav,
    Player,
  }
}
</script>

<style lang="scss">
@import 'assets/css/reset.css';


</style>
