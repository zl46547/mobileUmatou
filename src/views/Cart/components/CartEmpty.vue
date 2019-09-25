<template>
  <div class="cart-empty">
    <img src="../../../assets/images/emptyCart.png"/>
    <div class="state">您的购物车空空如也</div>
    <p class="go-home-btn" @click="goHome">去逛逛</p>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    methods: {
      goHome () {
        this.$router.push({name: '首页'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .cart-empty {
    img {
      margin: 15% auto 0;
      display: block;
    }
    .state {
      color: #ccc;
      width: 100%;
      text-align: center;
      font-size: 26rem/@baseFontSize;
    }
    .go-home-btn {
      margin: 20rem/@baseFontSize auto;
      line-height: 60rem/@baseFontSize;
      border-radius: 5rem/@baseFontSize;
      font-size: 22rem/@baseFontSize;
      background-color: @themeColor;
      width: 130rem/@baseFontSize;
      height: 60rem/@baseFontSize;
      text-align: center;
      cursor: pointer;
      color: #fff;
    }
  }
</style>
