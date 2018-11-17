<template>
  <div id="myOrders">
    <div class="orderList">
      <div class="myorder-item" v-if="allOrders.length>0" v-for="(item,i) in allOrders"
            :class="{'firstItem':i==0}" :key="i">
        <div class="orderNo">
          <div>
            <span>订单编号：</span><span>{{item.orderNo}}</span>
          </div>
          <p>{{item.orderStatusName}}</p>
        </div>
        <div class="content">
          <div v-if="item.orderList.length>0">
            <div class="orderImg" :class="{'imgWidth':item.orderList.length>2}">
              <div v-for="imgItem in item.orderList" :key="imgItem.ProductId">
                <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+imgItem.PictureId+'/200.jpeg'"/>
              </div>
            </div>
            <p>共{{item.orderList.length}}个</p>
          </div>
          <div>
            <i class="iconfont icon-right"></i>
          </div>
        </div>
        <div class="footer">
          <div class="price">
            <span>实付金额</span>
            <span>¥{{item.finalPrice}}</span>
          </div>
          <div class="footer-btn">

            <!-- 支付订单按钮 -->
            <div v-if=" item.orderStatusName === '下单成功'" @click="goToPay(item)">
              <v-order-button :button="buttonList[4]"></v-order-button>
            </div>
            <!-- 重新下单按钮 -->
            <div v-if=" item.orderStatusName === '订单过期'" @click="goToReOrder(item)">
              <v-order-button :button="buttonList[2]"></v-order-button>
            </div>
            <!-- 确认订单按钮 -->
            <div v-if="item.orderStatus == 'PS'" @click="goToComfirm(item)">
              <v-order-button :button="buttonList[1]"></v-order-button>
            </div>
            <!-- 评论按钮 -->
            <div v-if="item.orderStatus == 'FS'" @click="goToRate(item)">
              <v-order-button :button="buttonList[0]"></v-order-button>
            </div>
            <!-- 退货按钮 -->
            <div v-if="item.orderStatus == 'FS'">
              <v-order-button :button="buttonList[5]"></v-order-button>
            </div>
            <!-- 删除订单按钮 -->
            <div @click="delOrderAlert(item)">
              <v-order-button :button="buttonList[3]"></v-order-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-empty v-if="allOrders.length<=0"></v-empty>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderButton from './orderButton.vue'
  import Empty from './empty.vue'
  export default {
    data () {
      return {
        selected: '',
        allOrders: [],
        buttonList: [
          {
            name: '评价',
            color: '#f04a18',
            showStatus: ['交易完成']
          },
          {
            name: '确认收货',
            color: '#f04a18',
            showStatus: ['支付成功']
          },
          {
            name: '重新下单',
            color: '#909090',
            showStatus: ['订单过期']
          },
          {
            name: '删除',
            color: '#909090',
            showStatus: ['下单成功', '支付成功', '订单过期', '交易完成', '订单已关闭']
          },
          {
            name: '立即支付',
            color: '#f04a18',
            showStatus: ['下单成功']
          },
          {
            name: '退款',
            color: '#ff7314',
            showStatus: ['支付成功', '交易完成']
          }
        ]
      }
    },
    components: {
      'VOrderButton': OrderButton,
      'VEmpty': Empty
    },
    computed: {},
    mounted () {
    },
    methods: {
      /**
       * 初始化数据,将订单状态码转换成中文
       */
      initData (type) {
        var vm = this
        vm.selected = type
        var allOrders = vm.$store.state.orderList.myOrders
        if (allOrders.length <= 0) {
          return false
        }
        if (type === 'RF') {
          type = 'FS'
        }
        if (type === 'ALL') {
          vm.allOrders = allOrders
        } else {
          vm.allOrders = allOrders.where(function (t) {
            return t.orderStatus === type
          })
        }
        vm.allOrders.forEach(function (e) {
          e.orderStatusName = vm.hanleOrderStatle(e)
        })
      },
      /**
       * 判断订单是否过期
       */
      hanleOrderStatle(item) {
        if (item.orderStatus === 'OS') {
          let nowTime = new Date().getTime()
          let endTime = new Date(item.deadTime).getTime()
          let remainTime = endTime - nowTime
          if (remainTime <= 0) {
            return '订单过期'
          }
          return '下单成功'
        }
        return item.orderStatusName
      },
      /**
       * 删除订单提示框
       * @param val 删除的对象
       */
      delOrderAlert (val) {
        let vm = this
        vm.$message({
          description: '确认删除该订单？',
          onComfirm() {
            vm.delOrder(val)
          }
        })
      },
      /**
       * 删除订单
       * @param val 删除的对象
       */
      delOrder (val) {
        var vm = this
        vm.allOrders.removeAll(function (t) {
          return t.orderNo === val.orderNo
        })
        var res = {
          isUpdate: false,
          allOrders: vm.allOrders
        }
        vm.$store.commit('MY_ORDERS', res)
        vm.initData(vm.selected)
      },
      /**
       * 跳转到支付页面
       * @param val
       */
      goToPay (val) {
        var vm = this
        vm.$store.commit('SUBMIT_ORDER', val)
        vm.router.push({name: '支付订单'})
      },
      /**
       * 重新下单
       * @param val
       */
      goToReOrder (reOrders) {
        var vm = this
        // 将商品添加到购物车
        var carlist = vm.$store.state.car.carList
        vm.$message({
          description: `确认添加${reOrders.orderList.length}个商品到购物车？`,
          onComfirm() {
            // 设置默认选中
            reOrders.orderList.forEach(e => {
              e.checked = true
            })
            var newCarlist = reOrders.orderList.union(carlist)
            vm.$store.commit('CAR_LIST', newCarlist)
            // 从我的订单中删除
            vm.delOrder(reOrders)
            vm.$router.push({path: '/car'})
          }
        })
      },
      /**
       * 确认收货
       * @param val
       */
      goToComfirm(val) {
        var vm = this
        vm.$message({
          description: '是否确认收货？',
          onComfirm() {
            vm.allOrders.forEach((t) => {
              if (t.orderNo === val.orderNo) {
                t.orderStatus = 'FS'
                t.orderStatusName = '交易完成'
              }
            })
            vm.$store.commit('MY_ORDERS', {isUpdate: true, allOrders: val})
            vm.initData(vm.selected)
          }
        })
      },
      /**
       * 评价
       * @param val
       */
      goToRate(val) {
        var vm = this
        val.orderStatus = 'CLOSE'
        val.orderStatusName = '订单已关闭'
        vm.$router.push({path: '/rate'})
      }
    }
  }
