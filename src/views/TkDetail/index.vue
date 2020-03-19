<template>
  <div id="product-detail">
    <Product/>
    <!--<TabMenu-->
      <!--:menuItems="menus"-->
      <!--@menu-selected="menuSelected"-->
      <!--:selected="viewComponent"-->
    <!--/>-->
    <!--<transition name="component-fade" mode="out-in">-->
      <!--<component :is="viewComponent"-->
                 <!--:productInfo="productInfo"-->
                 <!--:productInfoServices="productInfoServices"-->
                 <!--:productActivities="productActivities"-->
      <!--/>-->
    <!--</transition>-->
    <!--&lt;!&ndash; 脚部区域 &ndash;&gt;-->
    <!--<Footer v-if="productInfo.productId"-->
            <!--:productId="productInfo.productId"-->
    <!--/>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Product from './components/Product'
  import TabMenu from '../../common/TabMenu'
  import Footer from './components/Footer.vue'
  import RateDetail from './components/RateDetail'
  import Detail from './components/Detail.vue'
  import { getProductDetail } from './service'

  export default {
    components: {
      Product,
      TabMenu,
      Footer,
      Detail,
      RateDetail
    },
    created () {
      let {num_iids} = this.$route.params
      this.getProductDetailData(num_iids)
    },
    data () {
      return {
        viewComponent: 'Product',
        productInfo: {}, // 商品详情
        productInfoServices: '', // 商品服务
        productActivities: '', // 商品活动
        menus: [ // 菜单切换
          {name: '商品', label: 'Product'},
          {name: '详情', label: 'Detail'},
          {name: '评价', label: 'RateDetail'}
        ]
      }
    },
    methods: {
      /**
       * 获取商品详情
       * @param num_iids
       */
      getProductDetailData (num_iids) {
        getProductDetail({num_iids}).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #product-detail {
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .component-fade-enter-active, .component-fade-leave-active {
      transition: all .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to{
      opacity: 0;
      transform: translateX(100px);
    }
  }
</style>
