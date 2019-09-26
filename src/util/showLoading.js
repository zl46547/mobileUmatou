import store from '@/vuex/store.js' // vuex

let needLoadingRequestCount = 0
export default {
  showLoading () {
    if (needLoadingRequestCount === 0) {
      store.commit('SET_LOADING', true)
    }
    needLoadingRequestCount++
  },
  hideLoading () {
    needLoadingRequestCount--
    if (needLoadingRequestCount <= 0) {
      store.commit('SET_LOADING', false)
    }
  }
}
