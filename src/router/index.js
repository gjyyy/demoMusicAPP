import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend.vue'
import Singer from '@/components/singer/singer.vue'
import Rank from '@/components/rank/rank.vue'
import Search from '@/components/search/search.vue'
import SingerDetail from '@/components/singer/singerDetail/singerdetail.vue'
import Disc from '@/components/disc/disc.vue'
import RankDetail from '@/components/rank/rankdetail.vue'
import UserCenter from '@/components/userCenter/userCenter.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
      component: Recommend,
    },
    {
      path:'/usercenter',
      component:UserCenter
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children:[{
        path:':id',
        name:'disc',
        component:Disc
      }]
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children:[{
        path:':id',
        name:'singerdetail',
        component:SingerDetail
      }]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children:[{
        path:':id',
        name:'rankdetail',
        component:RankDetail
      }]
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children:[{
        path:':id',
        component:SingerDetail
      }]
    },
  ]
})
