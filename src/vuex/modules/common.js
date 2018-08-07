import * as types from '../types'

const state = {
  selectMenu: ''
}

const mutations = {
  [types.SELECT_MENU] (state, res) {
    state.selectMenu = res
  }
}

export default {
  state,
  mutations
}
