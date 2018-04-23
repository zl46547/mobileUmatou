<template>
  <div class="main">
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item id="1">商品</mt-tab-item>
      <mt-tab-item id="2">详情</mt-tab-item>
      <mt-tab-item id="3">评价</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div>
          <v-banners :response="responseData"></v-banners>
          <v-price :response="responseData"></v-price>
          <v-service :response="responseData"></v-service>
          <v-rate :rateResponse="rateResponse"></v-rate>
          <v-footer></v-footer>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <p style="margin-top: 100px">ddddddd</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        3333
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script type="text/ecmascript-6">

  import Banners from '../components/productDetail/banners.vue'
  import Price from '../components/productDetail/price.vue'
  import Service from '../components/productDetail/service.vue'
  import Rate from '../components/productDetail/rate.vue'
  import Footer from '../components/productDetail/footer.vue'

  export default {
    components: {
      'VBanners': Banners,
      'VPrice': Price,
      'VService': Service,
      'VRate': Rate,
      'VFooter': Footer
    },
    data () {
      return {
        selected: '1', // navbar切换
        rateResponse: [],
//        rateResponse: [{
//          'ReviewId': '1',
//          'CreateTime': '',
//          'CustomerName': '',
//          'ProQuality': 0,
//          'ReflexContext': '',
//          'Tags': [],
//          'Pics': [],
//          'ReflexCount': 0,
//          'ServiceReflexs': null,
//          'IsMaxMember': false
//        }],
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
    methods: {}
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    background-color: #ebebeb;
    overflow-y: auto;
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #8BC34A;
    color: #4CAF50;
    z-index: 9999;
  }
</style>
