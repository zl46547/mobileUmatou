<template>
  <div class="price van-hairline--top-bottom">
    <div class="product-name">{{price.productName}}</div>
    <div class="price">
      <span>¥</span>
      <span class="period-money">{{price.periodMoney}}</span>
      <span class="unit">/{{price.unit}}</span>
    </div>
    <div class="market-price">
      <p class="market-price-label">市场价：</p>
      <p class="default-money">{{price.defaultMoney}}元/{{price.unit}}</p>
      <p class="sold-number">已售{{price.soldNumber}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['price']
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .price {
    background-color: #fff;
    padding: 20rem/@baseFontSize 34rem/@baseFontSize;
    .product-name {
      margin-bottom: 20rem/@baseFontSize;
      font-size: 30rem/@baseFontSize;
      color: #333;
    }
    .price {
      font-size: 22rem/@baseFontSize;
      padding: 15rem/@baseFontSize 0;
      color: @priceColor;
      .period-money {
        font-size: 34rem/@baseFontSize;
      }
      .unit {
        color: #999;
        letter-spacing: 2px;
        font-size: 1.25rem;
      }
    }
    .market-price {
      color: #999;
      display: flex;
      align-items: baseline;
      font-size: 1.3rem;
      .default-money{
        letter-spacing: 2px;
        text-decoration: line-through;
      }
      .sold-number{
        flex: 1;
        text-align: right;
      }
    }
  }
</style>
