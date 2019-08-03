// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import VueLazyload from 'vue-lazyload'
import loading from '@/components/recommend/loading.gif'

Vue.config.productionTip = false
Vue.use(VueLazyload,{
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
