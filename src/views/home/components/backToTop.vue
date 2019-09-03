<template>
  <div class="backToTop" @click="backToTop()">
    <i class="icon iconfont icon-scrollTop"></i>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    methods: {
      backToTop () {
        let timer = setInterval(() => {
          var top = document.getElementsByClassName('content')[0].scrollTop
          let speed = Math.ceil(top / 5)
          document.getElementsByClassName('content')[0].scrollTop = top - speed
          if (top === 0) {
            this.$emit('hide', false)
            clearInterval(timer)
          }
        }, 20)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  /* 加载字体样式 */
  .backToTop {
    cursor: pointer;
    position: fixed;
    right: 10rem/@baseFontSize;
    bottom: 130rem/@baseFontSize;
    width: 70rem/@baseFontSize;
    height: 70rem/@baseFontSize;
    border-radius: 50%;
    background-color: rgba(78, 78, 78, 0.45);
    display: flex;
    .iconfont {
      margin: auto;
      font-size: 40rem/@baseFontSize;
      color: #4c4949;
    }
  }
  @media screen and (min-width: 640px) {
    .backToTop {
      right: 50%;
      transform: translate(300px, 0);
    }
  }
</style>
