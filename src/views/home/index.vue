<template>
  <div id="home">
    <Header></Header>
    <div class="content">
      <Swiper/>
      <MenuList/>
      <FlashSale/>
      <DefaultHome/>
      <div class="baseLine">
        <img src="../../assets/images/baseline.png"/>
      </div>
    </div>
    <BackToTop v-show="showBackToTop"/>
    <Footer/>
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
  import utils from '../../util/common'

  export default {
    components: {
      Header,
      Swiper,
      MenuList,
      FlashSale,
      DefaultHome,
      Footer,
      BackToTop
    },
    data () {
      return {
        contentEle: null,
        showBackToTop: false
      }
    },
    mounted() {
      this.contentEle = document.getElementsByClassName('content')[0]
      this.contentEle.addEventListener('scroll', this.getScrollTop)
    },
    beforeDestroy() {
      this.contentEle.removeEventListener('scroll', this.getScrollTop)
    },
    methods: {
      getScrollTop: utils.throttle(function ({target}) {
        this.showBackToTop = target.scrollTop > 400
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #home {
    height: 100vh;
    position: relative;
    overflow: hidden;
    .content {
      margin-top: 100rem/@baseFontSize;
      height: calc(100% - 10rem);
      &::-webkit-scrollbar {
      display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .baseLine {
        text-align: center;
        img {
          width: 50%;
          margin: 10rem/@baseFontSize auto;
        }
      }
    }
  }
</style>
