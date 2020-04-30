import Util from '../../../../util/common'
import * as types from '../types'

const state = {
  cartList: Util.getLocal(types.CART_LIST) || [] // 编辑状态
}

const mutations = {
  [types.CART_LIST] (state, res) {
    state.cartList = res
    Util.setLocal('CART_LIST', res)
  }
}

export default {
  state,
  mutations
}
