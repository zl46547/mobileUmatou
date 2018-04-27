<template>
  <div class="main">
    <el-menu :default-active="selected" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">商品</el-menu-item>
      <el-menu-item index="2">详情</el-menu-item>
      <el-menu-item index="3">评价</el-menu-item>
    </el-menu>

    <div v-if="selected == 1">
      <v-banners :response="responseData"></v-banners>
      <v-price :response="responseData"></v-price>
      <v-service :response="responseData"></v-service>
      <v-rate :rateResponse="rateResponse"></v-rate>
      <v-footer></v-footer>
    </div>
    <div v-if="selected == 3">
      <v-rate-detail :rateResponse="rateResponse"></v-rate-detail>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import Banners from '../components/productDetail/banners.vue'
  import Price from '../components/productDetail/price.vue'
  import Service from '../components/productDetail/service.vue'
  import Rate from '../components/productDetail/rate.vue'
  import Footer from '../components/productDetail/footer.vue'

  import RateDetail from '../components/productDetail/rateDetail.vue'

  export default {
    components: {
      'VBanners': Banners,
      'VPrice': Price,
      'VService': Service,
      'VRate': Rate,
      'VFooter': Footer,
      'VRateDetail': RateDetail
    },
    data () {
      return {
        selected: '1', // navbar切换
        rateResponse: [],
        responseData: {
          'ProductInfo': {
            'Banners': [],
            'Number': '',
            'Place': '',
            'StoreName': '',
            'Published': true,
            'SoldNumber': 0,
            'StockQty': 0,
            'LastTimeInfo': '',
            'FullDescription': '',
            'FinanceCName': '',
            'ProductId': 0,
            'ProductVariantId': 0,
            'ProductName': '',
            'Unit': '',
            'Weight': 0,
            'PvStandard': '',
            'PictureId': 0,
            'PeriodMoney': 0,
            'DefaultMoney': 0
          },
          'ProductInfoServices': [{
            'BgColor': '',
            'Name': '',
            'WapUrl': ''
          }],
          'ProductActivities': [{
            'TypeName': '',
            'Descrption': '',
            'ReferType': 0,
            'Name': ''
          }]
        }
      }
    },
    mounted () {
      var bannersId = this.$route.params.id
      this.bannersId = bannersId
      this.$api({
        method: 'get',
        url: '/shihang/productDetail/content/' + bannersId + '.json'
      }).then((res) => {
        this.responseData = res.data.Data
      }).catch((error) => {
        console.log(error)
      })
      // 请求评论内容
      this.$api({
        method: 'get',
        url: '/shihang/productDetail/rate/' + bannersId + '.json'
      }).then((res) => {
        this.rateResponse = res.data.Data.SourceData
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      handleSelect (val) {
        this.selected = val
      }
    }
  }
</script>

<style lang="less" scoped>

  ul.el-menu-demo.el-menu--horizontal.el-menu {
    display: flex;
    justify-content: space-between;
  }

  li.el-menu-item {
    text-align: center;
    width: 33%;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid #8BC34A;
    color: #8BC34A;
    font-size: 4vw;
  }

  li.el-menu-item[data-v-31ad9208] {
    text-align: center;
    width: 33%;
    font-size: 4vw;
  }

  @media screen and (min-width: 768px) {
    .main {
      width: 768px;
      .el-menu--horizontal > .el-menu-item.is-active {
        font-size: 18px;
      }
      li.el-menu-item[data-v-31ad9208] {
        font-size: 18px;
      }
    }
  }

</style>
