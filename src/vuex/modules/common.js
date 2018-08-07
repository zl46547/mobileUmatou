import * as types from '../types'
import Util from '../../util/common'

const state = {
  selectMenu: '',
  loginTicket: Util.getLocal('LOGIN_TICKET') || ''
}

const mutations = {
  [types.SELECT_MENU] (state, res) {
    state.selectMenu = res
  },
  [types.LOGIN_TICKET] (state, res) {
    state.loginTicket = res
    Util.setLocal(res, 'LOGIN_TICKET')
  }
}

export default {
  state,
  mutations
}
