import * as types from '../types'

const state = {
  footSelectMenu: '',
  scrollTop: 0
}

const mutations = {
  [types.FOOT_SELECT_MENU] (state, res) {
    state.footSelectMenu = res
  },
  [types.SCROLL_TOP] (state, res) {
    state.scrollTop = res
  }
}

export default {
  state,
  mutations
}
