import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '首页',
        component: () => import('../views/Home'),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/productDetail',
        name: '商品详情',
        component: () => import('../views/ProductDetail')
    },
    {
        path: '/productEdit',
        name: '商品编辑',
        component: () => import('../views/ProductEdit')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
