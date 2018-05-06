// import Util from '../../util/common'
import * as types from '../types'

const state = {
  editStatus: false // 编辑状态
}

const mutations = {
  [types.EDIT_STATUS] (state, res) {
    state.editStatus = res
  }
}

export default {
  state,
  mutations
}
