<template>
  <div class="footer">
    <div class="icon" @click="toService">
      <i class="iconfont icon-kefu"></i>
      <p>客服</p>
    </div>
    <div class="icon" @click="onLike">
      <i class="iconfont icon-favor" :class="{myLikeProduct:isLikeProduct}"></i>
      <p :class="{myLikeProduct:isLikeProduct}">收藏</p>
    </div>
    <div class="icon" @click="toCartPage">
      <i class="iconfont icon-cart"></i>
      <mt-badge size="small" type="error">99+</mt-badge>
      <p>购物车</p>
    </div>
    <div class="addCart">
      <p>加入购物车</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import Util from '../../util/common'

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
    computed: {},
    methods: {
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
    display: flex;
    width: 100%;
    height: 10vh;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0px -1px 10px #cccccc;
    .icon {
      flex: 1 1 auto;
      margin: auto;
      text-align: center;
      padding: 10px;
      i {
        font-size: 5vw;
      }
      .myLikeProduct {
        color: #ff1908;
      }
      span.mint-badge.is-error.is-size-small {
        position: absolute;
      }
    }
    .addCart {
      height: 100%;
      width: 40vw;
      background-color: #f05423;
      display: flex;
      p {
        margin: auto;
        color: #fff;
        font-weight: bold;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .footer {
      width: 768px;
      height: 65px;
      .icon {
        cursor: pointer;
        i {
          font-size: 28px;
        }
      }
      .addCart {
        cursor: pointer;
        height: 100%;
        width: 268px;
        background-color: #f05423;
        display: flex;
        p {
          margin: auto;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
</style>
