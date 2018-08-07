import * as types from '../types'
import Util from '../../util/common'

const state = {
  token: Util.getLocal('TOKEN') || ''
}
const mutations = {
  [types.TOKEN] (state, res) {
    state.token = res
    Util.setLocal(res, 'TOKEN')
  }
}

export default {
  state,
  mutations
}
