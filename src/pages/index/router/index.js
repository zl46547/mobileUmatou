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
        path: '/copyTel',
        name: 'copyTel',
        component: () => import('../views/CopyTel')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
