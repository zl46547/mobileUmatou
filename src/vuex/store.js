import Vue from 'vue'
import Vuex from 'vuex'

import detail from './modules/detail'
import login from './modules/login'
import car from './modules/car'
import order from './modules/order'
import common from './modules/common'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail,
    login,
    car,
    order,
    common
  }
})