</script>

<style lang="less" scoped>
  #myOrders {
    margin-top: 50px;
    .orderList {
      height: calc(100vh - 50px);
      &::-webkit-scrollbar {
        display: none;
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .firstItem {
        margin-top: 2px;
      }
      .myorder-item {
        margin-bottom: 2vh;
        box-shadow: 0 3px 17px #cccccc;
        .orderNo {
          font-size: 1.25rem;
          background-color: #fff;
          margin-bottom: 1px;
          padding: 10px 15px;
          display: flex;
          justify-content: space-between;
          p {
            color: #ff0045;
          }
        }
        .content {
          background-color: #fff;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          > div:nth-of-type(1) {
            display: flex;
            align-items: center;
            .imgWidth {
              width: calc(60vw + 18px);
              display: flex;
              overflow-x: auto;
              overflow-y: hidden;
              -webkit-overflow-scrolling: touch;
              &::-webkit-scrollbar {
                display: none
              }
            }
            .orderImg {
              display: flex;
              img {
                width: 20vw;
                padding: 3px;
              }
            }
            p {
              margin-left: 10px;
              font-size: 1.3rem;
            }
          }
          > div:nth-of-type(2) {
            .iconfont {
              font-size: 1.4rem
            }
          }
        }
        .footer {
          padding: 10px 15px;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #eee;
          .price {
            span:nth-of-type(1) {
              color: #9a9a9a;
              font-size: 1.25rem;
              margin-right: 5px;
            }
            span:nth-of-type(2) {
              color: #ff156a;
              font-size: 1.4rem;
            }
          }
          .footer-btn {
            display: flex;
          }
        }
      }
    }
  }
  @media screen and (min-width: 400px) {
    #myOrders {
      .orderList {
        .myorder-item {
          .orderNo {
            font-size: 1.45rem;
            padding: 14px 20px;
          }
          .content {
            > div:nth-of-type(1) {
              .imgWidth {
                width: 318px;
              }
              .orderImg {
                display: flex;
                img {
                  width: 100px;
                }
              }
              p {
                font-size: 1.5rem;
              }
            }
            > div:nth-of-type(2) {
              .iconfont {
                font-size: 1.6rem
              }
            }
          }
          .footer {
            .price {
              span:nth-of-type(1) {
                font-size: 1.5rem;
              }
              span:nth-of-type(2) {
                font-size: 1.6rem;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 550px) {
    #myOrders {
      .orderList {
        .myorder-item {
          .content {
            > div:nth-of-type(1) {
              .imgWidth {
                width: 408px;
              }
              .orderImg {
                display: flex;
                img {
                  width: 130px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
