<template>
  <div id="coupon-item">
    <div class="style-two" :style="{'background-color':coupon.backgroundColor}">
      <div class="dot-contain-top">
        <div class="dot" v-for="(item,i) in 25" :key="i" :style="{'background-color':coupon.backgroundColor}"></div>
      </div>
      <div class="dot-contain-bottom">
        <div class="dot" v-for="(item,i) in 25" :key="i" :style="{'background-color':coupon.backgroundColor}"></div>
      </div>
      <div class="info-box">
        <div class="left-ball"></div>
        <div class="right-ball"></div>
        <div class="content">
          <div class="content-left">
            <div class="par">
              <p class="sign">￥</p>
              <p class="amount">{{coupon.Amount}}</p>
              <p>优惠券</p>
            </div>
            <p class="description">{{coupon.Description}}</p>
          </div>
          <div class="content-right">
            副券
            <div>
              <p>{{coupon.BeginTime}}</p>
              <p>{{coupon.EndTime}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['coupon'],
    data () {
      return {}
    },
    components: {},
    computed: {},
    methods: {}
  }
</script>

<style lang="less" scoped>
  #coupon-item {
    width: 100%;
    .style-two {
      width: 100%;
      height: 100px;
      position: relative;
      margin: 2% 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      .dot-contain-top, .dot-contain-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        position: absolute;
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #f0c78a;
        }
      }
      .dot-contain-top {
        top: -4px;
      }
      .dot-contain-bottom {
        bottom: -4px;
      }
      .info-box {
        width: 100%;
        height: 100%;
        position: relative;
        .content {
          display: flex;
          align-items: center;
          height: 100%;
          .content-left {
            padding-left: 8%;
            width: 70%;
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
            text-align: center;
            padding: 15px 20px;
            width: 30%;
            vertical-align: text-bottom;
            font-family: "Microsoft Himalaya";
            font-size: 1.45rem;
            color: rgb(255, 255, 255);
            p {
              font-size: 1.2rem;
            }
          }
        }
        .left-ball, .right-ball {
          &:after, &:before {
            content: "";
            width: 20px;
            height: 20px;
            position: absolute;
            background-color: #fff;
            border-radius: 50%;
          }
          &:before {
            top: 15%;
          }
          &:after {
            bottom: 15%;
          }
        }
        .left-ball {
          &:after, &:before {
            left: -3%;
          }
        }
        .right-ball {
          &:after, &:before {
            right: -3%;
          }
        }
      }
    }
  }
  @media screen and (min-width: 400px) {
    #coupon-item {
      .style-two {
        height: 130px;
        .dot-contain-top, .dot-contain-bottom {
          .dot {
            width: 20px;
            height: 20px;
          }
        }
        .dot-contain-top {
          top: -8px;
        }
        .dot-contain-bottom {
          bottom: -8px;
        }
        .info-box {
          .content {
            .content-left {
              .par {
                p {
                  font-size: 1.5rem;
                }
                .amount {
                  font-size: 2rem;
                }
                .sign {
                  font-size: 1.6rem;
                }
              }
              .description {
                font-size: 1.4rem;
              }
            }
            .content-right {
              font-size: 1.65rem;
              p {
                font-size: 1.4rem;
              }
            }
          }
          .left-ball, .right-ball {
            &:after, &:before {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
</style>
