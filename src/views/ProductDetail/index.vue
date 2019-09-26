<template>
  <div id="product-detail">
    <TabMenu
      :menuItems="menus"
      @menu-selected="menuSelected"
      :selected="viewComponent"
    />
    <transition name="component-fade" mode="out-in">
      <component :is="viewComponent"
                 :productInfo="productInfo"
                 :productInfoServices="productInfoServices"
                 :productActivities="productActivities"
      />
    </transition>
    <!-- 脚部区域 -->
    <Footer v-if="productInfo.productId"
            :productId="productInfo.productId"
    />
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
    mounted () {
      let {productId} = this.$route.params
      this.viewComponent = 'Product'
      this.getProductDetailData(productId)
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
       * @param ssuId
       */
      getProductDetailData (ssuId) {
        getProductDetail({ssuId}).then(({productInfo, productInfoServiceList, productActivityList}) => {
          this.productInfo = productInfo
          this.productInfo.fullDescription = productInfo.fullDescription.match(/http.*?jpg/g)
          this.productInfoServices = productInfoServiceList
          this.productActivities = productActivityList
        })
      },
      /**
       * 菜单选择
       * @param val
       */
      menuSelected (val) {
        this.viewComponent = val
      }
    }
  }
</script>

<style lang="less" scoped>
  #product-detail {
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    .component-fade-enter-active, .component-fade-leave-active {
      transition: all .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to{
      opacity: 0;
      transform: translateX(100px);
    }
  }
</style>
