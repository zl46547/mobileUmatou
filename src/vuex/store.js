import Vue from 'vue'
import Vuex from 'vuex'

import detail from './modules/detail'
import login from './modules/login'
import category from './modules/category'
import carList from './modules/carList'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail,
    login,
    category,
    carList
  }
})
