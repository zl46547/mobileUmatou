import {
  MATERIAL_SEARCH_RESULT,
  MATERIAL_SEARCH_RESULT_REQUEST,
  HISTORY_SEARCH
} from '../types'
import { materialSearch } from '../../views/TKSearch/service'
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
    if(!res){
      state.historySearch = []
      utils.setLocal(HISTORY_SEARCH,[])
      return false
    }
    if(state.historySearch.includes(res)){
      return false
    }
    let newHistorySearch = [...state.historySearch,res]
    state.historySearch = newHistorySearch
    utils.setLocal(HISTORY_SEARCH,newHistorySearch)
  }
}

const actions = {
  [MATERIAL_SEARCH_RESULT_REQUEST] ({commit}, params) {
    materialSearch(params).then(res => {
      if (res.result_list) {
        commit(MATERIAL_SEARCH_RESULT, res.result_list.map_data)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
