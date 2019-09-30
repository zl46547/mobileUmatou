import Vue from 'vue'
import Vuex from 'vuex'

import detail from './modules/detail'
import login from './modules/login'
import cart from './modules/cart'
import order from './modules/order'
import common from './modules/common'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail,
    login,
    cart,
    order,
    common,
    products
  }
})
