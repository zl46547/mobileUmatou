<template>
    <div class="activity-item">
      <img :src="detail.fileList[0].url" alt="商品"/>
      <div class="product-detail">
        <p class="product-name">{{detail.productName}}</p>
        <p class="price">
          <span>原价</span>
          <span>￥</span>
          <span>{{detail.price}}</span>
        </p>
        <p class="after-rebate-price">
          <span>到手价</span>
          <span>￥</span>
          <span>{{detail.afterRebatePrice}}</span>
        </p>
      </div>
      <div class="product-footer">立即购买</div>
    </div>
</template>

<script>
  export default {
    props: {
      detail: {
        require: true
      }
    },
    methods: {},
    components: {}
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .activity-item{
    border-radius: 5rem/@baseFontSize;
    background-color: #fff;
    box-sizing: border-box;
    width: 46%;
    margin: 2%;
    img {
      width: 100%;
    }
    .product-detail {
      padding: 20rem/@baseFontSize;
      padding-bottom: 0;
      .product-name {
        text-align: left;
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
        font-size: 28rem/@baseFontSize;
        word-break:break-all;
        display:-webkit-box;//对象作为伸缩盒子模型显示
        -webkit-box-orient:vertical;//设置或检索伸缩盒对象的子元素的排列方式
        -webkit-line-clamp:2;//显示行数## 标题文字 ##
      }
      .after-rebate-price,.price {
        display: flex;
        align-items: baseline;
        padding-bottom: .5rem;
        font-size: 28rem/@baseFontSize;;
        span:nth-of-type(3) {
          font-size: 34rem/@baseFontSize;;
          font-family: monospace;
        }
      }
      .after-rebate-price{
        color: @priceColor;
      }
      .price{
        color: #ddd;
        text-decoration: line-through;
      }
    }
    .product-footer {
      width: 100%;
      line-height: 3.5rem;
      height: 3.5rem;
      background-color: @priceColor;
      color: #fff;
      text-align: center;
    }
  }
</style>
