import Util from '../../util/common'
import * as types from '../types'

const state = {
  payWaySelected: null, // 选择支付方式
  couponSelected: null, // 选择优惠券
  ticketSelected: null, // 选择发票
  submitOrder: '', // 编辑状态
  myOrders: Util.getLocal('MY_ORDERS') || [] // 编辑状态
}

const mutations = {
  // 选择支付方式
  [types.PAY_WAY_SELECTED](state, res) {
      state.payWaySelected = res
  },
  // 选择优惠券
  [types.COUPON_SELECTED](state, res) {
      state.couponSelected = res
  },
  // 选择发票
  [types.TICKET_SELECTED](state, res) {
      state.ticketSelected = res
  },
  [types.SUBMIT_ORDER](state, res) {
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
    Util.setLocal('MY_ORDERS', myOrders)
  },
  [types.MY_ORDERS](state, res) {
    if (res.isUpdate) {
      state.myOrders.forEach(function (e) {
        if (e.orderNo === res.orderNo) {
          e = res
        }
      })
    } else {
      state.myOrders = res.allOrders
    }
    Util.setLocal('MY_ORDERS', state.myOrders)
  }
}

export default {
  state,
  mutations
}
