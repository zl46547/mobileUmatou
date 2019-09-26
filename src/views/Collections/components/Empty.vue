<template>
  <div id="empty">
    <i class="iconfont icon-empty-list"></i>
    <div>您的收藏列表空空如也</div>
    <div>可以去看看有哪些想买</div>
    <div class="goToBuy" @click="goToBuy">随便逛逛</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      /**
       * 随便逛逛
       */
      goToBuy () {
        this.$router.push({name: '首页'})
      }
    }
  }
</script>

<style lang="less" scoped>
  #empty {
    text-align: center;
    margin-top: 40%;
    .iconfont {
      color: #c2c2c2;
      margin: auto;
      font-size: 6rem;
    }
    div:nth-of-type(1) {
      font-size: 1.6rem;
      white-space: nowrap;
      padding: 1.5vh;
      text-align: center;
    }
    div:nth-of-type(2) {
      font-size: 1.3rem;
      padding-bottom: 1.2rem;
      text-align: center;
      white-space: nowrap;
    }
    .goToBuy {
      width: 5rem;
      font-size: 1.3rem;
      text-align: center;
      margin: 0.5rem auto;
      padding: .6rem 1rem;
      border: 1px solid #a0a0a0;
      border-radius: .5rem;
      cursor: pointer;
      white-space: nowrap;
    }
  }
</style>
