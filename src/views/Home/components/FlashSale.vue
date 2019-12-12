<template>
  <div id="flashSale">
    <div class="flashSale-header">
      <img src="../../../assets/images/timeoutBuy.png" alt="限时抢购">
      <div class="time">
        <div class="time-col">剩</div>
        <div class="time-num">{{getTime.hour}}</div>
        <div class="time-col">:</div>
        <div class="time-num">{{getTime.min}}</div>
        <div class="time-col">:</div>
        <div class="time-num">{{getTime.seconds}}</div>
        <div class="time-col">结束</div>
      </div>
    </div>
    <div class="flashSale-list">
      <div class="scroll-div" v-if="flashSaleData">
        <div class="scroll-div-item"
             v-for="item in flashSaleData.FlashSaleProducts"
             :key="item.id"
             @click="goToDetail(item)"
        >
          <img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/'+item.PictureId+'/200.jpeg'"/>
          <div class="product-name">{{item.ProductName}}</div>
          <div class="price">
            <span class="flashSale-list-price">￥{{item.PeriodMoney}}</span>
            <span class="flashSale-list-unit">/{{getUnit(item)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import dayjs from 'dayjs'
  import { getFlashSale } from '../service'
  import {SCROLL_TOP} from '../../../vuex/types'

  export default {
    data () {
      return {
        flashSaleData: null,
        remainTime: 330000,
        timeOut: {
          hour: 0,
          min: 0,
          seconds: 0
        },
        setIntervalFunction: ''
      }
    },
    computed: {
      getTime () {
        return this.timeOut
      }
    },
    created () {
      this.formateTime()
      this.getFlashSaleData()
    },
    beforeDestroy () {
      clearInterval(this.setIntervalFunction)
    },
    methods: {
      getUnit (item) {
        if (item.Standard) {
          return item.Unit
        }
        return `500${item.Unit}`
      },
      /**
       * 获取限时抢购数据
       */
      getFlashSaleData () {
        getFlashSale().then((res) => {
          this.flashSaleData = res
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 时间格式化
       */
      formateTime () {
        var nowTime = new Date().getTime()
        var endTime = dayjs(dayjs().format('YYYY-MM-DD 23:59:59')).toDate().getTime()
        var remainTime = endTime - nowTime
        this.setIntervalFunction = setInterval(() => {
          remainTime -= 1000
          if (remainTime < 0) {
            remainTime = 0
          }
          let sy = parseInt(remainTime / 1000)
          let hour = parseInt(sy / 3600)
          let minute = parseInt(sy % 3600 / 60)
          let second = parseInt(sy % 60)
          hour < 10 ? this.timeOut.hour = '0' + hour : this.timeOut.hour = hour
          minute < 10 ? this.timeOut.min = '0' + minute : this.timeOut.min = minute
          second < 10 ? this.timeOut.seconds = '0' + second : this.timeOut.seconds = second
        }, 1000)
      },
      /**
       * 跳转商品详情页面
       * @param val
       */
      goToDetail (val) {
        this.$store.commit(SCROLL_TOP, this.$parent.$refs.content.scrollTop)
        this.$router.push({name: '商品详情', params: {productId: val.ProductId}})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #flashSale {
    background-color: #fff;
    .flashSale-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 3%;
      img {
        display: block;
        width: 128rem/@baseFontSize;
      }
      .time {
        display: flex;
        align-items: center;
        .time-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34rem/@baseFontSize;
          height: 34rem/@baseFontSize;
          border: 1px solid #aaa;
          color: #666;
          border-radius: 5rem/@baseFontSize;
          font-size: 18rem/@baseFontSize;
          letter-spacing: 2rem/@baseFontSize;
        }
        .time-col {
          color: #666;
          padding: 0 10rem/@baseFontSize;
          text-align: center;
          font-size: 18rem/@baseFontSize;
          letter-spacing: 2rem/@baseFontSize;
        }
      }
    }

    .flashSale-list {
      .scroll-div {
        white-space: nowrap;
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        .scroll-div-item {
          display: inline-block;
          margin: 25rem/@baseFontSize 26rem/@baseFontSize;
          cursor: pointer;
          width: 180rem/@baseFontSize;
          img {
            width: 180rem/@baseFontSize;
            height: 180rem/@baseFontSize;
            display: block;
            margin-bottom: 10rem/@baseFontSize;
          }
          .product-name {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 30rem/@baseFontSize;
          }
          .price {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 5rem/@baseFontSize;
            .flashSale-list-price {
              color: @priceColor;
              font-size: 30rem/@baseFontSize;
            }
            .flashSale-list-unit {
              color: rgb(150, 150, 150);
              font-size: 24rem/@baseFontSize;
            }
          }
        }
      }
    }
  }
</style>
