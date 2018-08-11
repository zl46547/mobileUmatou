<template>
  <div>
    <div class="content">
      <div class="section-one">
        <img v-if="hour>17 || (hour>=0 && hour<6)" src="../assets/images/user_bg_night.png"/>
        <img src="../assets/images/user_bg_day.png" v-else/>
        <div class="user-info">
          <div class="img-face">
            <img src="../assets/images/face.png"/>
          </div>
          <p>15606130737</p>
          <div class="vip">
            <img src="../assets/images/vip.png"/>
            <span>初入码头</span>
          </div>
        </div>
      </div>
      <div class="section-two">
        <div class="orderService" style="position: relative" v-for="item in orderServiceList" :key="item.name"
             @click="toMyOrders(item.name)">
          <i class="iconfont" :class="item.icon"></i>
          <p>{{item.name}}</p>
          <div class="bage" v-if="item.num>0">{{item.num}}</div>
        </div>
      </div>
      <div class="section-three">
        <div class="myAccount" v-for="item in myAccountList" :key="item.id">
          <p>{{item.value}}</p>
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="section-four">
        <div class="function" v-for="item in functionList" :key="item.id" @click="showFunction()">
          <i class="iconfont" :class="item.icon" :style="{'color':item.color}"></i>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/common/_header.vue'
  import Footer from '@/common/_footer.vue'

  export default {
    components: {
      'VHeader': Header,
      'VFooter': Footer
    },
    mounted () {
      var vm = this
      // 模拟请求数据
      vm.$store.commit('SET_LOADING', true)
      setTimeout(function () {
        vm.$store.commit('SET_LOADING', false)
      }, 500)
      // 获取小时
      vm.hour = new Date().getHours()
      vm.getOrderServiceNum()
    },
    data () {
      return {
        hour: 0,
        orderServiceList: [
          {
            name: '全部订单',
            icon: 'icon-single',
            num: 0
          },
          {
            name: '待付款',
            icon: 'icon-pay',
            num: 0
          },
          {
            name: '待收货',
            icon: 'icon-deliver',
            num: 0
          },
          {
            name: '待评价',
            icon: 'icon-daipingjia20',
            num: 0
          },
          {
            name: '轻松退',
            icon: 'icon-tianmaojisutuikuan',
            num: 0
          }
        ],
        myAccountList: [
          {
            id: '0',
            name: '码头币',
            value: '200'
          },
          {
            id: '1',
            name: '积分',
            value: '1314'
          },
          {
            id: '2',
            name: '红包',
            value: '40.5'
          },
          {
            id: '3',
            name: '优惠券',
            value: '2'
          }
        ],
        functionList: [
          {
            name: '充值',
            icon: 'icon-chongzhi',
            color: '#c14089'
          },
          {
            name: '地址管理',
            icon: 'icon-dizhi',
            color: '#e5cf0d'
          },
          {
            name: '收藏',
            icon: 'icon-like',
            color: '#ff4646'
          },
          {
            name: '浏览足迹',
            icon: 'icon-footprint',
            color: '#59678c'
          },
          {
            name: '主题',
            icon: 'icon-skin',
            color: '#9a7fd1'
          },
          {
            name: '会员中心',
            icon: 'icon-huiyuan',
            color: '#588dd5'
          },
          {
            name: '发票申请',
            icon: 'icon-print',
            color: '#7eb00a'
          },
          {
            name: '客户服务',
            icon: 'icon-kefunv',
            color: '#5ab1ef'
          },
          {
            name: '体验店',
            icon: 'icon-tiyandian',
            color: '#97b552'
          },
          {
            name: '新手礼物',
            icon: 'icon-liwu',
            color: '#ffb980'
          },
          {
            name: '关于我们',
            icon: 'icon-friend',
            color: '#2ec7c9'
          }
        ]
      }
    },
    methods: {
      /**
       * 获取订单数量
       */
      getOrderServiceNum () {
        var allOrders = this.$store.state.orderList.myOrders
        var allNum = allOrders.length
        if (allNum > 0) {
          var ps = allOrders.where(function (t) {
            return t.orderStatus === 'PS'
          })
          var psNum = ps.length
          var fs = allOrders.where(function (t) {
            return t.orderStatus === 'FS'
          })
          var fsNum = fs.length
          var rf = allOrders.where(function (t) {
            return t.orderStatus === 'RF'
          })
          var rfNum = rf.length
          var os = allOrders.where(function (t) {
            return t.orderStatus === 'OS'
          })
          var osNum = os.length
          // this.orderServiceList[0].num = allNum  全部订单不显示数量
          this.orderServiceList[1].num = osNum
          this.orderServiceList[2].num = psNum
          this.orderServiceList[3].num = fsNum
          this.orderServiceList[4].num = rfNum
        }
      },
      /**
       * 跳转到我的订单
       * @param val 订单类型（ALL：全部订单；OS：下单成功，待付款；PS：支付成功，待收货；FS：交易完成，待评价；RF：退货中）
       */
      toMyOrders (val) {
        var type = ''
        switch (val) {
          case '全部订单':
            type = 'ALL'
            break
          case '待付款':
            type = 'OS'
            break
          case '待收货':
            type = 'PS'
            break
          case '待评价':
            type = 'FS'
            break
          case '轻松退':
            type = 'RF'
            break
        }
        this.$router.push({name: '我的订单', params: {type: type}})
      },
      showFunction () {
        this.$message({
          message: '该功能暂未开发！',
          type: 'warning'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    background-color: #f2f2f2;
    height: 92vh;
    &::-webkit-scrollbar {
      display: none
    }
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .section-one {
      position: relative;
      > img {
        width: 100vw;
      }
      .user-info {
        width: 100vw;
        margin: 0 auto;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        color: #fff;
        .img-face {
          img {
            border-radius: 50%;
            width: 18vw;
            height: 18vw;
          }
        }
        p {
          margin: 1vh 0;
          font-size: 1.4rem;
        }
        .vip {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 5vw;
            height: 5vw;
            margin-right: 5px;
          }
          span {
            font-size: 1.3rem;
          }
        }
      }
    }
    .section-two {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 2vh 0 1vh 0;
      background-color: #fff;
      .orderService {
        text-align: center;
        cursor: pointer;
        .iconfont {
          font-size: 1.7rem;
        }
        p {
          margin-top: 1vh;
          font-size: 1.2rem;
        }
        .bage {
          position: absolute;
          right: -13%;
          top: -6%;
          background-color: #ff1908;
          color: #fff;
          width: 16px;
          height: 16px;
          justify-content: center;
          display: flex;
          align-items: center;
          font-size: 1rem;
          border-radius: 90px;
        }
      }
    }
    .section-three {
      margin: 2vh 0;
      padding: 2vh 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 1.4rem;
      background-color: #fff;
      .myAccount {
        cursor: pointer;
        p {
          text-align: center;
        }
      }
    }
    .section-four {
      padding: 2vh 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      flex-wrap: wrap;
      .function {
        cursor: pointer;
        width: 25vw;
        text-align: center;
        padding: 1.1vh 0;
        .iconfont {
          font-size: 1.7rem;
          margin-bottom: 10px;
        }
        p {
          text-align: center;
          font-size: 1.4rem;
          margin-top: 5px;
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .content {
      .section-one {
        > img {
          width: 640px;
        }
        .user-info {
          width: 640px;
          .img-face {
            img {
              width: 80px;
              height: 80px;
            }
          }
          p {
            margin: 8px 0;
            font-size: 1.6rem;
          }
          .vip {
            img {
              width: 28px;
              height: 28px;
            }
            span {
              font-size: 1.5rem;
            }
          }
        }
      }
      .section-two {
        padding: 20px 0 10px 0;
        .orderService {
          .iconfont {
            font-size: 1.9rem;
          }
          p {
            margin-top: 8px;
            font-size: 1.6rem;
          }
          .bage {
            height: 15px;
            top: -9px;
            left: 40px;
          }
        }
      }
      .section-three {
        margin: 15px 0;
        padding: 15px 0;
        font-size: 20px;
      }
      .section-four {
        padding: 20px 0;
        font-size: 24px;
        .function {
          width: 25%;
          padding: 10px 0;
          .iconfont {
            font-size: 1.9rem;
          }
          p {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
</style>
