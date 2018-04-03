import Vue from 'vue'
import Router from 'vue-router'
// 按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
// const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Category = resolve => require(['@/views/Category.vue'], resolve)
const Car = resolve => require(['@/views/Car.vue'], resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
Vue.use(Router)

export default new Router({
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
      name: '分类页',
      redirect: '/category/all',
      component: Category,
//      children: [
//        {
//          path: '/category/:tab',
//          component: CategoryMain
//        }
//      ]
    },
    {
      path: '/car',
      name: '购物车页',
      component: Car
    },
    {
      path: '/user',
      name: '用户页',
      component: User
    }
  ]
})
