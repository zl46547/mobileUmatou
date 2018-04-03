<template>
  <section class="section2" v-if="section2">
    <div class="section2-header">
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
    <div class="section2-list">
      <ul>
        <li v-for="k in section2.list" :key="k.id">
          <router-link :to="{name:'详情页'}">
            <img v-lazy="k.imgPath" alt="">
          </router-link>
          <h2 class="section2-list-title ac">
            {{k.title}}
          </h2>
          <div>
            ￥<span class="section2-list-price">{{k.price}}</span>
            <span class="section2-list-unit">/{{k.unit}}</span>
          </div>
        </li>
      </ul>
    </div>
    <router-link class="section2-banner" :to="{name:'详情页'}" v-for="j in section2.bannerList" :key="j.id">
      <img v-lazy="j.banner" alt="">
    </router-link>
  </section>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ['section2'],
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
        setInterval(() => {
          this.remainTime -= 1000
          if (this.remainTime < 0) {
            this.remainTime = 0
          }
          let sy = parseInt(this.remainTime / 1000)
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

  .section2-header {
    .pt();
    ul {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;;
      display: flex;
      -webkit-justify-content: space-around;
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

  .section2-list {
    overflow-x: auto;
    width: 100%;
    /*原生滑动*/
    -webkit-overflow-scrolling: touch;
    > ul {
      .bt();
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding: 0 6vw 6vw 6vw;
      /*width: 380%;*/
      li {
        margin-right: 10vw;
        width: 30vw;
        a, img {
          display: block;
          width: 100px;
        }

        h2, p {
          overflow: hidden;
          white-space: nowrap;
          /* text-overflow
             clip： 当内联内容溢出块容器时，将溢出部分裁切掉。
             ellipsis： 当内联内容溢出块容器时，将溢出部分替换为（...）。
           */
          text-overflow: ellipsis;
        }
        h2 {
          .fz(font-size, 32);
          padding-top: 3vw;
          color: #333;
        }

        span.section2-list-unit {
          padding-top: 2vw;
          .fz(font-size, 26);
          color: rgb(150, 150, 150);
        }

        span.section2-list-price {
          color: #b4282d;
        }
      }
    }
  }

  .section2-banner {
    display: block;
    width: 100vw;
    img {
      display: block;
      height: 38vw;
      width: 100%;
    }
  }
</style>
