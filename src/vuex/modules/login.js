import * as types from '../types'
import Util from '../../util/common'

const state = {
  token: Util.getLocal('TOKEN') || '',
  userList: Util.getLocal('USER_LIST') || []
}
const mutations = {
  /* 登录TOKEN */
  [types.TOKEN] (state, res) {
    state.token = res
    Util.setLocal(res, 'TOKEN')
  },
  /* 用户列表 */
  [types.USER_LIST] (state, res) {
    state.userList.push(res)
    Util.setLocal(state.userList, 'USER_LIST')
  }
}

export default {
  state,
  mutations
}
