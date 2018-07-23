<template>
  <div class="cartEmpty">
    <div>
      <img src="../../assets/images/emptyCart.png"/>
      <p>您的购物车空空如也</p>
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
        this.$router.push({name: '首页'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .cartEmpty {
    height: 84vh;
    margin-top: 8vh;
    display: flex;
    >div{
      margin: auto;
      img {
        width: 100%;
      }
      > p {
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
  }

  @media screen and (min-width: 768px) {
    .cartEmpty {
      width: 100%;
      >div{
        > p {
          width: 100%;
          font-size: 26px;
          padding-bottom: 20px;
        }
        > div {
          width: 100%;
          margin-top: 10px;
          .goToShop {
            width: 150px;
          }
        }
      }
    }
  }
</style>
