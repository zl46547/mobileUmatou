import Util from '../../util/common'
import * as types from '../types'

const state = {
  carList: Util.getLocal('CAR_LIST') || [], // 编辑状态
  selectedCarList: [] // 选中的购物车列表
}

const mutations = {
  [types.CAR_LIST] (state, res) {
    state.carList = res
    Util.setLocal(res, 'CAR_LIST')
  },
  [types.SELECT_CAR_LIST] (state, res) {
    state.selectedCarList = res
  }
}

export default {
  state,
  mutations
}
