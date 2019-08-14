import * as types from '../types'
import Util from '../../util/common'

const state = {
  user: Util.getLocal(types.USER) || ''
}
const mutations = {
  /* 登录TOKEN */
  [types.USER] (state, res) {
    state.user = res
    Util.setLocal(types.USER, res)
  }
}

export default {
  state,
  mutations
}
