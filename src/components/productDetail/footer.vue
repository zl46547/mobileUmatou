<template>
  <div class="footer">
    <div class="icon" @click="toService">
      <i class="iconfont icon-kefu"></i><br>
      <span class="icon-text">客服</span>
    </div>
    <div class="icon" @click="onLike">
      <i class="iconfont icon-favor" :class="{myLikeProduct:isLikeProduct}"></i><br>
      <span :class="{myLikeProduct:isLikeProduct}" class="icon-text">收藏</span>
    </div>
    <div class="icon cart" @click="toCartPage">
      <i class="iconfont icon-cart"></i><br>
      <div class="badge" v-if="getCarsNum>0">{{getCarsNum}}</div>
      <span class="icon-text">购物车</span>
    </div>
    <div class="addCart" @click="addCart">
      <p>加入购物车</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import Util from '../../util/common'
  import addCartUtil from '../../util/addCart'

  export default {
    props: ['response'],
    data () {
      return {
        productId: '',
        isLikeProduct: false
      }
    },
    created () {
      this.productId = this.$route.params.id
    },
    mounted () {
      var list = Util.getLocal('LIKE_PRODUCT') || []
      var index = list.indexOf(this.productId)
      if (index >= 0) {
        this.isLikeProduct = true
      } else {
        this.isLikeProduct = false
      }
    },
    computed: {
      getCarsNum () {
        var list = this.$store.state.car.carList
        var num = 0
        for (var i = 0; i < list.length; i++) {
          num += list[i].buyNum
        }
        return num
      }
    },
    methods: {
      /**
       * 加入购物车
       */
      addCart () {
        var productInfo = this.response.ProductInfo
        addCartUtil.addCart(productInfo)
      },
      /**
       * 收藏
       */
      onLike () {
        // 这边本应该是操作数据库的，但我这里不做后台的服务，所以直接存入localstore
        var list = Util.getLocal('LIKE_PRODUCT') || []
        var index = list.indexOf(this.productId)
        if (index >= 0) {
          this.isLikeProduct = false
          list.splice(index, 1)
        } else {
          this.isLikeProduct = true
          list.push(this.productId)
        }
        Util.setLocal(list, 'LIKE_PRODUCT')
      },
      toService () {
        alert('功能未开发')
      },
      toCartPage () {
        this.$router.push({name: '购物车页'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .footer {
    width: 100%;
    height: 8vh;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -50%;
    display: flex;
    align-items: center;
    box-shadow: 0 -0.5px 20px rgb(221, 221, 221);
    .icon {
      margin: auto;
      text-align: center;
      cursor: pointer;
      i {
        font-size: 5vw;
      }
      .icon-text {
        font-size: 1vw;
      }
      .myLikeProduct {
        color: #ff1908;
      }
      .badge {
        position: absolute;
        right: -4vw;
        top: -2.2vh;
        background-color: #ff1908;
        color: #fff;
        padding: 1.5px 1.8vw;
        font-size: 2vh;
        border-radius: 90px;
      }
    }
    .cart {
      position: relative;
    }
    .addCart {
      height: 100%;
      width: 40%;
      background-color: #f05423;
      display: flex;
      cursor: pointer;
      p {
        margin: auto;
        color: #fff;
        font-weight: bold;
      }
    }
  }

  @media screen and (min-width: 640px) {
    .footer {
      width: 640px;
      margin-left: -320px;
      .icon {
        cursor: pointer;
        i {
          font-size: 32px;
        }
        .icon-text {
          font-size: 12px;
        }
        .badge {
          right: -22px;
          padding: 1.5px 8px;
        }
      }
      .addCart {
        width: 238px;
        background-color: #f05423;
        p {
          margin: auto;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
</style>
