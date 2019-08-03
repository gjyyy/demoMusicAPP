import vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'

vue.use(vuex)

export default new vuex.Store({
    state,
    mutations,
    getters,
    actions
})




