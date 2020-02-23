import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import {USER} from '../vuex/types'
// 按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const AStudy = resolve => require(['@/views/AStudy/index.vue'], resolve)
const AllOrders = resolve => require(['@/views/AllOrders/index.vue'], resolve)
const AddressManage = resolve => require(['@/views/AddressManage'], resolve)
const AddAddress = resolve => require(['@/views/AddAddress'], resolve)
const Category = resolve => require(['@/views/Category/index.vue'], resolve)
const CategoryDetail = resolve => require(['@/views/CategoryDetail/index.vue'], resolve)
const Cart = resolve => require(['@/views/Cart/index.vue'], resolve)
const GetCoupons = resolve => require(['@/views/GetCoupons'], resolve)
const Home = resolve => require(['@/views/Home/index.vue'], resolve)
const Login = resolve => require(['@/views/Login/index.vue'], resolve)
const Pay = resolve => require(['@/views/Pay/index.vue'], resolve)
const ProductDetail = resolve => require(['@/views/ProductDetail/index.vue'], resolve)
const Rate = resolve => require(['@/views/Rate/index.vue'], resolve)
const SubmitOrder = resolve => require(['@/views/SubmitOrder/index.vue'], resolve)
const TopicActivity = resolve => require(['@/views/TopicActivity/index.vue'], resolve)
const User = resolve => require(['@/views/User/index.vue'], resolve)
const ProductSearch = resolve => require(['@/views/ProductSearch/index.vue'], resolve)
const Collections = resolve => require(['@/views/Collections/index.vue'], resolve)
const TKTools = resolve => require(['@/views/TKTools/index.vue'], resolve)
const TKAdd = resolve => require(['@/views/TKTools/add.vue'], resolve)
const TKActivity = resolve => require(['@/views/TKTools/activity.vue'], resolve)
const TKActivityDetail = resolve => require(['@/views/TKTools/activityDetail.vue'], resolve)
const TKSkillBag = resolve => require(['@/views/TKTools/skillBag.vue'], resolve)
const TKSearch = resolve => require(['@/views/TKSearch/index.vue'], resolve)
const TKDetail = resolve => require(['@/views/TKDetail/index.vue'], resolve)
const KeywordPanel = resolve => require(['@/views/TKSearch/components/KeywordPanel.vue'], resolve)
const SearchResult = resolve => require(['@/views/TKSearch/components/SearchResult.vue'], resolve)
const LLTools = resolve => require(['@/views/LLTools/index.vue'], resolve)
const LLActivity = resolve => require(['@/views/LLTools/activity.vue'], resolve)
const LLActivityDetail = resolve => require(['@/views/LLTools/activityDetail.vue'], resolve)
const HelpEach = resolve => require(['@/views/HelpEach/index.vue'], resolve)
const HelpEachUser = resolve => require(['@/views/HelpEach/addUser.vue'], resolve)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-selected',
  routes: [
    {
      path: '/',
      component: AStudy
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/getCoupons',
      name: '获取优惠券',
      component: GetCoupons
    },
    {
      path: '/category',
      name: '分类',
      component: Category
    },
    {
      path: '/categoryDetail',
      name: '详细分类',
      component: CategoryDetail
    },
    {
      path: '/cart',
      name: '购物车页',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Cart
    },
    {
      path: '/user',
      name: '用户页',
      meta: {
        requireAuth: true
      },
      component: User
    },
    {
      path: '/productDetail/:productId',
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
      path: '/addressManage/:type',
      name: '地址管理',
      meta: {
        requireAuth: true
      },
      component: AddressManage
    },
    {
      path: '/addAddress',
      name: '添加地址',
      meta: {
        requireAuth: true
      },
      component: AddAddress
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
      path: '/AllOrders',
      name: '我的订单',
      meta: {
        requireAuth: true
      },
      component: AllOrders
    },
    {
      path: '/topicActivity',
      name: '专题',
      component: TopicActivity
    },
    {
      path: '/rate',
      name: '评价页',
      component: Rate
    },
    {
      path: '/collections',
      name: '收藏',
      component: Collections
    },
    {
      path: '/productSearch',
      name: '商品搜索',
      component: ProductSearch
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/TKAdd',
      name: '淘客商品添加',
      component: TKAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/TKTools',
      name: '淘客商品列表',
      component: TKTools
    },
    {
      path: '/TKDetail',
      name: '淘客商品详情',
      component: TKDetail
    },
    {
      path: '/TKSearch',
      name: '淘客商品搜索',
      component: TKSearch,
      redirect: '/TKSearch/keyword',
      children: [
        {
          path: 'keyword',
          component: KeywordPanel
        },
        {
          path: 'result',
          component: SearchResult
        }
      ]
    },
    {
      path: '/TKActivity',
      name: '活动主页',
      title: '活动主页',
      component: TKActivity
    },
    {
      path: '/TKActivityDetail',
      name: '活动详情',
      title: '活动详情',
      component: TKActivityDetail
    },
    {
      path: '/TKSkillBag',
      name: '锦囊',
      title: '锦囊',
      component: TKSkillBag
    },
    {
      path: '/LLTools',
      name: '联联商品管理',
      title: '联联商品管理',
      component: LLTools
    },
    {
      path: '/LLActivity',
      name: '联联活动',
      title: '联联活动',
      component: LLActivity
    },
    {
      path: '/LLActivityDetail',
      name: '联联详情',
      title: '联联详情',
      component: LLActivityDetail
    },
    {
      path: '/helpEach',
      name: '淘客互助',
      title: '淘客互助',
      component: HelpEach
    },
    {
      path: '/helpEachUser',
      name: '淘客互助用户',
      title: '淘客互助用户',
      component: HelpEachUser
    }
  ]
})
// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
  let user = store.state.login.user
  let flag = true
  if (!user) {
    flag = false// 未登录
  } else {
    let currentData = new Date().getTime()
    let subtractTime = currentData - user.token
    if (subtractTime > 2 * 60 * 60 * 1000) {
      flag = false // 登录超时
    }
  }

  if (user) {
    // 在token未失效的情况下，每次切换路由时都刷新一下token，保持登录状态
    store.commit(USER, {...user, token: new Date().getTime()})
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
