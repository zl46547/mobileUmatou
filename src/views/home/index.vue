<template>
  <div id="home">
    <v-header></v-header>
    <div class="content" @mousewheel="getScorlTop()">
      <v-swiper></v-swiper>
      <v-menu-list></v-menu-list>
      <v-flashSale></v-flashSale>
      <v-default-home></v-default-home>
      <div class="baseLine">
        <img src="../../assets/images/baseline.png"/>
      </div>
    </div>
    <v-back-to-top v-show="showBackToTop" @hide="getScorlTop"></v-back-to-top>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/header/index.vue'
  import Footer from '@/common/footer/index.vue'
  import DefaultHome from './components/defaultHome.vue'
  import FlashSale from './components/flashSale.vue'
  import Swiper from './components/swiper.vue'
  import MenuList from './components/menuList.vue'
  import BackToTop from './components/backToTop.vue'

  export default {
    components: {
      'VHeader': Header,
      'VSwiper': Swiper,
      'VMenuList': MenuList,
      'VFlashSale': FlashSale,
      'VDefaultHome': DefaultHome,
      'VFooter': Footer,
      'VBackToTop': BackToTop
    },
    data () {
      return {
        showBackToTop: false
      }
    },
    mounted () {
    },
    methods: {
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
  #home {
    height: 100%;
    position: relative;
    overflow: hidden;
    .content {
      margin-top: 55px;
      height: calc(100vh - 110px);
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .baseLine {
        text-align: center;
        img{
          width: 50%;
          margin: 10px auto;
        }
      }
    }
  }
  @media screen and (min-width: 400px) {
    #home {
      .content {
        margin-top: 60px;
        height: calc(100vh - 115px);
        .baseLine {
          img{
            margin: 20px auto;
          }
        }
      }
    }
  }
</style>
