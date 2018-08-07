<template>
  <div class="index">
    <v-header></v-header>
    <div class="content" @mousewheel="getScorlTop()">
      <v-swiper :adverise="swiperData.Data" v-if="swiperData"></v-swiper>
      <v-service></v-service>
      <v-flashSale :flashSale="flashSaleData.Data" v-if="flashSaleData"></v-flashSale>
      <v-defaultHome :defaultHome="defaultHomeData" v-if="defaultHomeData"></v-defaultHome>
      <v-baseline></v-baseline>
    </div>
    <v-back-to-top v-show="showBackToTop" @hide="getScorlTop"></v-back-to-top>
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
  import BackToTop from '@/common/_backToTop.vue'
  import utils from '@/util/common.js'

  export default {
    components: {
      'VHeader': Header,
      'VSwiper': Swiper,
      'VService': Service,
      'VFlashSale': FlashSale,
      'VDefaultHome': DefaultHome,
      'VBaseline': Baseline,
      'VFooter': Footer,
      'VBackToTop': BackToTop
    },
    data () {
      return {
        swiperData: '',
        flashSaleData: '',
        defaultHomeData: '',
        showBackToTop: false
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
          var flag = utils.isEmpty(res.data)
          if (!flag) {
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
          if (!utils.isEmpty(res.data.Data.FloorInfo.ConfigHomeFloors)) {
            var defaultHomeData = res.data.Data.FloorInfo.ConfigHomeFloors
            defaultHomeData.forEach(function (e) {
              e.PicAdvItems.forEach(function (t) {
                switch (t.JumpType) {
                  case 4:
                    t.routerlink = `/productDetail/${t.JumpValue}`
                    break
                  case 5:
                    t.routerlink = `/categoryDetail/${t.JumpValue}`
                    break
                }
              })
            })
            vm.defaultHomeData = defaultHomeData
//            var test = res.data.Data.FloorInfo.ConfigHomeFloors
//            var newTest = test.where(function (t) {
//              if (Object.prototype.toString.call(t.PicAdvItems) === '[object Array]') {
//                return t.PicAdvItems[0].JumpType === 4 || t.PicAdvItems[0].JumpType === 5
//              }
//            }).distinct(function (a, b) {
//              return a.Id === b.Id
//            })
//            console.log(JSON.stringify(newTest))
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      getScorlTop () {
        var top = document.getElementsByClassName('content')[0].scrollTop
        if (top > 400) {
          this.showBackToTop = true
        } else {
          this.showBackToTop = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .index{
    height: 100%;
    position: relative;
    overflow: hidden;
    .content {
      margin-top: 8vh;
      height: 84vh;
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
