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
    path: '/getCoupons',
    name: '获取优惠券',
    component: () => import('../views/GetCoupons')
  },
  {
    path: '/category',
    name: '分类',
    component: () => import('../views/Category')
  },
  {
    path: '/categoryDetail',
    name: '详细分类',
    component: () => import('../views/CategoryDetail')
  },
  {
    path: '/cart',
    name: '购物车页',
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/Cart')
  },
  {
    path: '/user',
    name: '用户页',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/User')
  },
  {
    path: '/productDetail/:productId',
    name: '商品详情',
    component: () => import('../views/ProductDetail')
  },
  {
    path: '/submitOrder',
    name: '提交订单',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/SubmitOrder')
  },
  {
    path: '/addressManage/:type',
    name: '地址管理',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/AddressManage')
  },
  {
    path: '/addAddress',
    name: '添加地址',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/AddAddress')
  },
  {
    path: '/pay',
    name: '支付订单',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/Pay')
  },
  {
    path: '/AllOrders',
    name: '我的订单',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/AllOrders')
  },
  {
    path: '/topicActivity',
    name: '专题',
    component: () => import('../views/TopicActivity')
  },
  {
    path: '/rate',
    name: '评价页',
    component: () => import('../views/Rate')
  },
  {
    path: '/collections',
    name: '收藏',
    component: () => import('../views/Collections')
  },
  {
    path: '/productSearch',
    name: '商品搜索',
    component: () => import('../views/ProductSearch')
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
