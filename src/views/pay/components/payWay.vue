<template>
  <div id="payWay">
    <div class="payAmmount">
      <div class="remainTime">
        <span v-if="remainTime">剩余支付时间</span>
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
          <span class="icon iconfont" :class="item.icon" :style="{'color':item.color}"></span>
          <span>{{item.name}}</span>
        </div>
        <div class="checkbox" @click="onChecked(item.name)">
          <span class="iconfont icon-uncheck" v-if="item.name !== checkedItem"></span>
          <span class="iconfont icon-checked" v-if="item.name === checkedItem"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'

  export default {
    data() {
      return {
        timeInterval: null,
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
            icon: 'icon-zhifubaozhifu',
            name: '支付宝支付',
            color: '#1157ff'
          }
        ]
      }
    },
    props: {
      orderDetail: {
        required: true
      }
    },
    mounted() {
      this.getRemainTime()
    },
    beforeDestroy() {
      clearInterval(this.timeInterval)
      this.timeInterval = null
    },
    methods: {
      /**
       * 获取剩余支付时间
       */
      getRemainTime() {
        this.timeInterval = setInterval(() => {
          if (this.orderDetail) {
            let remainTime = moment(this.orderDetail.orderTimeOut).diff(moment())
            if (remainTime <= 0) {
              remainTime = 0
            }
            let sy = parseInt(remainTime / 1000)
            let minute = parseInt(sy % 3600 / 60).toString().padStart(2, '0')
            let second = parseInt(sy % 60).toString().padStart(2, '0')
            this.remainTime = `${minute}:${second}`
          }
        }, 1000)

        // var endTime = new Date(params.deadTime).getTime()
        // var remainTime = parseInt(endTime) - parseInt(nowTime)
        // this.$emit('remain-time', remainTime)
        // this.timeInterval = setInterval(() => {
        //   remainTime -= 1000
        //   if (remainTime < 0) {
        //     remainTime = 0
        //   }

        //   this.$emit('remain-time', remainTime)
        // }, 1000)
      },
      onChecked(val) {
        this.checkedItem = val
      }
    }
  }
</script>

