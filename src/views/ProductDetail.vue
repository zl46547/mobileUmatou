<template>
  <div class="main">
    <v-menu-select :menuItems="menus" @menu-selected="menuSelected" :selected="selected"></v-menu-select>
    <!-- 商品页 -->
    <div v-if="selected == 0 && responseData" class="product">
      <v-banners :response="responseData"></v-banners>
      <v-price :response="responseData"></v-price>
      <v-service :response="responseData"></v-service>
      <v-rate :rateResponse="rateResponse" @to-detail-rate="toDetailRate"></v-rate>
    </div>
    <!-- 详情页 -->
    <div v-if="selected == 1 && responseData" class="detail">
      <v-detail :responseData="responseData"></v-detail>
    </div>
    <!-- 评价页 -->
    <div v-if="selected == 2 && rateResponse" class="rate">
      <v-rate-detail :rateResponse="rateResponse"></v-rate-detail>
    </div>
    <!-- 脚部区域 -->
    <v-footer :response="responseData"></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Banners from '../components/productDetail/banners.vue'
  import MenuSelect from '../common/_menuSelect.vue'
  import Price from '../components/productDetail/price.vue'
  import Service from '../components/productDetail/service.vue'
  import Rate from '../components/productDetail/rate.vue'
  import Footer from '../components/productDetail/footer.vue'

  import RateDetail from '../components/productDetail/rateDetail.vue'
  import Detail from '../components/productDetail/detail.vue'
  export default {
    components: {
      'VMenuSelect': MenuSelect,
      'VBanners': Banners,
      'VPrice': Price,
      'VService': Service,
      'VRate': Rate,
      'VFooter': Footer,
      'VDetail': Detail,
      'VRateDetail': RateDetail
    },
    data () {
      return {
        showImageObj: '',
        selected: '0', // navbar切换
        rateResponse: [],
        responseData: '',
        menus: [
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
        ]
      }
    },
    mounted () {
      var bannersId = this.$route.params.id
      this.bannersId = bannersId
      this.$api({
        method: 'get',
        url: '/shihang/productDetail/content/' + bannersId + '.json'
      }).then((res) => {
        this.responseData = res.data.data.Data
      }).catch((error) => {
        console.log(error)
      })
      // 请求评论内容
      this.$api({
        method: 'get',
        url: '/shihang/productDetail/rate/' + bannersId + '.json'
      }).then((res) => {
        this.rateResponse = res.data.data.Data.SourceData
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      menuSelected (val) {
        this.selected = val
      },
      toDetailRate (val) {
        this.selected = val
      }
    }
  }
</script>

<style lang="less" scoped>

  .main{
    overflow: hidden;
    background-color: #ececec;
    .detail,.rate,.product {
      margin-top: 8vh;
      height: 84vh;
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }

  @media screen and (min-width: 768px) {
    .main {
      width: 768px;
      ul.el-menu-demo.el-menu--horizontal.el-menu {
        width: 768px;
      }
      .el-menu--horizontal > .el-menu-item.is-active {
        font-size: 18px;
      }
      li.el-menu-item[data-v-31ad9208] {
        font-size: 18px;
      }
      .el-carousel__container {
        position: relative;
        height: 500px;
      }
    }
  }

</style>
