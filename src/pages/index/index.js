import Vue from 'vue'
import App from './App.vue'
import router from './router'
import lazyLoad from 'vue-lazyload'
import VConsole from 'vconsole'
import 'vant/lib/index.css'

// 字体样式
import '../../assets/font/index.css'

if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-new */
    new VConsole()
}

Vue.use(lazyLoad, {
    preLoad: 3.3,
    attempt: 1,
    loading: require('../../assets/images/loading.gif'),
    error: require('../../assets/images/loadError.png')
})
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#index')
