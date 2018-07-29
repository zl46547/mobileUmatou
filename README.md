# 前言
本项目是基于vue2.0开发的一个移动端兼PC端在线网上购物平台,模仿某生鲜宅送平台，基本实现了从商品的浏览、商品分类、商品的详情、加入购物车、提交订单、支付、查看订单等一套完整的购物流程，部分小功能后期逐步完善。

该项目是由(vue2.0 + vuex + vue-router + axios + webpack + less)完成的，因为是第一次使用前端框架做项目，有些地方做的还不是那么完美还存在一些小BUG，不过后期我会努力完善的.

写完这个项目我学到了很多收获了很多知识尤其对vue组件指令、渲染数据、计算属性、绑定事件以及vuex状态管理、vue-router路由的使用有了一定了解.


# 技术栈
> [vue.js] 构建用户界面的 MVVM 框架，核心思想是：数据驱动、组件系统。

> [vue-cli]  是vue的脚手架工具，目录结构、本地调试、代码部署、热加载、单元测试。

> [vue-router] 是官方提供的路由器，使用vue.js构建单页面应用程序变得轻而易举。

> [axios] 请求数据

> [vuex]  是一个专为 vue.js 应用程序开发的状态管理模式，简单来说Vuex就是管理数据的。

> [Mint UI] 由饿了么前端团队推出的 Mint UI 是一个基于 vue.js 的移动端组件库。

> [Element UI] 同样是由饿了么前端团队推出的 Element UI 一套基于 Vue 2.0 的桌面端组件库。

> [LESS] Less CSS预编译语言，扩充了 CSS 语言,增加了诸如变量、混合(mixin)、运算、函数等。

# 项目预览
:point_right: [在线预览]http://zl46547.coding.me/umaTouMobile<br>

# 基本功能
> 首页:
  * 首页轮播图 --> 广告页面
  * 限时抢购 --> 商品详情页面
  * 商品推荐 --> 商品分类页、商品详情页面
> 广告页面
  * 封面
  * 商品列表 --> 商品分类页、商品详情页面
  * 加入购物车
> 商品分类
  * 商品大分类
  * 商品左侧小分类 --> 商品列表
  * 商品广告轮播
> 商品列表
  * 商品列表展示 --> 商品详情
  * 加入购物车
  * 商品广告轮播
> 商品详情
  * 商品广告轮播
  * 商品详细信息+活动
  * 商品评价
  * 商品详细介绍
  * 商品规格
  * 商品收藏
  * 加入购物车
> 购物车列表
  * 购物车列表
  * 增加、减少商品数量
  * 删除商品
  * 全选、复选框
  * 结算商品 --> 提交订单
> 提交订单
  * 选择收货地址
  * 选择发票类型
  * 选择优惠券
  * 选中的商品列表
  * 商品总额
  * 提交订单 --> 支付订单
> 支付订单
  * 订单金额
  * 支付方式选择
  * 选择优惠券
  * 确认支付
> 我的订单
  * 全部订单
  * 待付款
  * 待收货
  * 待评价
  * 轻松退
  * 确认收货
  * 删除订单
  * 重新下单
> 用户管理
  * 订单管理
  * 账户管理
  * 一系列小功能
  
# 项目安装及运行

## 安装项目依赖
npm install 

## 启动服务 浏览器本地访问http://localhost:8080
npm run dev

## 编译打包
npm run build





