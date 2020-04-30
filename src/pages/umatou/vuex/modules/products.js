import {KEYWORD_SUGGEST,
  KEYWORD_SUGGEST_REQUEST,
  KEYWORD_SEARCH_RESULT,
  KEYWORD_SEARCH_RESULT_REQUEST
} from '../types'
import {keywordSuggest, searchProduct} from '../../views/ProductSearch/service'

const state = {
  searchTip: null,
  keywordSearchResult: null
}

const mutations = {
  [KEYWORD_SUGGEST](state, res) {
    state.searchTip = res
  },
  [KEYWORD_SEARCH_RESULT](state, res) {
    state.keywordSearchResult = res
  }
}

const actions = {
  [KEYWORD_SUGGEST_REQUEST]({commit}, {keywords}) {
    if (!keywords) {
      commit(KEYWORD_SUGGEST, null)
      commit(KEYWORD_SEARCH_RESULT, null)
      return false
    }
    keywordSuggest(keywords).then(res => {
      if (res) {
        commit(KEYWORD_SUGGEST, res)
      }
    })
  },
  [KEYWORD_SEARCH_RESULT_REQUEST]({commit}, params) {
    commit(KEYWORD_SUGGEST, null)
    searchProduct(params).then(res => {
      if (res) {
        commit(KEYWORD_SEARCH_RESULT, res)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
