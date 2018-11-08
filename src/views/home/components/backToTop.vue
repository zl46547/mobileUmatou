<template>
  <div class="backToTop" @click="backToTop()">
    <i class="icon iconfont icon-fanhuidingbu"></i>
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
  /* 加载字体样式 */
  @import "../../../assets/font/iconfont.css";

  .backToTop {
    cursor: pointer;
    position: fixed;
    right: 50%;
    transform: translate(45vw, 0);
    bottom: 15vh;
    font-size: 2vw;
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
    background-color: rgba(78, 78, 78, 0.45);
    display: flex;
    .iconfont {
      margin: auto;
      font-size: 6.2vw;
      color: #4c4949;
    }
  }

  @media screen and (min-width: 640px) {
    .backToTop {
      right: 50%;
      transform: translate(300px, 0);
      bottom: 120px;
      font-size: 20px;
      width: 70px;
      height: 70px;
      .iconfont {
        font-size: 46px;
      }
    }
  }
</style>
