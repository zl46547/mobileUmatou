<template>
  <div id="footer">
    <div class="icon" @click="toService">
      <div class="iconfont icon-kefu"></div>
      <div class="icon-text">客服</div>
    </div>
    <div class="icon" @click="onLike">
      <div class="iconfont icon-shoucang" :class="{'myLikeProduct':isLikeProduct}"></div>
      <div :class="{'myLikeProduct':isLikeProduct}" class="icon-text">收藏</div>
    </div>
    <div class="icon cart" @click="toCartPage">
      <div class="iconfont icon-gouwuche"></div>
      <div class="badge" v-if="getCarsNum>0">{{getCarsNum}}</div>
      <div class="icon-text">购物车</div>
    </div>
    <div class="addCart" @click="addCart">
      <div>加入购物车</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import addCartUtil from '@/util/addCart.js'
  import Util from '@/util/common.js'
  import { Toast } from 'mint-ui'
  export default {
    props: ['productInfo'],
    data () {
      return {
        productId: '',
        isLikeProduct: false
      }
    },
    watch: {
      productInfo () {
        var vm = this
        var likeList = Util.getLocal('LIKE_PRODUCT') || []
        var length = likeList.where(function (e) {
          return e.ProductId === vm.productInfo.ProductId
        }).length
        if (length > 0) {
          vm.isLikeProduct = true
        } else {
          vm.isLikeProduct = false
        }
      }
    },
    computed: {
      getCarsNum () {
        var vm = this
        var num = 0
        vm.$store.state.car.carList.forEach((e) => {
          num += e.buyNum
        })
        return num
      }
    },
    methods: {
      /**
       * 加入购物车
       * @param val
       */
      addCart() {
        var vm = this
        addCartUtil.addCart(vm.productInfo)
        Toast({
          message: '加入购物车成功'
        })
      },
      /**
       * 收藏
       */
      onLike () {
        var vm = this
        // 这边本应该是操作数据库的，但我这里不做后台的服务，所以直接存入localstore
        var likeList = Util.getLocal('LIKE_PRODUCT') || []
        var length = likeList.where(function (e) {
          return e.ProductId === vm.productInfo.ProductId
        }).length
        if (length > 0) {
          vm.isLikeProduct = false
          likeList.removeAll(function (e) {
            return e.ProductId === vm.productInfo.ProductId
          })
        } else {
          vm.isLikeProduct = true
          likeList.push(vm.productInfo)
        }
        Util.setLocal('LIKE_PRODUCT', likeList)
      },
      /**
       * 客服功能
       */
      toService () {
        Toast({
          message: '该功能暂未开发'
        })
      },
      /**
       * 跳转至购物车页面
       */
      toCartPage () {
        var vm = this
        vm.$router.push({name: '购物车页'})
      }
    }
  }
</script>

<style lang="less" scoped>
  #footer {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    max-width: 640px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    box-shadow: 0 -0.5px 10px rgb(235, 235, 235);
    .icon {
      margin: auto;
      text-align: center;
      cursor: pointer;
      width: 20%;
      .iconfont {
        font-size: 1.5rem;
      }
      .icon-text {
        font-size: 1.25rem;
      }
      .myLikeProduct {
        color: #ff1908;
      }
      .badge {
        font-size: 1rem;
        position: absolute;
        right: 20%;
        top: -10%;
        background-color: #ff1908;
        color: #fff;
        width: 18px;
        height: 18px;
        justify-content: center;
        display: flex;
        align-items: center;
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
      div {
        font-size: 1.25rem;
        margin: auto;
        color: #fff;
      }
    }
    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .iconfont {
      font-family: "iconfont";
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-kefu:before {
      content: "\e646";
    }

    .icon-shoucang:before {
      content: "\e612";
    }

    .icon-gouwuche:before {
      content: "\e622";
    }
  }
</style>
