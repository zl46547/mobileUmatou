import * as types from '../types'

const state = {
  footSelectMenu: ''
}

const mutations = {
  [types.FOOT_SELECT_MENU] (state, res) {
    state.footSelectMenu = res
  }
}

export default {
  state,
  mutations
}
