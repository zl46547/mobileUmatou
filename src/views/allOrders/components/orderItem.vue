<template>
  <div class="order-item">
    <div class="order-no van-hairline--bottom">
      <div class="order-info">
        <span>订单编号：</span>
        <span>{{orderItem.orderNo}}</span>
      </div>
      <p class="order-status-name">{{getOrderStatusName(orderItem.orderStatusCode)}}</p>
    </div>
    <div class="content van-hairline--bottom">
      <div class="order-image">
        <img v-for="item in orderItem.orderProductInfos"
             :key="item._id"
             :src="`http://picpro-sz.34580.com/sz/ImageUrl/${item.productInfo.pictureId}/120.jpeg`"
             alt="订单图片"
        />
      </div>
      <div class="order-count">
        <span>共{{orderItem.orderProductInfos.length}}个</span>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
    <div class="footer">
      <div class="price">
        <span>实付金额</span>
        <span>¥{{orderItem.finalPrice}}</span>
      </div>
      <div class="footer-btn">
        <Button v-show="orderItem.orderStatusCode==='OS'"
                @click="goToPay(orderItem)"
                color="#f04a18"
                size="small"
                plain round
        >
          立即支付
        </Button>
        <Button v-show="orderItem.orderStatusCode==='OS'"
                @click="goToReOrder(orderItem)"
                color="#909090"
                size="small"
                plain round
        >
          重新下单
        </Button>
        <!--&lt;!&ndash; 支付订单按钮 &ndash;&gt;-->
        <!--<div v-if=" orderItem.orderStatusName === '下单成功'" @click="goToPay(orderItem)">-->
        <!--<OrderButton :button="buttonList[4]"></OrderButton>-->
        <!--</div>-->
        <!--&lt;!&ndash; 重新下单按钮 &ndash;&gt;-->
        <!--<div v-if=" orderItem.orderStatusName === '订单过期'" @click="goToReOrder(orderItem)">-->
        <!--<OrderButton :button="buttonList[2]"></OrderButton>-->
        <!--</div>-->
        <!--&lt;!&ndash; 确认订单按钮 &ndash;&gt;-->
        <!--<div v-if="orderItem.orderStatus == 'PS'" @click="goToComfirm(orderItem)">-->
        <!--<OrderButton :button="buttonList[1]"></OrderButton>-->
        <!--</div>-->
        <!--&lt;!&ndash; 评论按钮 &ndash;&gt;-->
        <!--<div v-if="orderItem.orderStatus == 'FS'" @click="goToRate(orderItem)">-->
        <!--<OrderButton :button="buttonList[0]"></OrderButton>-->
        <!--</div>-->
        <!--&lt;!&ndash; 退货按钮 &ndash;&gt;-->
        <!--<div v-if="orderItem.orderStatus == 'FS'">-->
        <!--<OrderButton :button="buttonList[5]"></OrderButton>-->
        <!--</div>-->
        <!--&lt;!&ndash; 删除订单按钮 &ndash;&gt;-->
        <!--<div @click="delOrderAlert(orderItem)">-->
        <!--<OrderButton :button="buttonList[3]"></OrderButton>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ORDER_STATUS_NAME } from '../../../util/enum'
  import { Button } from 'vant'

  export default {
    props: {
      orderItem: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        selected: '',
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
      Button
    },
    methods: {
      /**
       * @param status 订单状态名称
       */
      getOrderStatusName (status) {
        return ORDER_STATUS_NAME[status]
      },
      /**
       * 删除订单提示框
       * @param val 删除的对象
       */
      delOrderAlert (val) {
        let vm = this
        vm.$message({
          description: '确认删除该订单？',
          onComfirm () {
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
          onComfirm () {
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
      goToComfirm (val) {
        var vm = this
        vm.$message({
          description: '是否确认收货？',
          onComfirm () {
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
      goToRate (val) {
        var vm = this
        val.orderStatus = 'CLOSE'
        val.orderStatusName = '订单已关闭'
        vm.$router.push({path: '/rate'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .order-item {
    background-color: #fff;

    .order-no {
      padding: 20rem/@baseFontSize 25rem/@baseFontSize;
      display: flex;
      justify-content: space-between;

      .order-info {
        font-size: 28rem/@baseFontSize;
        color: #333;
      }

      .order-status-name {
        font-size: 30rem/@baseFontSize;
        color: @priceColor;
      }
    }

    .content {
      padding: 20rem/@baseFontSize 25rem/@baseFontSize;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .order-image {
        img {
          width: 120rem/@baseFontSize;
          padding: 16rem/@baseFontSize;
        }
      }
      .order-count {
        font-size: 30rem/@baseFontSize;
        display: flex;
        align-items: center;
        color: #333;
        .icon-arrow-right {
          font-size: 36rem/@baseFontSize;
        }
      }
    }

    .footer {
      padding: 20rem/@baseFontSize 25rem/@baseFontSize;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        span:nth-of-type(1) {
          color: #9a9a9a;
          font-size: 28rem/@baseFontSize;
          margin-right: 5px;
        }

        span:nth-of-type(2) {
          color: #ff156a;
          font-size: 28rem/@baseFontSize;
        }
      }

      .footer-btn {
        display: flex;
      }
    }
  }
</style>
