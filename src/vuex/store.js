import Vue from 'vue'
import Vuex from 'vuex'

import detail from './modules/detail'
import login from './modules/login'
import category from './modules/category'
import car from './modules/car'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail,
    login,
    category,
    car
  }
})