<style lang="less" scoped>
  #payWay {
    .payAmmount {
      padding: 20px 10px;
      background-color: #fff;
      margin: auto;
      width: 100%;

      .remainTime {
        font-size: 1.4rem;
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
          font-size: 1.5rem;
        }

        p:nth-of-type(2) {
          font-size: 2rem;
        }
      }

      .orderNo {
        font-size: 1.3rem;
        color: #c8c8c8;
        text-align: center;
      }
    }

    .payWaySel {
      width: 100%;
      margin-top: 3vh;

      > div {
        background-color: #fff;
        margin-bottom: 2px;
        padding: 20px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .payWayName {
          display: flex;
          align-items: center;

          .iconfont {
            font-size: 1.5rem;
            padding-right: 20px;
          }

          span {
            font-size: 1.3rem;
          }
        }

        .checkbox {
          cursor: pointer;
          vertical-align: middle;
          padding-right: 10px;

          .icon-uncheck {
            font-size: 1.5rem;
            color: #b1b1b1;
          }

          .icon-checked {
            font-size: 1.5rem;
            color: #00d300;
          }
        }
      }
    }

    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTYWKr9MAAApwAAAAHEdERUYAKQAOAAAKUAAAAB5PUy8yPIRJAgAAAVgAAABWY21hcM5LzzUAAAHIAAABWmdhc3D//wADAAAKSAAAAAhnbHlmwpPZsQAAAzgAAAQkaGVhZBMFzLYAAADcAAAANmhoZWEHzAOFAAABFAAAACRobXR4DKwAXAAAAbAAAAAYbG9jYQQ6ApQAAAMkAAAAEm1heHABGACcAAABOAAAACBuYW1lKeYRVQAAB1wAAAKIcG9zdHxdexwAAAnkAAAAYgABAAAAAQAAZFVTsF8PPPUACwQAAAAAANfzRGUAAAAA1/NEZQAS/4AD7gNvAAAACAACAAAAAAAAAAEAAAOA/4AAXAQAAAAAAAPuAAEAAAAAAAAAAAAAAAAAAAAEAAEAAAAIAJAABgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5hbnEAOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAAAAAAEAAAABAAAKgBWACAAVgASAAAAAwAAAAMAAAAcAAEAAAAAAFQAAwABAAAAHAAEADgAAAAKAAgAAgAC5hbmJuYq5xD//wAA5hbmJuYq5w///xntGd4Z2xj3AAEAAAAAAAAAAAAAAAABBgAAAQAAAAAAAAABAgAAAAIAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0gEMAVYBiAISAAAABgAq/4AD1ANvADoATgBkAHYAhwCPAAAlBiMiJicuAT0BFhceATMyNzY3BiMiJicuAT0BFhceATI2NzY3FTYXES4DIg4CBxEeAzMyNyYBPgEyFhceARQGBw4BIiYnLgE0NgcWFx4BMjY3NjcVFAYHDgEiJicuATUFLgEiBgcGFBceATMxMjY3NjQDDgEiLgI0PgIyHgIUBi8BBxc3FzcnAa0REUBzLSgsLE0rXzEaGgkNJCZAcy0oLCxNK19jXypOLBYXATZlf41/ZTYBATZlf0YTEwP+/S1zgXMtKCwsKC1zgXMtKCwsLCxNK19jXypOLCwoLXOBcy0oLAMxJV9qXyVNTSVfNTVfJUxnIFFaUT8iIj9RWlE/IiLmRyJbAQu9HoABFhUSLRZCJhgNDQIYFgQWFRMtFkInGAwODgwYJzEBAgEdI0AwGRkwQCP+PCQ/MBoBFgKvFRYWFRMsLC0TFBYWFBMtLCyXJhgNDQ0NGCZCFiwTFRYWFRMsFu0lJyclUdFQJicnJlDR/vkfISE/UFlQPyEhP1BZUDxLI2ABDcEkAAAAAgBW/9YDqwMrABoAIAAAAQ4BBy4BJz4BNzIXNyYOAxQeAjI+AjclBxcBJwEDVQPBkZHBAwPBkTEtQ02qm3lAQHmbrJt5QAH9pjzAAas8/pEBgJHBAwPBkZHBAw1DIAFAeZusm3lAQHmbVlI9wAGrPf6RAAACACD/xQPgAzwAKQAqAAABBiY3JyYWHwEWFxY2NyUuAScGBAceARcHBhY3PgE3FjM2JDcmJwUGBzkBAY4qGQFIESUEGhkbGiwCAdZCy3vM/vEFAWFUFAICGBNFHFNfzAEOBgEy/sm3MQEQEyEEqDYNBhMSEA4GAthSXwEE7bFlqTpyAxgJCSwSHQTssmVVum0dAAAAAgBW/9YDqgMrAAsAHAAAJS4BJz4BNx4BFw4BAw4DFB4CMj4CNC4CAgCRwQMDwZGRwQMDwZFWm3lAQHmbrJt5QEB5mysDwZGRwQMDwZGRwQL9AUB5m6ybeUBAeZusm3lAAAAAAAIAEv+SA+4DbgASAF4AACUGJicxJjYXHgEXFhcHDgEHDgElLgEnPgE3Njc5ASM1MzUjNSMiDgEdASMVMxUjFSEOAwcvAS4DDgIVFB4COwEyNz4CNzY/AR4BFw4BByYAJzYANxYAFwYBMhFYBAE8US1QDBMUBQQ2GRc7AmuCwAUgJgkMBaHLyzYNEw7Gxo4BLAEKEhsVEj4XNDk9PjMgHTJDJgsCAg4tOyMYJChunkNF04DS/ukFBQEX0tIBFwUBoQIgPRdCBQYjBgoLBQQvEA4WFRhLBChNHSMfTSFQBAgGPiFNIgUcKTEaBxoKEAwDEiMyHiQ1IxMBAQUSFA8cHzE9D2NzAQUBF9LSARcFBf7p0m0AAAAAEgDeAAEAAAAAAAAAFQAsAAEAAAAAAAEACABUAAEAAAAAAAIABwBtAAEAAAAAAAMACACHAAEAAAAAAAQACACiAAEAAAAAAAUACwDDAAEAAAAAAAYACADhAAEAAAAAAAoAKwFCAAEAAAAAAAsAEwGWAAMAAQQJAAAAKgAAAAMAAQQJAAEAEABCAAMAAQQJAAIADgBdAAMAAQQJAAMAEAB1AAMAAQQJAAQAEACQAAMAAQQJAAUAFgCrAAMAAQQJAAYAEADPAAMAAQQJAAoAVgDqAAMAAQQJAAsAJgFuAAoAQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdAAKAAAKQ3JlYXRlZCBieSBpY29uZm9udAoAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAVmVyc2lvbiAxLjAAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AAEdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC4AAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAGh0dHA6Ly9mb250ZWxsby5jb20AAAIAAAAAAAAACgAAAAAAAQAAAAAAAAAAAAAAAAAAAAAACAAAAAEAAgECAQMBBAEFAQYFemhpZnUHY2hlY2tlZAt3ZWl4aW56aGlmdQd1bmNoZWNrDXpoaWZ1YmFvemhpZnUAAAAAAAH//wACAAEAAAAMAAAAFgAAAAIAAQADAAcAAQAEAAAAAgAAAAAAAAABAAAAANWkJwgAAAAA1/NEZQAAAADX80Rl) format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    .iconfont {
      font-family: "iconfont";
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-weixinzhifu:before {
      content: "\e62a";
    }

    .icon-zhifu:before {
      content: "\e616";
    }

    .icon-uncheck:before {
      content: "\e70f";
    }

    .icon-checked:before {
      content: "\e626";
    }

    .icon-zhifubaozhifu:before {
      content: "\e710";
    }
  }

  @media screen and (min-width: 400px) {
    #payWay {
      .payAmmount {
        .remainTime {
          font-size: 1.6rem;
        }

        .ammount {
          p:nth-of-type(1) {
            font-size: 1.7rem;
          }

          p:nth-of-type(2) {
            font-size: 2.4rem;
          }
        }

        .orderNo {
          font-size: 1.5rem;
        }
      }

      .payWaySel {
        > div {
          .payWayName {
            .iconfont {
              font-size: 1.7rem;
            }

            span {
              font-size: 1.5rem;
            }
          }

          .checkbox {
            .icon-uncheck {
              font-size: 1.7rem;
            }

            .icon-checked {
              font-size: 1.7rem;
            }
          }
        }
      }
    }
  }
</style>
