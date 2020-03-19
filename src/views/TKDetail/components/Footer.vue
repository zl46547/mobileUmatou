<template>
  <div class="footer van-hairline--top">
    <div class="icon" @click="toService">
      <i class="iconfont icon-kefu"></i>
      <span class="icon-text">客服</span>
    </div>
    <div class="icon" @click="onLike">
      <i class="iconfont"
           :class="{
           'icon-like':!isLikeProduct,
           'icon-like-checked':isLikeProduct,
           'my-like-product':isLikeProduct
           }"
      ></i>
      <span :class="{'my-like-product':isLikeProduct}"
           class="icon-text">收藏</span>
    </div>
    <div class="icon cart" @click="toCartPage">
      <i class="iconfont icon-cart"></i>
      <div class="badge" v-if="count>0">{{count}}</div>
      <span class="icon-text">购物车</span>
    </div>
    <div class="add-cart" @click="addCart">
      加入购物车
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
  } from '../service'
  import { Toast } from 'vant'

  export default {
    props: {
      productId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        count: 0,
        isLikeProduct: false
      }
    },
    async created () {
      // 初始化购物车数量
    },
    methods: {
      /**
       * 加入购物车
       */
      addCart () {
      },
      /**
       * 收藏
       */
      onLike () {
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
        this.$router.push({name: '购物车页'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .footer {
    width: 100%;
    height: 100rem/@baseFontSize;
    background-color: #fff;
    display: flex;
    align-items: center;
    .icon {
      line-height: 100rem/@baseFontSize;
      height: 100%;
      margin: auto;
      text-align: center;
      cursor: pointer;
      flex: 1;

      .iconfont {
        font-size: 32rem/@baseFontSize;
      }

      .icon-text {
        font-size: 30rem/@baseFontSize;
      }

      .my-like-product {
        color: @red;
      }

      .badge {
        z-index: 999;
        font-size: 20rem/@baseFontSize;
        width: 30rem/@baseFontSize;
        height: 30rem/@baseFontSize;
        line-height: 30rem/@baseFontSize;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-10%,-110%);
        background-color: @red;
        color: #fff;
        text-align: center;
        border-radius: 50%;
      }
    }

    .cart {
      position: relative;
    }

    .add-cart {
      font-size: 30rem/@baseFontSize;
      line-height: 100rem/@baseFontSize;
      height: 100%;
      text-align: center;
      width: 30%;
      background-color: @red;
      cursor: pointer;
      color: #fff;
    }
  }
</style>
