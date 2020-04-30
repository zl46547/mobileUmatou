import * as types from '../types'

const state = {
  fetchLoading: false // 全局加载状态的Loading
}

const mutations = {
  [types.SET_LOADING] (state, res) {
    state.fetchLoading = res
  }
}

export default {
  state,
  mutations
}
