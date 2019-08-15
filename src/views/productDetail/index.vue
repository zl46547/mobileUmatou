<template>
  <div id="productDetail">
    <MenuSelect
      :menuItems="menus"
      @menu-selected="menuSelected"
      :selected="selected"
    />
    <!-- 商品页 -->
    <div v-if="selected === '0'" class="product">
      <Banners :banners="productInfo.banners"/>
      <Price :price="productInfo"></Price>
      <Service :service="productInfoServices"
               :activity="productActivities"
               :lastTime="productInfo"
      />
    </div>
    <!-- 详情页 -->
    <div v-if="selected === '1'" class="detail">
      <Detail :detail="productInfo"/>
    </div>
    <!-- 评价页 -->
    <div v-if="selected === '2'" class="rate">
      <RateDetail/>
    </div>
    <!-- 脚部区域 -->
    <Footer v-if="productInfo.productId"
            :productId="productInfo.productId"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import Banners from './components/banners.vue'
  import MenuSelect from '../../common/menuSelect.vue'
  import Price from './components/price.vue'
  import Service from './components/service.vue'
  import Footer from './components/footer.vue'
  import RateDetail from './components/rateDetail.vue'
  import Detail from './components/detail.vue'
  import {getProductDetail} from './service'

  export default {
    components: {
      MenuSelect,
      Banners,
      Price,
      Service,
      Footer,
      Detail,
      RateDetail
    },
    mounted() {
      let {productId} = this.$route.params
      this.selected = '0'
      this.getProductDetailData(productId)
    },
    data() {
      return {
        productInfo: {}, // 商品详情
        productInfoServices: '', // 商品服务
        productActivities: '', // 商品活动
        menus: [ // 菜单切换
          { name: '商品', label: '0' },
          { name: '详情', label: '1' },
          { name: '评价', label: '2' }
        ],
        selected: '0' // 选中的navbar
      }
    },
    methods: {
      /**
       * 获取商品详情
       * @param ssuId
       */
      getProductDetailData(ssuId) {
        getProductDetail({ssuId}).then(({productInfo, productInfoServiceList, productActivityList}) => {
          this.productInfo = productInfo
          this.productInfo.fullDescription = productInfo.fullDescription.match(/http.*?jpg/g)
          this.productInfoServices = productInfoServiceList
          this.productActivities = productActivityList
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 菜单选择
       * @param val
       */
      menuSelected(val) {
        this.selected = val
      }
    }
  }
</script>

<style lang="less" scoped>
  #productDetail {
    overflow: hidden;

    .detail, .rate, .product {
      margin-top: 50px;
      height: calc(100vh - 100px);
      overflow-y: auto;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        display: none
      }

      -webkit-overflow-scrolling: touch;
    }
  }
</style>
