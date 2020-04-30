import * as types from '../types'

const state = {
  scrollTop: 0
}

const mutations = {
  [types.SCROLL_TOP] (state, res) {
    state.scrollTop = res
  }
}

export default {
  state,
  mutations
}
