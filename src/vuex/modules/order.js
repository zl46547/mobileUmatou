import * as types from '../types'

const state = {
  addressSelected: null, // 选择地址
  couponSelected: null, // 选择优惠券
  payWay: 0, // 支付方式
  remainTime: 1 // 剩余支付时间
}

const mutations = {
  // 选择地址
  [types.ADDRESS_SELECTED](state, res) {
      state.addressSelected = res
  },
  // 选择优惠券
  [types.COUPON_SELECTED](state, res) {
      state.couponSelected = res
  },
  // 支付方式
  [types.PAY_WAY](state, res) {
      state.payWay = res
  },
  // 剩余支付时间
  [types.REMAIN_TIME](state, res) {
      state.remainTime = res
  }
}

export default {
  state,
  mutations
}
