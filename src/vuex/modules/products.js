import {KEYWORD_SUGGEST, KEYWORD_SUGGEST_REQUEST} from '../types'
import {keywordSuggest} from '../../views/ProductSearch/service'
const state = {
  searchTip: []
}

const mutations = {
  [KEYWORD_SUGGEST] (state, res) {
    state.searchTip = res
  }
}

const actions = {
    [KEYWORD_SUGGEST_REQUEST]({commit}, {keywords}) {
      keywordSuggest(keywords).then(res => {
        if (res && res.length > 0) {
          commit(KEYWORD_SUGGEST, res)
        }
      })
  }
}

export default {
  state,
  mutations,
  actions
}
