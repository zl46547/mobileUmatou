<template>
  <div class="fixCar">
    <i class="icon iconfont icon-cart"></i>
    <div class="num">
      <span>{{carListNUm}}</span>
    </div>
    <vshop-cart-balls ref="ball"></vshop-cart-balls>
  </div>
</template>

<script type="text/ecmascript-6">
  import shopCartBalls from '@/components/car/shop-cart-balls.vue'
  export default {
    components: {
      'VshopCartBalls': shopCartBalls
    },
    computed: {
      carListNUm() {
        var carList = this.$store.state.car.carList
        var num = 0
        if (carList.length > 0) {
          var list = carList.select(function (e) {
            return e.buyNum
          })
          list.forEach(function (e) {
            num += parseInt(e)
          })
        }
        return num
      }
    },
    methods: {
      drop(target) {
        this.$refs.ball.drop(target)
      }
    }
  }
</script>

<style lang="less" scoped>
  /* 加载字体样式 */
  @import "../../assets/font/iconfont.css";

  .fixCar {
    cursor: pointer;
    position: fixed;
    left: 50%;
    transform: translateX(-49vw);
    bottom: 22vh;
    font-size: 2vw;
    width: 14vw;
    height: 14vw;
    border-radius: 50%;
    background-color: #ffaa2c;
    display: flex;
    .iconfont {
      margin: auto;
      font-size: 6.2vw;
      color: #fff;
    }
    .num {
      position: absolute;
      right: -1vw;
      top: -1vw;
      width: 5vw;
      height: 5vw;
      display: flex;
      border-radius: 50%;
      background-color: #ff2c01;
      color: #fff;
      span {
        margin: auto;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .fixCar {
      left: 50%;
      transform: translateX(-355px);
      bottom: 120px;
      font-size: 20px;
      width: 70px;
      height: 70px;
      .iconfont {
        font-size: 46px;
      }
      .num {
        right: -7px;
        top: -8px;
        width: 30px;
        height: 30px;
      }
    }
  }
</style>
