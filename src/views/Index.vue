<template>
  <div>
    <v-header></v-header>
    <div class="content">
      <v-swiper :adverise="swiperData.Data" v-if="swiperData"></v-swiper>
      <v-service></v-service>
      <v-flashSale :flashSale="flashSaleData.Data" v-if="flashSaleData"></v-flashSale>
      <v-defaultHome :defaultHome="defaultHomeData.Data" v-if="defaultHomeData"></v-defaultHome>
      <v-baseline></v-baseline>
    </div>
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
        vm.$api({
          method: 'get',
          url: '/shihang/index/command/swiper.json'
        }).then((res) => {
          if (!utils.isEmpty(res.data)) {
            vm.swiperData = res.data
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 获取限时抢购数据
       */
      getFlashSale () {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/index/command/flashSale.json'
        }).then((res) => {
          if (!utils.isEmpty(res.data)) {
            vm.flashSaleData = res.data
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 获取首页数据
       */
      getDefaultHome () {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/index/command/defaultHome.json'
        }).then((res) => {
          if (!utils.isEmpty(res.data)) {
            vm.defaultHomeData = res.data
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 82vh;
    &::-webkit-scrollbar {
      display: none
    }
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
