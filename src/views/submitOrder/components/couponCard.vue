<template>
  <div id="coupon-item">
    <div class="style-two"
         :class="{'useful-bgc':coupon.status === 1,'unuseful-bgc':coupon.status !== 1}">
      <div class="info-box">
          <div class="content-left">
            <div class="par">
              <p class="sign">￥</p>
              <p class="amount">{{coupon.amount}}</p>
              <p>优惠券</p>
            </div>
            <p class="description">{{coupon.description}}</p>
          </div>
          <div class="content-right">
            <i class="iconfont icon-checked"
               v-if="coupon.couponName === selected"
            />
            <p class="sub-coupon">副券</p>
            <p class="sub-coupon">{{moment(coupon.beginTime).format('YYYY-MM-DD')}}</p>
            <p class="sub-coupon">{{moment(coupon.endTime).format('YYYY-MM-DD')}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'

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
    data() {
      return {
        moment
      }
    }
  }
</script>

<style lang="less" scoped>
  #coupon-item {
    width: 100%;

    .useful-bgc {
      background-color: #ff4c0a;
      .content-right{
        &:after{
          box-shadow: 0 3px #ce2f37 inset;
        }
        &:before{
          box-shadow: 0 -3px #ce2f37 inset;
        }
      }
    }

    .unuseful-bgc {
      background-color: #e1e1e1;
    }

    .style-two {
      width: 100%;
      height: 100px;
      position: relative;
      margin: 2% 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 5px;
      .info-box {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        .content-left {
          padding-left: 8%;
          width: 65%;
          border-right: 2px dashed rgba(255, 255, 255, .3);

          .par {
            display: flex;
            align-items: baseline;

            p {
              font-size: 1.3rem;
              color: rgba(255, 255, 255, .8);
            }

            .amount {
              font-size: 1.8rem;
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
            font-size: 1.2rem;
            margin-top: 1vh;
          }
        }

        .content-right {
          width: 35%;
          height: 100%;
          font-size: 1.45rem;
          color: #ffffff;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          &:after,&:before {
            content: "";
            left: -10px;
            width: 20px;
            height: 20px;
            position: absolute;
            z-index: 999;
            background-color: #fff;
            border-radius: 50%;
          }
          &:after{
            bottom:-10px;
          }
          &:before{
            top: -10px;
          }
          .sub-coupon{
            text-align: center;
          }
          .icon-checked{
            position: absolute;
            top: 2px;
            right: 2px;
            /*color: #fff;*/
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
              border-color: transparent #c30000 transparent transparent;
            }
          }
          p {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
</style>
