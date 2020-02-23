import {
  MATERIAL_SEARCH_RESULT,
  HISTORY_SEARCH
} from '../types'
import utils from '../../util/common'

const state = {
  keywordSearchResult: null,
  historySearch: utils.getLocal(HISTORY_SEARCH) || []
}

const mutations = {
  [MATERIAL_SEARCH_RESULT] (state, res) {
    state.keywordSearchResult = res
  },
  [HISTORY_SEARCH] (state, res) {
    if (!res) {
      state.historySearch = []
      utils.setLocal(HISTORY_SEARCH, [])
      return false
    }
    if (state.historySearch.includes(res)) {
      return false
    }
    let newHistorySearch = [...state.historySearch, res]
    state.historySearch = newHistorySearch
    utils.setLocal(HISTORY_SEARCH, newHistorySearch)
  }
}

export default {
  state,
  mutations
}
