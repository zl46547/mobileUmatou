<template>
  <div class="order-info" v-if="orderDetail">
    <div class="remain-time">
      <span>剩余支付时间</span>
      <span>{{remainTime}}</span>
    </div>
    <div class="amount">
      <p>¥</p>
      <p>{{orderDetail.payment}}</p>
    </div>
    <div class="order-no">
      <p>订单号：{{orderDetail.orderNo}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import dayjs from 'dayjs'
  import {REMAIN_TIME} from '../../../vuex/types'
  import { getOrderDetail } from '../service'

  export default {
    data () {
      return {
        timeInterval: null,
        orderDetail: null,
        remainTime: '00:00' // 剩余时间
      }
    },
    created () {
      let {orderNo} = this.$route.query
      this.init(orderNo)
    },
    beforeDestroy () {
      clearInterval(this.timeInterval)
      this.timeInterval = null
    },
    methods: {
      /**
       * 初始化数据
       * @param orderNo
       */
      init (orderNo) {
        getOrderDetail({orderNo}).then(res => {
          this.orderDetail = res
          this.getRemainTime()
          this.timeInterval = setInterval(() => {
            this.getRemainTime()
          }, 1000)
        })
      },
      /**
       * 获取剩余支付时间
       */
      getRemainTime () {
        if (this.orderDetail) {
          let remainTime = dayjs(this.orderDetail.orderTimeOut).diff(dayjs())
          if (remainTime <= 0) {
            remainTime = 0
          }
          this.$store.commit(REMAIN_TIME, remainTime)
          let sy = parseInt(remainTime / 1000)
          let minute = parseInt(sy % 3600 / 60).toString().padStart(2, '0')
          let second = parseInt(sy % 60).toString().padStart(2, '0')
          this.remainTime = `${minute}:${second}`
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  .order-info {
    padding: 20rem/@baseFontSize 10rem/@baseFontSize;
    background-color: #fff;
    margin: auto;
    width: 100%;

    .remain-time {
      font-size: 30rem/@baseFontSize;
      color: #bebebe;
      margin: auto;
      text-align: center
    }

    .amount {
      display: flex;
      align-items: baseline;
      justify-content: center;
      padding: 20rem/@baseFontSize;
      p:nth-of-type(1) {
        font-size: 20rem/@baseFontSize;
      }
      p:nth-of-type(2) {
        font-size: 32rem/@baseFontSize;
      }
    }

    .order-no {
      font-size: 30rem/@baseFontSize;
      color: #c8c8c8;
      text-align: center;
    }
  }
</style>
