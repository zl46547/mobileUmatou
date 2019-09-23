<template>
  <div id="home">
    <Header></Header>
    <div class="content" ref="content">
      <Swiper/>
      <MenuList/>
      <FlashSale/>
      <DefaultHome/>
      <div class="baseLine">
        <img src="../../assets/images/baseline.png"/>
      </div>
    </div>
    <transition name="slide-fade">
      <BackToTop v-show="showBackToTop"/>
    </transition>
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
    mounted () {
      this.contentEle = this.$refs.content
      this.contentEle.addEventListener('scroll', this.getScrollTop)
    },
    beforeDestroy () {
      this.contentEle.removeEventListener('scroll', this.getScrollTop)
    },
    beforeRouteEnter (to, from, next) {
      next(_this => {
        _this.$refs.content.scrollTop = _this.$store.state.common.scrollTop
      })
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
    height: 100%;
    overflow: hidden;
    .content {
      margin-top: 100rem/@baseFontSize;
      height: calc(100% - 9.5rem);
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
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active, .slide-fade-leave-active {
      transition: all .5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
      /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(10rem/@baseFontSize);
      opacity: 0;
    }
  }
</style>
