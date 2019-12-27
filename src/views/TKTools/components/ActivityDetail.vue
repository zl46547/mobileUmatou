<template>
  <div id="TK-activity-detail" @click.stop>
    <Swipe :autoplay="5000" indicator-color="white" :width="280">
      <SwipeItem v-for="item in detail.fileList" :key="item.url">
        <img :src="item.url" alt="" class="swipe-image">
      </SwipeItem>
    </Swipe>
    <div class="product-info">
      <p class="product-name">{{detail.productName}}</p>
      <p class="price-container" v-if="!detail.isFirstOrder">
        <span class="price-label">原价</span>
        <span class="price">¥{{detail.price}}</span>
      </p>
      <div class="price-container" v-else>
        <span class="first-order-tag">首单</span>
        <div class="coupon-after-price">
          <span>¥</span>
          <span>{{detail.price | getInteger}}.</span>
          <span class="decimal">{{detail.price | getDecimal}}</span>
        </div>
      </div>
      <div class="coupon-after-container coupon-after-container-bt">
        <div class="tag">
          <p>券</p>
          <p>{{detail.coupon}}元</p>
        </div>
        <div class="coupon-after-label">
          付费价
        </div>
        <div class="coupon-after-price">
          <span>¥</span>
          <span>{{detail.afterCouponPrice | getInteger}}.</span>
          <span class="decimal">{{detail.afterCouponPrice | getDecimal}}</span>
        </div>
      </div>
      <div class="coupon-after-container">
        <div class="tag">
          <p>返</p>
          <p>{{detail.rebate}}元</p>
        </div>
        <div class="coupon-after-label">
          到手价
        </div>
        <div class="coupon-after-price">
          <span>¥</span>
          <span>{{detail.afterRebatePrice | getInteger}}.</span>
          <span class="decimal">{{detail.afterRebatePrice | getDecimal}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Swipe, SwipeItem} from 'vant'

  export default {
    props: {
      detail: {
        require: true
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    data() {
      return {
      }
    },
    filters: {
      getInteger(value) {
        value = Number(value).toFixed(2).split('.')
        return value[0]
      },
      getDecimal(value) {
        value = Number(value).toFixed(2).split('.')
        return value[1]
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  #TK-activity-detail{
    background-color: #fff;
    border-radius: 5px;
    .swipe-image{
      display: block;
      width: 100%;
    }
  }

  .product-info {
    padding: 16px;
    box-sizing: border-box;

    .product-name {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 10px;
    }

    .price-container {
      margin-bottom: 16px;
      display: flex;
      align-items: center;

      .first-order-tag {
        display: inline-block;
        border: 1px solid #f00000;
        color: #f00000;
        border-radius: 3px;
        margin-right: 14px;
        text-align: center;
        font-size: 1.4rem;
        width: 38px;
        padding: 3px;
      }

      .first-order-price {
        color: #ff3a00;
        font-size: 1.4rem;
      }

      .price, .price-label {
        color: #ccc;
        font-size: 1.6rem;
      }

      .price {
        text-decoration: line-through;
      }
    }

    .coupon-after-container {
      display: flex;
      align-items: center;
    }

    .coupon-after-container-bt {
      margin-bottom: 16px;
    }

    .tag {
      display: flex;
      border-radius: 3px;
      border: 1px solid #ff3a00;
      margin-right: 14px;

      p {
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-size: 1.4rem;

        &:first-of-type {
          width: 3rem;
          background-color: #ff3a00;
          color: #fff;
        }

        &:last-of-type {
          width: 5rem;
          color: #ff3a00;
        }
      }
    }

    .coupon-after-label {
      font-size: 1.6rem;
      color: #333;
      margin-right: 5px;
    }

    .coupon-after-price {
      display: flex;
      align-items: baseline;
      color: #ff3a00;
      font-size: 2.4rem;
      font-weight: 400;

      span:first-of-type {
        font-size: 1.4rem;
        margin-right: 2px;
      }

      .decimal {
        font-size: 1.4rem;
      }
    }
  }

  .sp-wrap_text{
    display: flex;
    align-items: center;
  }
  .van-icon-clear{
    font-size: 1.6rem;
    margin-left: 5px;
    color: #aaa;
  }
  .van-cell__title{
    width: 90px;
    flex: none;
  }
</style>
