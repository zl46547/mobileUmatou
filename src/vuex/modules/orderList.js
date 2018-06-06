import Util from '../../util/common'
import * as types from '../types'

const state = {
  submitOrder: '', // 编辑状态
  myOrders: Util.getLocal('MY_ORDERS') || [] // 编辑状态
}

const mutations = {
  [types.SUBMIT_ORDER] (state, res) {
    // 获取我的订单,并将提交的订单加入到我的订单中
    var myOrders = state.myOrders
    myOrders.unshift(res)
    Util.setLocal('MY_ORDERS', myOrders)
    state.submitOrder = res
  },
  [types.MY_ORDERS] (state, res) {
    state.submitOrder = res
  }
}

export default {
  state,
  mutations
}
