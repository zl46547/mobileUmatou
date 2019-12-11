<template>
  <div class="coupon-item"
       :class="{
           'useful-bgc':coupon.status === 1,
           'un-useful-bgc':coupon.status !== 1
         }"
  >
    <div class="content-left">
      <div class="par">
        <span class="sign">￥</span>
        <span class="amount">{{coupon.amount}}</span>
        <span>优惠券</span>
      </div>
      <p class="description">{{coupon.description}}</p>
    </div>
    <div class="content-right">
      <i class="iconfont icon-checked"
         v-if="coupon.couponName === selected"></i>
      <i class="iconfont icon-has-used"
         v-if="coupon.status === 2"></i>
      <i class="iconfont icon-has-over-time"
         v-if="coupon.status === 3"></i>
      <p class="sub-coupon">副券</p>
      <p class="sub-coupon">{{dayjs(coupon.beginTime).format('YYYY-MM-DD')}}</p>
      <p class="sub-coupon">{{dayjs(coupon.endTime).format('YYYY-MM-DD')}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import dayjs from 'dayjs'

  export default {
    props: {
      coupon: {
        required: true,
        type: Object
      },
      selected: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        dayjs
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .coupon-item {
    width: 100%;
    height: 8rem;
    position: relative;
    margin: 20rem/@baseFontSize 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 8rem/@baseFontSize;
    .useful-bgc {
      cursor: pointer;
      background: linear-gradient(to bottom right, #ff6058, #ff3fb3);
      .content-right {
        &:after {
          box-shadow: 0 3px #d2288e inset;
        }
        &:before {
          box-shadow: 0 -3px #ce2f37 inset;
        }
      }
    }

    .un-useful-bgc {
      cursor: not-allowed;
      background-color: #e1e1e1;
    }

    .content-left {
      padding-left: 2rem;
      width: 55%;
      border-right: 2px dashed rgba(255, 255, 255, .3);

      .par {
        display: flex;
        align-items: baseline;

        span {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, .8);
        }

        .amount {
          font-size: 2rem;
          color: #fff;
          padding-right: 10px;
          font-weight: bold;
        }

        .sign {
          font-size: 1.4rem;
        }
      }

      .description {
        color: #fff;
        font-size: 1.5rem;
        margin-top: .5rem;
      }
    }

    .content-right {
      width: 45%;
      height: 100%;
      font-size: 1.45rem;
      color: #ffffff;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &:after, &:before {
        content: "";
        left: -15rem/@baseFontSize;
        width: 30rem/@baseFontSize;
        height: 32rem/@baseFontSize;
        position: absolute;
        z-index: 999;
        background-color: #fff;
        border-radius: 50%;
      }
      &:after {
        bottom: -15rem/@baseFontSize;
      }
      &:before {
        top: -15rem/@baseFontSize;
      }
      .sub-coupon {
        text-align: center;
      }
      .icon-has-used, .icon-has-over-time {
        position: absolute;
        right: 2rem/@baseFontSize;
        z-index: 999;
        font-size: 8rem;
      }
      .icon-checked{
        position: absolute;
        top: 2px;
        right: 2px;
        font-weight: bold;
        z-index: 999;
        &::after {
          position: absolute;
          top: -27px;
          left: -7px;
          content: "";
          z-index: -1;
          height: 0;
          -webkit-transform: rotate(135deg);
          transform: rotate(135deg);
          border-width: 25px;
          border-style: solid;
          border-color: transparent #d60000 transparent transparent;
        }
      }
    }
  }
</style>
