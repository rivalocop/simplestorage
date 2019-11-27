import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common.js'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    common
  },
  strict: debug
})

export default store
