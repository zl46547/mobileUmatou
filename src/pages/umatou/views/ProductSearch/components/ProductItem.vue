<template>
  <div class="detail-item" @click="goToDetail(productItem.ProductId)">
    <img :src="`http://picpro-sz.34580.com/sz/ImageUrl/${productItem.PictureId}/500.jpeg`" alt="分类详情"/>
    <div class="product-detail">
      <p class="product-name">{{productItem.ProductName}}</p>
      <p class="product-standard">{{productItem.PvStandard}}</p>
      <div class="product-footer">
        <p class="period-money">
          <span>￥</span>
          <span>{{productItem.PeriodMoney}}</span>
        </p>
        <i class="iconfont icon-cart"
           @click.stop="addCart(productItem.ProductId)"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addGoods } from '../service'
  export default {
    props: {
      productItem: {
        required: true,
        type: Object
      }
    },
    data() {
      return {
      }
    },
    components: {
    },
    methods: {
      /**
       * 跳转商品详情页面
       * @param productId
       */
      goToDetail (productId) {
        this.$router.push({name: '商品详情', params: {productId}})
      },
      /**
       * 加入购物车
       * @param productId
       */
      addCart (productId) {
        addGoods(productId)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  .detail-item {
    border-radius: 5rem/@baseFontSize;
    background-color: #fff;
    box-sizing: border-box;
    width: 48%;
    margin: 1%;
    img {
      width: 100%;
    }
    .product-detail {
      padding: 20rem/@baseFontSize;
      padding-bottom: 0;
      .product-name {
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        font-size: 26rem/@baseFontSize;
      }
      .product-standard {
        color: #999899;
        font-size: 24rem/@baseFontSize;
      }
      .product-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10rem/@baseFontSize;
        .period-money {
          display: flex;
          align-items: baseline;
          color: @priceColor;
          span:nth-of-type(1) {
            font-size: 20rem/@baseFontSize;;
          }
          span:nth-of-type(2) {
            font-size: 28rem/@baseFontSize;;
            font-family: monospace;
          }
        }
        .icon-cart {
          width: 40rem/@baseFontSize;
          height: 40rem/@baseFontSize;
          line-height: 40rem/@baseFontSize;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 50%;
          display: block;
          cursor: pointer;
          font-size: 22rem/@baseFontSize;;
          color: @priceColor;
        }
      }
    }
  }
</style>
