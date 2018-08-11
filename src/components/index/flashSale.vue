<template>
  <section class="flashSale" v-if="flashSale">
    <div class="flashSale-header">
      <div class="flashSale-logo">
        <img src="../../assets/images/timeoutBuy.png" alt="a">
      </div>
      <div class="time">
        <p class="time-col">剩</p>
        <p class="time-num">{{getTime.hour}}</p>
        <p class="time-col">:</p>
        <p class="time-num">{{getTime.min}}</p>
        <p class="time-col">:</p>
        <p class="time-num">{{getTime.seconds}}</p>
        <p class="time-col">结束</p>
      </div>
    </div>
    <div class="flashSale-list">
      <ul>
        <li v-for="k in flashSale.FlashSaleProducts" :key="k.id">
          <div>
            <router-link :to="`/productDetail/${k.ProductId}`">
              <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+k.PictureId+'/200.jpeg'" alt="">
              <p>{{k.ProductName}}</p>
              <div class="price">
                <span class="flashSale-list-price">￥{{k.PeriodMoney}}</span>
                <span class="flashSale-list-unit">/{{k.PvStandard}}</span>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  export default {
    props: ['flashSale'],
    data () {
      return {
        remainTime: 330000,
        timeOut: {
          hour: 0,
          min: 0,
          seconds: 0
        }
      }
    },
    computed: {
      getTime () {
        return this.timeOut
      }
    },
    mounted () {
      this.formateTime()
    },
    methods: {
      formateTime () {
        var nowTime = new Date().getTime()
        var endTime = moment(moment().format('YYYY-MM-DD 23:59:59')).toDate().getTime()
        var remainTime = endTime - nowTime
        setInterval(() => {
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
      }
    }
  }
</script>
import { Lazyload } from 'mint-ui'
<style lang="less" scoped>
  @import "../../assets/fz.less";

  .flashSale-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3vw;
    img {
      width: 28vw;
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
        font-size: 1.2rem;
        letter-spacing: 2px;
      }
      .time-col {
        color: #666;
        padding: 0 1vw;
        text-align: center;
        font-size: 1.3rem;
        letter-spacing: 2px;
      }
    }
  }

  .flashSale-list {
    ul {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      height: 28vh;
      li {
        margin: 2vh 2vw;
        display: flex;
        > div {
          margin: auto 2vw;
          img {
            width: 30vw;
          }
          p {
            text-align: center;
            width: 30vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 1.2rem;
          }
          .price {
            text-align: center;
            .flashSale-list-price {
              color: #b4282d;
              font-size: 1.3rem;
            }
            .flashSale-list-unit {
              padding-top: 2vh;
              color: rgb(150, 150, 150);
              font-size: 1rem;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .flashSale {
      .flashSale-header {
        padding: 0 25px;
        img {
          width: 136px;
        }
        .time {
          .time-num {
            width: 40px;
            height: 40px;
            letter-spacing: 2px;
            font-size: 1.4rem;
          }
          .time-col {
            padding: 0 4px;
            font-size: 2rem;
          }
        }
      }
      .flashSale-list {
        ul {
          height: 250px;
          li {
            /*height: 30px;*/
            margin: 8px 10px;
            > div {
              margin: auto 10px;
              img {
                width: 150px;
              }
              p {
                width: 150px;
                font-size: 1.4rem;
              }
              .flashSale-list-price {
                font-size: 1.5rem;
              }
              .flashSale-list-unit {
                padding-top: 10px;
                font-size: 1.2rem;
              }
            }
          }
        }
        ul::-webkit-scrollbar { /*滚动条整体样式*/
          width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 8px;
        }
        ul::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0 0 15px #1fc200 inset;
        }
        ul::-webkit-scrollbar-track { /*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          background: #EDEDED;
        }
      }
    }
  }
</style>
