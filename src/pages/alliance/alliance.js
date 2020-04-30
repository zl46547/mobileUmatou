import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store.js' // vuex
import api from './http/api.js' // http请求
import lazyLoad from 'vue-lazyload'
import VConsole from 'vconsole'
import 'vant/lib/index.css'

// 字体样式
import '../../assets/font/index.css'
// 全局消息组件
import Message from './common/Message/index.js'
// 全局Loading组件
import Loading from './common/Loading/index.js'

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable no-new */
  new VConsole()
}
Vue.use(Message)
Vue.use(Loading)
Vue.use(lazyLoad, {
  preLoad: 3.3,
  attempt: 1,
  loading: require('../../assets/images/loading.gif'),
  error: require('../../assets/images/loadError.png')
})
Vue.prototype.$api = api
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#alliance')
