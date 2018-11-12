<template>
  <div id="cartEmpty">
    <div>
      <img src="../../../assets/images/emptyCart.png" mode="widthFix"/>
      <div class="state">您的购物车空空如也</div>
      <div>
        <div class="goToShop" @click="goHome">
          <p>去逛逛</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    computed: {},
    methods: {
      goHome () {
        var vm = this
        vm.$router.push({name: '首页'})
      }
    }
  }
</script>

<style lang="less" scoped>
  #cartEmpty {
    height: calc(100vh - 100px);
    display: flex;
    > div {
      margin: auto;
      image {
        width: 100%;
      }
      .state {
        color: #ccc;
        width: 100%;
        text-align: center;
        font-family: "Microsoft PhagsPa";
        font-size: 1.45rem;
      }
      > div {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 2vh;
        .goToShop {
          font-size: 1.3rem;
          cursor: pointer;
          display: flex;
          width: 25%;
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
  }
</style>
