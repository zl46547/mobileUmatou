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
    // 根据订单号判断该订单是否存在
    var isExit = []
    if (myOrders.length > 0) {
      isExit = myOrders.where(function (t) {
        return t.orderNo === res.orderNo
      })
    }
    if (isExit.length <= 0) {
      myOrders.unshift(res)
    }
    state.myOrders = myOrders
    state.submitOrder = res
    Util.setLocal(myOrders, 'MY_ORDERS')
  },
  [types.MY_ORDERS] (state, res) {
    state.myOrders = res
    Util.setLocal(res, 'MY_ORDERS')
  }
}

export default {
  state,
  mutations
}
