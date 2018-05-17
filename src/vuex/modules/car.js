import Util from '../../util/common'
import * as types from '../types'

const state = {
  carList: Util.getLocal('CAR_LIST') // 编辑状态
}

const mutations = {
  [types.CAR_LIST] (state, res) {
    state.carList = res
    Util.setLocal(res, 'CAR_LIST')
  }
}

export default {
  state,
  mutations
}
