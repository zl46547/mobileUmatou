<template>
  <div id="home">
    <CityHeader></CityHeader>
    <div class="content" ref="content">
      <Swipe/>
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
    <TabBar/>
  </div>
</template>

<script type="text/ecmascript-6">
  import CityHeader from '../../common/CityHeader'
  import TabBar from '../../common/TabBar'
  import DefaultHome from './components/DefaultHome'
  import FlashSale from './components/FlashSale'
  import Swipe from './components/Swipe'
  import MenuList from './components/MenuList'
  import BackToTop from './components/BackToTop'
  import utils from '../../util/common'

  export default {
    components: {
      CityHeader,
      Swipe,
      MenuList,
      FlashSale,
      DefaultHome,
      TabBar,
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
      let scrollTop = this.$store.state.common.scrollTop
      setTimeout(() => {
        this.$refs.content.scrollTop = scrollTop
      }, 200)
    },
    beforeDestroy () {
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
    height: 100%;
    overflow: hidden;
    .content {
      margin-top: 5rem;
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
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active, .slide-fade-leave-active {
      transition: all .5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to{
      transform: translateX(10rem/@baseFontSize);
      opacity: 0;
    }
  }
</style>
