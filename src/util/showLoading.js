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
      // 加到时器主要是为了 展示Loading效果 项目中应去除
      setTimeout(function () {
        store.commit('SET_LOADING', false)
      }, 500)
    }
  }
}
