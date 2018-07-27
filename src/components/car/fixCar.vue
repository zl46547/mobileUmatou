<template>
  <div class="fixCar">
    <div class="cartContainer" :class="{move_in_cart:receiveInCart}" ref="cartContainer">
      <i class="icon iconfont icon-cart"></i>
      <div class="num">
        <span>{{carListNUm}}</span>
      </div>
    </div>
    <vshop-cart-balls ref="ball" @receive="receiveBall"></vshop-cart-balls>
  </div>
</template>

<script type="text/ecmascript-6">
  import shopCartBalls from '@/components/car/shop-cart-balls.vue'
  export default {
    components: {
      'VshopCartBalls': shopCartBalls
    },
    data() {
      return {
        receiveInCart: false // 购物车组件下落的圆点是否到达目标位置
      }
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
      },
      receiveBall(val) {
        this.receiveInCart = true
        // 监听购物车，当购物车动画结束后才将receiveInCart变为false
        this.$refs.cartContainer.addEventListener('animationend', () => {
          this.receiveInCart = false
        })
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
    margin-left: -48%;
    bottom: 20vh;
    font-size: 2vw;
    .cartContainer{
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
  }

  @media screen and (min-width: 768px) {
    .fixCar {
      left: 50%;
      margin-left: -360px;
      bottom: 140px;
      .cartContainer{
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
  }

  .move_in_cart {
    animation: mymove .5s ease-in-out;
  }

  @keyframes mymove {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(.8)
    }
    50% {
      transform: scale(1.1)
    }
    75% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1)
    }
  }
</style>
