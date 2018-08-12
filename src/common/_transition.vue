<template>
  <transition
    name="bounce"
    mode="out-in"
    v-on:before-enter="beforeEnter"
    v-on:after-enter="afterEnter">
    <slot></slot>
  </transition>
</template>

<script type="text/ecmascript-6">

  export default {
    methods: {
      beforeEnter: function (el) {
      },
      afterEnter: function (el) {
      }
    }
  }
</script>

<style lang="less" scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      top:-100vh
    }
    100% {
      top:0
    }
  }

  @media screen and (min-width: 640px) {
  }
</style>
