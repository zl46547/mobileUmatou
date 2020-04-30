<template>
  <div id="app">
    <transition name="page-slide">
      <router-view class="position-div"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
  @import "../../less/index.less";

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
    .page-slide-enter-active,
    .page-slide-leave-active {
      transition: all 0.5s ease;
    }
    .page-slide-leave-to {
      /*transform: translateX(-100%);*/
      opacity: 0;
    }
    .page-slide-enter {
      /*transform: translateX(100%);*/
      opacity: 0;
    }
    /* 解决动画留白 */
    .position-div{
      position:absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
    }
  }
</style>
