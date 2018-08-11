<template>
  <div class="myOrders">
    <!-- 顶部菜单 -->
    <v-menu-select :menuItems="menus" @menu-selected="handleSelect" :selected="selected"></v-menu-select>
    <!-- 订单列表 -->
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
            <div v-if="item.orderStatus == 'OS' && item.orderStatusName === '下单成功'" @click="goToPay(item)">
              <v-order-button :button="payButton"></v-order-button>
            </div>
            <!-- 重新下单按钮 -->
            <div v-if="item.orderStatus == 'OS' && item.orderStatusName === '订单过期'" @click="goToReOrder(item)">
              <v-order-button :button="reOrderButton"></v-order-button>
            </div>
            <!-- 确认订单按钮 -->
            <div v-if="item.orderStatus == 'PS'" @click="goToComfirm(item)">
              <v-order-button :button="comfirmButton"></v-order-button>
            </div>
            <!-- 评论按钮 -->
            <div v-if="item.orderStatus == 'FS'">
              <v-order-button :button="rateButton"></v-order-button>
            </div>
            <!-- 退货按钮 -->
            <div v-if="item.orderStatus == 'FS'">
              <v-order-button :button="refundButton"></v-order-button>
            </div>
            <!-- 删除订单按钮 -->
            <div @click="delOrderAlert(item)">
              <v-order-button :button="delButton"></v-order-button>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="allOrders.length<=0">
        <div class="img-icon">
          <i class="iconfont icon-single"></i>
        </div>
        <p>您还没有相关的订单</p>
        <p>可以去看看有哪些想买</p>
        <div class="goToBuy" @click="goToBuy">随便逛逛</div>
      </div>
      <v-message v-if="showDelMessage" @is-comfirm="isComfirmDel">
        <p slot="title" class="message-title">确认删除订单</p>
        <p slot="description" class="message-description">删除后订单无法还原,是否继续操作？</p>
      </v-message>
      <v-message v-if="showComfirmOrderMessage" @is-comfirm="isComfirmOrder">
        <p slot="title" class="message-title">确认收货</p>
        <p slot="description" class="message-description">确认收货后将无法发起退货，是否继续操作？</p>
      </v-message>
      <v-message v-if="showReOrderMessage" @is-comfirm="isComfirmReOrder">
        <p slot="title" class="message-title">重新下单</p>
        <p slot="description" class="message-description">已添加{{operaObj.orderList.length}}个商品到购物车，是否立即前往购物车查看？</p>
      </v-message>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderButton from '@/components/allOrders/orderButton.vue'
  import MenuSelect from '@/common/_menuSelect.vue'
  import Message from '@/common/_message.vue'

  export default {
    data () {
      return {
        showDelMessage: false,
        showComfirmOrderMessage: false,
        showReOrderMessage: false,
        operaObj: '', // 要操作的对象
        menus: [
          {
            name: '全部订单',
            label: 'ALL'
          },
          {
            name: '待付款',
            label: 'OS'
          },
          {
            name: '待收货',
            label: 'PS'
          },
          {
            name: '待评价',
            label: 'FS'
          },
          {
            name: '轻松退',
            label: 'RF'
          }
        ],
        selected: 'ALL',
        allOrders: [],
        tempAllOrders: [],
        rateButton: {
          name: '评价',
          color: '#f04a18'
        },
        comfirmButton: {
          name: '确认收货',
          color: '#f04a18'
        },
        reOrderButton: {
          name: '重新下单',
          color: '#909090'
        },
        delButton: {
          name: '删除',
          color: '#909090'
        },
        payButton: {
          name: '立即支付',
          color: '#f04a18'
        },
        refundButton: {
          name: '退款',
          color: '#ff7314'
        }
      }
    },
    components: {
      'VOrderButton': OrderButton,
      'VMessage': Message,
      'VMenuSelect': MenuSelect
    },
    computed: {},
    mounted () {
      var type = this.$route.params.type || 'ALL'
      this.selected = type
      this.handleSelect(type)
    },
    methods: {
      /**
       * 随便逛逛
       */
      goToBuy () {
        this.$router.push({name: '首页'})
      },
      /**
       * 初始化数据,将订单状态码转换成中文
       */
      initData (type) {
        var allOrders = this.$store.state.orderList.myOrders
        if (allOrders.length > 0) {
          if (type === 'ALL') {
            this.allOrders = allOrders
          } else {
            this.allOrders = allOrders.where(function (t) {
              return t.orderStatus === type
            })
          }
          this.allOrders.forEach(function (e) {
            switch (e.orderStatus) {
              case 'OS':
                // 判断订单是否过期
                var nowTime = new Date().getTime()
                var endTime = new Date(e.deadTime).getTime()
                var remainTime = endTime - nowTime
                if (remainTime <= 0) {
                  e.orderStatusName = '订单过期'
                } else {
                  e.orderStatusName = '下单成功'
                }
                break
              case 'PS':
                e.orderStatusName = '支付成功'
                break
              case 'FS':
                e.orderStatusName = '交易完成'
                break
              case 'RF':
                e.orderStatusName = '退款中'
                break
            }
          })
        }
      },
      /**
       * tab切换事件
       * @param orderStatus  订单状态
       */
      handleSelect (orderStatus) {
        var vm = this
        vm.selected = orderStatus
        vm.initData(orderStatus)
      },
      /**
       * 确认删除
       * @param val 删除的对象
       */
      isComfirmDel(val) {
        var vm = this
        vm.showDelMessage = false
        if (val) {
          vm.delOrder(vm.operaObj)
        }
      },
      /**
       * 删除订单提示框
       * @param val 删除的对象
       */
      delOrderAlert (val) {
        var vm = this
        vm.showDelMessage = true
        vm.operaObj = val
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
        this.$store.commit('SUBMIT_ORDER', val)
        this.$router.push({name: '支付订单'})
      },
      /**
       * 重新下单
       * @param val
       */
      goToReOrder (reOrders) {
        var vm = this
        // 将商品添加到购物车
        var carlist = vm.$store.state.car.carList
        // 设置默认选中
        reOrders.orderList.forEach(function (e) {
          e.checked = true
        })
        var newCarlist = reOrders.orderList.union(carlist)
        vm.$store.commit('CAR_LIST', newCarlist)
        // 从我的订单中删除
        vm.delOrder(reOrders)
        vm.operaObj = reOrders
        vm.showReOrderMessage = true
      },
      isComfirmReOrder(val) {
        var vm = this
        vm.showReOrderMessage = false
        if (val) {
          this.$router.push({name: '购物车页'})
        }
      },
      isComfirmOrder(val) {
        var vm = this
        vm.showComfirmOrderMessage = false
        if (val) {
          vm.allOrders.forEach(function (t) {
            if (t.orderNo === vm.operaObj.orderNo) {
              t.orderStatus = 'FS'
              t.orderStatusName = '交易完成'
            }
          })
          var res = {
            isUpdate: true,
            allOrders: val
          }
          vm.$store.commit('MY_ORDERS', res)
          vm.initData(vm.selected)
        }
      },
      /**
       * 确认收货
       * @param val
       */
      goToComfirm(val) {
        var vm = this
        vm.showComfirmOrderMessage = true
        vm.operaObj = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .myOrders {
    .orderList {
      height: calc(100vh - 60px);
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
          font-size: 1.2rem;
          background-color: #fff;
          margin-bottom: 1px;
          padding: 2vh 2vw;
          display: flex;
          justify-content: space-between;
          p {
            color: #ff0045;
          }
        }
        .content {
          background-color: #fff;
          padding: 1vh 2vw 0 2vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          > div:nth-of-type(1) {
            display: flex;
            align-items: center;
            .imgWidth {
              width: 60vw;
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
              margin-left: 2vw;
              font-size: 1.4rem;
            }
          }
          > div:nth-of-type(2) {
            .iconfont {
              font-size: 1.4rem
            }
          }
        }
        .footer {
          font-size: 1.4rem;
          padding: 1vh 2vw;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            span:nth-of-type(1) {
              color: #9a9a9a;
              font-size: 1.4rem;
              margin-right: 5px;
            }
            span:nth-of-type(2) {
              color: #ff156a;
              font-size: 1.8rem;
            }
          }
          .footer-btn {
            display: flex;
          }
        }
      }
      .empty {
        .img-icon {
          display: flex;
          width: 30vw;
          height: 30vw;
          border-radius: 50%;
          background-color: #d6d6d6;
          margin: 0 auto;
          margin-top: 16vh;
          .iconfont {
            color: #fff;
            margin: auto;
            font-size: 3rem;
          }
        }
        p:nth-of-type(1) {
          font-size: 1.4rem;
          padding: 1.5vh;
          text-align: center;
        }
        p:nth-of-type(2) {
          font-size: 1.5rem;
          color: #c0c0c0;
          padding-bottom: 1.2vh;
          text-align: center;
        }
        .goToBuy {
          width: 25%;
          font-size: 1.2rem;
          text-align: center;
          margin: 1vh auto;
          padding: 1vh 2vw;
          border: 1px solid #a0a0a0;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    .myOrders {
      .orderList {
        .myorder-item {
          margin-bottom: 15px;
          .orderNo {
            font-size: 1.4rem;
            padding: 18px 20px;
          }
          .content {
            padding: 8px 15px 0 15px;
            > div:nth-of-type(1) {
              .imgWidth {
                width: 460px;
              }
              .orderImg {
                img {
                  width: 150px;
                }
              }
              p {
                margin-left: 15px;
                font-size: 1.6rem;
              }
            }
            > div:nth-of-type(2) {
              .iconfont {
                font-size: 1.6rem;
              }
            }
          }
          .footer {
            font-size: 1.6rem;
            padding: 5px 20px;
            .price {
              span:nth-of-type(1) {
                font-size: 1.6rem;
              }
              span:nth-of-type(2) {
                font-size: 2rem;
              }
            }
            .footer-btn {
              display: flex;
            }
          }
        }
        .empty {
          .img-icon {
            width: 150px;
            height: 150px;
            .iconfont {
              font-size: 4rem;
            }
          }
          p:nth-of-type(1) {
            font-size: 1.6rem;
            padding: 20px;
          }
          p:nth-of-type(2) {
            font-size: 1.7rem;
            padding-bottom: 10px;
          }
          .goToBuy {
            width: 140px;
            padding: 8px 16px;
            font-size: 1.4rem;
          }
        }
      }
    }
  }
</style>
