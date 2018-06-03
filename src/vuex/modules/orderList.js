import Util from '../../util/common'
import * as types from '../types'

const state = {
  submitOrder: Util.getLocal('SUBMIT_ORDER') // 编辑状态
}

const mutations = {
  [types.SUBMIT_ORDER] (state, res) {
    state.submitOrder = res
    Util.setLocal(res, 'SUBMIT_ORDER')
  }
}

export default {
  state,
  mutations
}
