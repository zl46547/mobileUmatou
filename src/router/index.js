import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store.js'
// 按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/home/index.vue'], resolve)
const IndexAdv = resolve => require(['@/views/IndexAdv.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
const CategoryDetail = resolve => require(['@/views/CategoryDetail.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Category = resolve => require(['@/views/Category.vue'], resolve)
const Car = resolve => require(['@/views/Car.vue'], resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const ProductDetail = resolve => require(['@/views/ProductDetail.vue'], resolve)
const SubmitOrder = resolve => require(['@/views/SubmitOrder.vue'], resolve)
const Pay = resolve => require(['@/views/Pay.vue'], resolve)
const AllOrders = resolve => require(['@/views/AllOrders.vue'], resolve)
const Login = resolve => require(['@/views/Login.vue'], resolve)
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/detail',
      name: '详情页',
      component: Detail
    },
    {
      path: '/category',
      redirect: '/category/all',
      component: Category,
     children: [
       {
         path: '/category/:tab',
         name: '分类页',
         component: CategoryMain
       }
     ]
    },
    {
      path: '/categoryDetail/:id',
      name: '详细分类',
      component: CategoryDetail
    },
    {
      path: '/car',
      name: '购物车页',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Car
    },
    {
      path: '/user',
      name: '用户页',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: User
    },
    {
      path: '/productDetail/:id',
      name: '商品详情',
      component: ProductDetail
    },
    {
      path: '/submitOrder',
      name: '提交订单',
      meta: {
        requireAuth: true
      },
      component: SubmitOrder
    },
    {
      path: '/pay',
      name: '支付订单',
      meta: {
        requireAuth: true
      },
      component: Pay
    },
    {
      path: '/allOrders',
      name: '我的订单',
      meta: {
        requireAuth: true
      },
      component: AllOrders
    },
    {
      path: '/indexAdv',
      name: '广告',
      component: IndexAdv
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    }
  ]
})
// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
  var token = store.state.login.token
  var flag = true
  if (!token) {
    flag = false// 未登录
  }
  var currentData = new Date().getTime()
  var subtractTime = currentData - token
  if (subtractTime > 2 * 60 * 60 * 1000) {
    flag = false // 登录超时
  }
  if (flag) {
    store.commit('TOKEN', new Date().getTime()) // 在token未失效的情况下，每次切换路由时都刷新一下token，保持登录状态
  }
  if (to.meta.requireAuth) { // 需要权限,进一步进行判断
    if (flag) { // 通过vuex state获取当前的token是否存在
      next()
    } else { // 如果没有权限,重定向到登录页,进行登录
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else { // 不需要权限 直接跳转
    next()
  }
})
export default router
