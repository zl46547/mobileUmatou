<template>
  <div class="payWay">
    <div class="payAmmount">
      <div class="remainTime">
        <span>剩余支付时间</span>
        <span>{{remainTime}}</span>
      </div>
      <div class="ammount">
        <p>¥</p>
        <p>{{payAmmount}}</p>
      </div>
      <div class="orderNo">
        <p>码头订单号：{{orderNo}}</p>
      </div>
    </div>
    <!-- 选择支付方式 -->
    <div class="payWaySel">
      <div v-for="item in paywayList" :key="item.name">
        <div class="payWayName">
          <i class="icon iconfont" :class="item.icon" :style="{'color':item.color}"></i>
          <span>{{item.name}}</span>
        </div>
        <div class="checkbox" @click="onChecked(item.name)">
          <i class="icon iconfont icon-round" v-if="item.name !== checkedItem"></i>
          <i class="icon iconfont icon-roundcheck" v-if="item.name === checkedItem"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        remainTime: '', // 剩余时间
        orderNo: '', // 订单号
        payAmmount: 0,
        checkedItem: '码头支付',
        paywayList: [
          {
            icon: 'icon-zhifu',
            name: '码头支付',
            color: '#ecbc01'
          },
          {
            icon: 'icon-weixinzhifu',
            name: '微信支付',
            color: '#27c100'
          },
          {
            icon: 'icon-zhifubao',
            name: '支付宝支付',
            color: '#1157ff'
          }
        ]
      }
    },
    computed: {},
    mounted () {
      this.getRemainTime()
      this.init()
    },
    methods: {
      init () {
        var params = this.$route.params
        this.payAmmount = params.finalPrice
        this.orderNo = params.orderNo
      },
      /**
       * 获取剩余支付时间
       */
      getRemainTime () {
        var params = this.$route.params
        var nowTime = new Date().getTime()
        var endTime = new Date(params.deadTime).getTime()
        var remainTime = endTime - nowTime
        setInterval(() => {
          remainTime -= 1000
          if (remainTime < 0) {
            remainTime = 0
          }
          let sy = parseInt(remainTime / 1000)
          let minute = parseInt(sy % 3600 / 60)
          let second = parseInt(sy % 60)
          if (minute < 10) {
            minute = '0' + minute
          }
          if (second < 10) {
            second = '0' + second
          }
          this.remainTime = `${minute}:${second}`
        }, 1000)
      },
      onChecked (val) {
        this.checkedItem = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .payWay {
    .payAmmount {
      padding: 3vh 1vw;
      background-color: #fff;
      margin: auto;
      width: 100vw;
      .remainTime {
        font-size: 5vw;
        color: #bebebe;
        margin: auto;
        text-align: center
      }
      .ammount {
        display: flex;
        align-items: baseline;
        justify-content: center;
        padding: 1vh;
        p:nth-of-type(1) {
          font-size: 6vw;
        }
        p:nth-of-type(2) {
          font-size: 9vw;
        }
      }
      .orderNo {
        font-size: 1vw;
        color: #c8c8c8;
        text-align: center;
      }
    }
    .payWaySel {
      width: 100vw;
      margin-top: 3vh;
      > div {
        background-color: #fff;
        margin-bottom: 2px;
        padding: 3vh 4vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .payWayName {
          i {
            font-size: 8vw;
            padding-right: 3vw;
          }
          span {
            font-size: 6vw;
          }
        }
        .checkbox {
          cursor: pointer;
          vertical-align: middle;
          padding-right: 2vw;
          font-weight: bold;
          .iconfont {
            font-size: 7vw;
          }
          .icon-roundcheck {
            color: #ff2b1c;
          }
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .payWay {
      .payAmmount {
        padding: 20px 8px;
        width: 768px;
        .remainTime {
          font-size: 22px;
        }
        .ammount {
          padding: 8px;
          p:nth-of-type(1) {
            font-size: 32px;
          }
          p:nth-of-type(2) {
            font-size: 45px;
          }
        }
        .orderNo {
          font-size: 12px;
        }
      }
      .payWaySel {
        width: 768px;
        margin-top: 18px;
        > div {
          padding: 22px 24px;
          .payWayName {
            i {
              font-size: 40px;
              padding-right: 18px;
            }
            span {
              font-size: 34px;
            }
          }
          .checkbox {
            padding-right: 15px;
            .iconfont {
              font-size: 35px;
            }
          }
        }
      }
    }
  }
</style>
