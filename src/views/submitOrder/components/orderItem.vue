<template>
  <div class="order-item">
    <p class="title van-hairline--bottom">{{groupItem.groupName}}</p>
    <div class="group-item van-hairline--bottom"
         v-for="item in groupItem.groupItemList"
         :key="item.productId"
    >
      <img :src="`http://picpro-sz.34580.com/sz/ImageUrl/${item.productInfo.pictureId}/120.jpeg`"
           alt="购物车图片"/>
      <div class="product-info">
        <p class="product-name">{{item.productInfo.productName}}</p>
        <div class="content">
          <p class="price">
            <span class="period-money">¥{{item.productInfo.periodMoney}}</span>
            <span class="pv-standard">{{item.productInfo.pvStandard}}</span>
          </p>
          <p class="quantity">×{{item.quantity}}</p>
        </div>
      </div>
    </div>
    <p class="carList-bottom">小计：¥ <span>{{groupItem.groupSum}}</span>元</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      groupItem: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .order-item {
    .title {
      padding: 22rem/@baseFontSize;
      font-size: 1.35rem;
      font-weight: bold;
      color: #626262;
    }
    .group-item {
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 20rem/@baseFontSize;
      img {
        display: block;
        width: 180rem/@baseFontSize;
      }
      .product-info {
        padding-left: 1rem;
        flex: 1;
        min-width: 0;
        .product-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 1rem;
          color: #333;
          font-size: 1.65rem;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .pv-standard {
            color: #999;
            font-size: 1.5rem;
          }
          .period-money {
            margin-right: .5rem;
            color: @priceColor;
            font-size: 1.8rem;
          }
          .quantity {
            letter-spacing: .2rem;
            color: #333;
            font-size: 1.65rem;
          }
        }
      }
    }
    .carList-bottom {
      border-radius: 5rem/@baseFontSize;
      display: flex;
      align-items: center;
      padding-left: 2rem;
      height: 4rem;
      line-height: 4rem;
      font-size: 1.3rem;
      span{
        padding: 0 .3rem;
        color: @priceColor;
        font-size: 2rem;
      }
    }
  }
</style>
