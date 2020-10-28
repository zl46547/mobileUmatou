import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    redirect: '/search/keyword'
  },
  {
    path: '/codeCopy',
    name: '复制链接',
    component: () => import('../views/CodeCopy')
  },
  {
    path: '/productDetail',
    name: '商品详情',
    component: () => import('../views/ProductDetail'),
  },
  {
    path: '/search',
    name: '淘客商品搜索',
    component: () => import('../views/Home'),
    redirect: '/search/keyword',
    children: [
      {
        path: 'keyword',
        name: 'keyword',
        component: () => import('../views/Home/components/KeywordPanel')
      },
      {
        path: 'result',
        component: () => import('../views/Home/components/SearchResult')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
