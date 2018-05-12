<template>
  <div>
    <v-header></v-header>
    <v-swiper :adverise="swiperData.Data" v-if="swiperData"></v-swiper>
    <v-service></v-service>
    <v-flashSale :flashSale="flashSaleData.Data" v-if="flashSaleData"></v-flashSale>
    <v-defaultHome :defaultHome="defaultHomeData.Data" v-if="defaultHomeData"></v-defaultHome>
    <v-baseline></v-baseline>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/index/header.vue'
  import Swiper from '@/components/index/swiper.vue'
  import Service from '@/components/index/service.vue'
  import FlashSale from '@/components/index/flashSale.vue'
  import DefaultHome from '@/components/index/defaultHome.vue'
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import api from '@/http/ajax.js'
  import utils from '@/util/common.js'

  export default {
    components: {
      'VHeader': Header,
      'VSwiper': Swiper,
      'VService': Service,
      'VFlashSale': FlashSale,
      'VDefaultHome': DefaultHome,
      'VBaseline': Baseline,
      'VFooter': Footer
    },
    data () {
      return {
        swiperData: '',
        flashSaleData: '',
        defaultHomeData: ''
      }
    },
    mounted () {
      this.getAdverises()
      this.getFlashSale()
      this.getDefaultHome()
    },
    methods: {
      /**
       * 获取轮播图数据
       */
      getAdverises () {
        var vm = this
        var url = 'https://wechatx.34580.com/sz/Home/AdvertisementPhotoshootRequest'
        var requestData = {
          'sourcetype': 9,
          'json': {
            'TypeCode': 1011,
            'PlatForm': 1500
          }
        }
        api.ajax(url, requestData, function (val) {
          if (!utils.isEmpty(val.query.results)) {
            vm.swiperData = val.query.results.json
          }
        })
      },
      /**
       * 获取限时抢购数据
       */
      getFlashSale () {
        var vm = this
        var url = 'https://wechatx.34580.com/sz/Home/FlashSaleRequest'
        var requestData = {
          'sourcetype': 9
        }
        api.ajax(url, requestData, function (val) {
          if (!utils.isEmpty(val.query.results)) {
            vm.flashSaleData = val.query.results.json
          }
        })
      },
      /**
       * 获取首页数据
       */
      getDefaultHome () {
        var vm = this
        var url = 'https://wechatx.34580.com/sz/Home/DefaultHomeRequest'
        var requestData = {
          'sourcetype': 9
        }
        api.ajax(url, requestData, function (val) {
          if (!utils.isEmpty(val.query.results)) {
            vm.defaultHomeData = val.query.results.json
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
