import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js' // vuex
import api from './http/api.js' // http请求
import linq from 'linqjs'
import lazyLoad from 'vue-lazyload'
// 字体样式
import './assets/font/index.css'
// 全局消息组件
import Message from './common/Message/index.js'

Vue.use(Message)
Vue.use(lazyLoad, {
  preLoad: 1.3,
  attempt: 1,
  loading: require('./assets/images/loading.gif'),
  error: require('./assets/images/loadError.png')
})
Vue.prototype.$api = api
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  linq,
  components: {App},
  template: '<App/>'
})
