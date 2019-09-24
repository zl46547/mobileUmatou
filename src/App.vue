<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="slide-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Loading v-show="fetchLoading"></Loading>
  </div>
</template>
`
<script>
  import Loading from '@/common/_loading'

  export default {
    components: {
      Loading
    },
    computed: {
      fetchLoading () {
        return this.$store.state.detail.fetchLoading
      }
    }
  }
</script>

<style lang="less">
  @import "./less/index.less";

  #app {
    position: relative;
    max-width: 640px;
    min-width: 320px;
    margin: 0 auto;
    height: 100vh;
    overflow: hidden;
    background-color: #ebebeb;
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active, .slide-fade-leave-active {
      transition: all .5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(20rem/@baseFontSize);
      opacity: 0;
    }
  }
</style>
