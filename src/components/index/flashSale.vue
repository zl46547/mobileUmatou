<template>
  <section class="flashSale" v-if="flashSale">
    <div class="flashSale-header">
      <ul>
        <li>
          <img src="../../assets/images/timeoutBuy.png" alt="a">
        </li>
        <li></li>
        <li>
          <div class="time">
            剩
            <span class="time-num">{{getTime.hour}}</span>
            <span class="time-col">:</span>
            <span class="time-num">{{getTime.min}}</span>
            <span class="time-col">:</span>
            <span class="time-num">{{getTime.seconds}}</span>
            结束
          </div>
        </li>
      </ul>
    </div>
    <div class="flashSale-list">
      <ul>
        <li v-for="k in flashSale.FlashSaleProducts" :key="k.id">
          <div>
            <router-link :to="{name:'详情页'}">
              <img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/'+k.PictureId+'/160.jpeg'" alt="">
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
        var endTime = new Date(this.flashSale.EndTime.replace('T', ' ')).getTime()
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
  @import "../../assets/index/style.css";

  .flashSale-header {
    ul {
      display: flex;
      justify-content: space-around;
      img {
        width: 28vw;
      }
      .time {
        position: relative;
        top: 28%;
        .time-num {
          display: inline-block;
          text-align: center;
          padding: 0.6vw;
          border: 1px solid #aaa;
          color: #666;
          border-radius: 0.5vw;
          .fz(font-size, 26);
          letter-spacing: 0.3vw;
        }
        .time-col {
          color: #333;
          width: 2vw;
          display: inline-block;
          text-align: center;
          font-weight: 700;
          .fz(font-size, 20);
        }
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
            white-space: nowrap
          }
          .price{
            text-align: center;
            .flashSale-list-price {
              color: #b4282d;
            }
            .flashSale-list-unit {
              padding-top: 2vh;
              color: rgb(150, 150, 150);
              font-size: 1vw;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .flashSale {
      .flashSale-header {
        img {
          width: 136px;
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
              }
              .flashSale-list-unit {
                padding-top: 10px;
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
