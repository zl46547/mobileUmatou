<template>
  <div class="cartEmpty">
    <img src="../../assets/images/emptyCart.png"/>
    <p>您的购物车空空如也</p>
    <div>
      <div class="goToShop">
        <p @click="goHome">去逛逛</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    computed: {},
    methods: {
      goHome () {
        this.$router.push({name: '首页'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .cartEmpty {
    height: 74vh;
    img {
      width: 100%;
    }
    >p {
      color: #ccc;
      width: 100%;
      text-align: center;
      font-size: 5vw;
    }
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 2vh;
      .goToShop {
        cursor: pointer;
        display: flex;
        width: 25vw;
        height: 6vh;
        border-radius: 5px;
        color: #fff;
        background-color: #49aa34;
        p {
          margin: auto
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
  }
</style>
