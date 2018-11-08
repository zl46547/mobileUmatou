import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex/store.js' // vuex
import api from '@/http/api.js' // http请求
import ElementUI from 'element-ui'
import $ from 'jquery'
import linq from 'linqjs'
import lazyLoad from 'vue-lazyload'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
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
  $,
  linq,
  components: {App},
  template: '<App/>'
})
