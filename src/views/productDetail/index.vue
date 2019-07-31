<template>
  <div id="productDetail">
    <v-menu-select :menuItems="menus" @menu-selected="menuSelected" :selected="selected"></v-menu-select>
    <!-- 商品页 -->
    <div v-if="selected == 0" class="product">
      <v-banners :banners="productInfo.Banners"></v-banners>
      <v-price :price="productInfo"></v-price>
      <v-service :service="productInfoServices" :activity="productActivities" :lastTime="productInfo"></v-service>
    </div>
    <!-- 详情页 -->
    <div v-if="selected == 1" class="detail">
      <v-detail :detail="productInfo"></v-detail>
    </div>
    <!-- 评价页 -->
    <div v-if="selected == 2" class="rate" v-infinite-scroll="getRateData" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <v-rate-detail :rateData="rateData"></v-rate-detail>
    </div>
    <!-- 脚部区域 -->
    <v-footer :productInfo="productInfo"></v-footer>
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
  import moment from 'moment'
  export default {
    components: {
      'VMenuSelect': MenuSelect,
      'VBanners': Banners,
      'VPrice': Price,
      'VService': Service,
      'VFooter': Footer,
      'VDetail': Detail,
      'VRateDetail': RateDetail
    },
    mounted() {
      let { productId } = this.$route.params
      this.selected = '0'
      this.getProductDetailData(productId)
      // this.getRateData()
    },
    data () {
      return {
        pageIndex: 0,
        allLoaded: false,
        rateData: [],
        productInfo: '', // 商品详情
        productInfoServices: '', // 商品服务
        productActivities: '', // 商品活动
        menus: [ // 菜单切换
          {
            name: '商品',
            label: '0'
          }, {
            name: '详情',
            label: '1'
          }, {
            name: '评价',
            label: '2'
          }
        ],
        selected: '0' // 选中的navbar
      }
    },
    methods: {
      getProductDetailData(ssuId) {
        var vm = this
        this.$api({
          method: 'get',
          url: '/productDetail/detail',
          params: {ssuId}
        }).then((res) => {
          vm.productInfo = res.data.data.Data.ProductInfo
          vm.productInfo['detailImages'] = vm.getDetailImages(vm.productInfo.FullDescription)
          vm.productInfoServices = res.data.data.Data.ProductInfoServices
          vm.productActivities = res.data.data.Data.ProductActivities
        }).catch((error) => {
          console.log(error)
        })
      },
      getDetailImages(images) {
        return images.match(/http.*?jpg/g)
      },
      menuSelected (val) {
        var vm = this
        vm.selected = val
      },
      /**
       * 获取评论数据
       */
      getRateData() {
        var vm = this
        vm.pageIndex = vm.pageIndex + 1
        if (vm.allLoaded) {
          return false
        }
        this.$api({
          method: 'get',
          url: '/rate/' + vm.productId + '.json'
        }).then((res) => {
          var sourceData = res.data.data.Data.SourceData
          /* 接口中CreateTime带有'T',去除'T' */
          sourceData.forEach(function (e) {
            e.CreateTime = moment(e.CreateTime).format('YYYY年MM月DD日 HH:mm:ss')
          })
          vm.rateData = vm.rateData.union(sourceData)
          if (!res.data.data.Data.HasNextPage) {
            vm.allLoaded = true
          }
        }).catch((error) => {
          console.log(error)
        })
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
