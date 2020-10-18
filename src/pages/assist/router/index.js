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
        path: '/addUser',
        name: '商品详情',
        component: () => import('../views/AddUser')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
