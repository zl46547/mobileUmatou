<template>
  <div id="flashSale">
    <div class="flashSale-header">
      <div class="flashSale-logo">
        <img src="../../../assets/images/timeoutBuy.png" alt="a">
      </div>
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
      <div class="scroll-div" scroll-x="true">
        <div class="scroll-div-item" v-for="k in flashSaleData.FlashSaleProducts" :key="k.id" @click="goToDetail(k)">
          <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+k.PictureId+'/200.jpeg'"/>
          <div class="product-name">{{k.ProductName}}</div>
          <div class="price">
            <span class="flashSale-list-price">￥{{k.PeriodMoney}}</span>
            <span class="flashSale-list-unit">/{{k.PvStandard}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  export default {
    data () {
      return {
        flashSaleData: '',
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
    mounted () {
      var vm = this
      vm.formateTime()
      vm.getFlashSaleData()
    },
    beforeDestroy() {
      var vm = this
      clearInterval(vm.setIntervalFunction)
    },
    methods: {
      /**
       * 获取显示抢购数据
       */
      getFlashSaleData() {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/index/command/flashSale.json'
        }).then((res) => {
          vm.flashSaleData = res.data.Data
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 时间格式化
       */
      formateTime () {
        var vm = this
        var nowTime = new Date().getTime()
        var endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).toDate().getTime()
        var remainTime = endTime - nowTime
        vm.setIntervalFunction = setInterval(() => {
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
      goToDetail(val) {
        var vm = this
        vm.$router.push({path: '/detail', query: {productId: val.ProductId}})
      }
    }
  }
</script>

<style lang="less" scoped>
  #flashSale {
    background-color: #fff;
    .flashSale-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 3vw;
      img {
        width: 98px;
        height: 48px;
      }
      .time {
        display: flex;
        align-items: center;
        .time-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 7vw;
          height: 7vw;
          border: 1px solid #aaa;
          color: #666;
          border-radius: 3px;
          font-size: 0.25rem;
          letter-spacing: 2px;
        }
        .time-col {
          color: #666;
          padding: 0 1vw;
          text-align: center;
          font-size: 0.3rem;
          letter-spacing: 2px;
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
          margin: 5px 6px;
          img {
            width: 100px;
          }
          .product-name {
            text-align: center;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.3rem;
          }
          .price {
            text-align: center;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .flashSale-list-price {
              color: #b4282d;
              font-size: 0.28rem;
            }
            .flashSale-list-unit {
              padding-top: 2vh;
              color: rgb(150, 150, 150);
              font-size: 0.22rem;
            }
          }
        }
      }
    }
  }
</style>
