<template>
  <div id="myOrders">
    <div class="orderList">
      <div class="my-order-item" v-for="item in allOrders" :key="item._id">
        <OrderItem :orderItem="item"/>
        <!--<div class="orderNo">-->
          <!--<div>-->
            <!--<span>订单编号：</span><span>{{item.orderNo}}</span>-->
          <!--</div>-->
          <!--<p>{{item.orderStatusName}}</p>-->
        <!--</div>-->
        <!--<div class="content">-->
          <!--<div v-if="item.orderList.length>0">-->
            <!--<div class="orderImg" :class="{'imgWidth':item.orderList.length>2}">-->
              <!--<div v-for="imgItem in item.orderList" :key="imgItem.ProductId">-->
                <!--<img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+imgItem.PictureId+'/200.jpeg'"/>-->
              <!--</div>-->
            <!--</div>-->
            <!--<p>共{{item.orderList.length}}个</p>-->
          <!--</div>-->
          <!--<div>-->
            <!--<i class="iconfont icon-right"></i>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="footer">-->
          <!--<div class="price">-->
            <!--<span>实付金额</span>-->
            <!--<span>¥{{item.finalPrice}}</span>-->
          <!--</div>-->
          <!--<div class="footer-btn">-->

            <!--&lt;!&ndash; 支付订单按钮 &ndash;&gt;-->
            <!--<div v-if=" item.orderStatusName === '下单成功'" @click="goToPay(item)">-->
              <!--<OrderButton :button="buttonList[4]"></OrderButton>-->
            <!--</div>-->
            <!--&lt;!&ndash; 重新下单按钮 &ndash;&gt;-->
            <!--<div v-if=" item.orderStatusName === '订单过期'" @click="goToReOrder(item)">-->
              <!--<OrderButton :button="buttonList[2]"></OrderButton>-->
            <!--</div>-->
            <!--&lt;!&ndash; 确认订单按钮 &ndash;&gt;-->
            <!--<div v-if="item.orderStatus == 'PS'" @click="goToComfirm(item)">-->
              <!--<OrderButton :button="buttonList[1]"></OrderButton>-->
            <!--</div>-->
            <!--&lt;!&ndash; 评论按钮 &ndash;&gt;-->
            <!--<div v-if="item.orderStatus == 'FS'" @click="goToRate(item)">-->
              <!--<OrderButton :button="buttonList[0]"></OrderButton>-->
            <!--</div>-->
            <!--&lt;!&ndash; 退货按钮 &ndash;&gt;-->
            <!--<div v-if="item.orderStatus == 'FS'">-->
              <!--<OrderButton :button="buttonList[5]"></OrderButton>-->
            <!--</div>-->
            <!--&lt;!&ndash; 删除订单按钮 &ndash;&gt;-->
            <!--<div @click="delOrderAlert(item)">-->
              <!--<OrderButton :button="buttonList[3]"></OrderButton>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <Empty v-if="allOrders.length<=0"></Empty>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderButton from './orderButton.vue'
  import Empty from './empty.vue'
  import OrderItem from './orderItem'
  import {getOrderList} from '../service'

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
      OrderButton,
      Empty,
      OrderItem
    },
    methods: {
      /**
       * 获取订单列表
       */
      initData (orderStatusCode) {
        this.selected = orderStatusCode
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        getOrderList({customerGuid, orderStatusCode}).then(res => {
          this.allOrders = res
        })
        // var allOrders = this.$store.state.orderList.myOrders
        // if (allOrders.length <= 0) {
        //   return false
        // }
        // if (type === 'RF') {
        //   type = 'FS'
        // }
        // if (type === 'ALL') {
        //   this.allOrders = allOrders
        // } else {
        //   this.allOrders = allOrders.where(function (t) {
        //     return t.orderStatus === type
        //   })
        // }
        // this.allOrders.forEach(function (e) {
        //   e.orderStatusName = this.hanleOrderStatle(e)
        // })
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
        this.$message({
          description: '确认删除该订单？',
          onComfirm() {
            this.delOrder(val)
          }
        })
      },
      /**
       * 删除订单
       * @param val 删除的对象
       */
      delOrder (val) {
        this.allOrders.removeAll(function (t) {
          return t.orderNo === val.orderNo
        })
        var res = {
          isUpdate: false,
          allOrders: this.allOrders
        }
        this.$store.commit('MY_ORDERS', res)
        this.initData(this.selected)
      },
      /**
       * 跳转到支付页面
       * @param val
       */
      goToPay (val) {
        this.$store.commit('SUBMIT_ORDER', val)
        this.router.push({name: '支付订单'})
      },
      /**
       * 重新下单
       * @param val
       */
      goToReOrder (reOrders) {
        // 将商品添加到购物车
        var carlist = this.$store.state.car.carList
        this.$message({
          description: `确认添加${reOrders.orderList.length}个商品到购物车？`,
          onComfirm() {
            // 设置默认选中
            reOrders.orderList.forEach(e => {
              e.checked = true
            })
            var newCarlist = reOrders.orderList.union(carlist)
            this.$store.commit('CAR_LIST', newCarlist)
            // 从我的订单中删除
            this.delOrder(reOrders)
            this.$router.push({path: '/car'})
          }
        })
      },
      /**
       * 确认收货
       * @param val
       */
      goToComfirm(val) {
        this.$message({
          description: '是否确认收货？',
          onComfirm() {
            this.allOrders.forEach((t) => {
              if (t.orderNo === val.orderNo) {
                t.orderStatus = 'FS'
                t.orderStatusName = '交易完成'
              }
            })
            this.$store.commit('MY_ORDERS', {isUpdate: true, allOrders: val})
            this.initData(this.selected)
          }
        })
      },
      /**
       * 评价
       * @param val
       */
      goToRate(val) {
        val.orderStatus = 'CLOSE'
        val.orderStatusName = '订单已关闭'
        this.$router.push({path: '/rate'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #myOrders {
    margin-top: 80rem/@baseFontSize;
    .orderList {
      height: calc(100vh - 4rem);
      &::-webkit-scrollbar {
        display: none;
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .my-order-item {
        margin-bottom: 20rem/@baseFontSize;
      }
    }
  }
</style>
