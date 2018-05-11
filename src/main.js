import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex/store.js' // vuex
import api from '@/http/api.js' // http请求
import Mint from 'mint-ui' // 移动端UI
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'

Vue.use(ElementUI)
Vue.use(Mint)
Vue.prototype.$api = api
Vue.config.productionTip = false

// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 需要权限,进一步进行判断
    if (store.state.login.token) { // 通过vuex state获取当前的token是否存在
      next()
    } else { // 如果没有权限,重定向到登录页,进行登录
      next({
        path: '/login'
        // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else { // 不需要权限 直接跳转
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  $,
  components: {App},
  template: '<App/>'
})