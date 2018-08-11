<template>
  <div class="coupon-item">
    <div class="style-two" :style="{'background-color':coupon.backgroundColor[0]}">
      <div class="dot-contain-top">
        <div class="dot" v-for="(item,i) in 25" :key="i" :style="{'background-color':coupon.backgroundColor[0]}"></div>
      </div>
      <div class="dot-contain-bottom">
        <div class="dot" v-for="(item,i) in 25" :key="i" :style="{'background-color':coupon.backgroundColor[0]}"></div>
      </div>
      <div class="info-box">
        <p class="ticket-title">优鲜码头优惠</p>
        <div class="coupon-money">
          <div class="lay account" :style="{'color':coupon.backgroundColor[1]}">￥<span>{{coupon.Amount}}</span></div>
          <div class="lay">
            <p class="demand">{{coupon.Description}}</p>
          </div>
        </div>
        <p class="data">{{coupon.BeginTime}}~{{coupon.EndTime}}</p>
      </div>
      <a href="javascript:;" class="get-btn">
        <span>立即 <br>使用</span>
      </a>
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
  .coupon-item {
    .style-two{
      width: 100%;
      height: 25vw;
      position: relative;
      margin: 5% 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      .dot-contain-top,.dot-contain-bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:100%;
        position: absolute;
        .dot{
          width:3vw;
          height:3vw;
          border-radius: 50%;
        }
      }
      .dot-contain-top{
        top: -1.5vw;
      }
      .dot-contain-bottom{
        bottom: -1.5vw;
      }
      .info-box{
        flex: 1;
        padding: 2% 1% 2% 10%;
        &:after,&:before{
          content: "";
          width: 6vw;
          height: 6vw;
          position: absolute;
          background-color: #fff;
          border-radius: 50%;
          left: -3vw;
        }
        &:before{
          top: 15%;
        }
        &:after{
          bottom: 15%;
        }
        .data{
          font-size: 1.1rem;
          white-space: nowrap;
          word-break: break-all;
        }
      }
      .ticket-title {
        font-size: 1.1rem;
        color: #fff;
      }
      .coupon-money {
        width: 100%;
        display: flex;
        font-size: 2rem;
        align-items: center;
        .account {
          span{
            font-size: 3.8rem;
          }
        }
        .lay{
          font-size:1.1rem;
          line-height: 1;
          .demand{
            margin-left: 10px;
          }
        }
      }
      .get-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40%;
        height: 100%;
        text-align: center;
        color: #fff;
        font-size: 1.5rem;
        position: relative;
        &:after,&:before {
          content: "";
          width: 6vw;
          height: 6vw;
          position: absolute;
          background-color: #fff;
          border-radius: 50%;
          right: -3vw;
        }
        &:before {
          top: 15%;
        }
        &:after{
          bottom: 15%;
        }
        span{
          width: 4rem;
          font-size: 1.8rem;
          word-break: keep-all;
        }
      }
    }
  }

  @media screen and (min-width: 500px) {
    .coupon-item {
      .style-two{
        .info-box{
          .data{
            font-size: 1.5rem;
          }
        }
        .ticket-title {
          font-size: 1.5rem;
          color: #fff;
        }
        .coupon-money {
          font-size: 2.4rem;
          .account {
            span{
              font-size: 4.3rem;
            }
          }
          .lay{
            font-size:1.5rem;
          }
        }
        .get-btn{
          font-size: 1.9rem;
          span{
            font-size: 2.2rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 640px) {
    .coupon-item {
      .style-two{
        width: 100%;
        height: 150px;
        .dot-contain-top,.dot-contain-bottom{
          .dot{
            width:26px;
            height:26px;
          }
        }
        .dot-contain-top{
          top: -13px;
        }
        .dot-contain-bottom{
          bottom: -13px;
        }
        .info-box{
          &:after,&:before{
            content: "";
            width: 40px;
            height: 40px;
            left: -20px;
          }
          .data{
            font-size: 1.8rem;
            white-space: nowrap;
            word-break: break-all;
          }
        }
        .ticket-title {
          font-size: 1.8rem;
        }
        .coupon-money {
          font-size: 2.7rem;
          .account {
            span{
              font-size: 5.2rem;
            }
          }
          .lay{
            font-size:1.8rem;
          }
        }
        .get-btn{
          font-size: 2.2rem;
          &:after,&:before {
            content: "";
            width: 40px;
            height: 40px;
            right: -20px;
          }
          span{
            font-size: 2.5rem;
          }
        }
      }
    }
  }
</style>
