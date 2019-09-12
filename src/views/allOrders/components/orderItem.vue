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
        <span>¥{{orderItem.payment}}</span>
      </div>
      <div class="footer-btn">
        <Button v-show="showPayOrderBtn(orderItem)"
                @click="goToPay(orderItem)"
                color="#f04a18"
                size="small"
                plain round
        >
          立即支付
        </Button>
        <Button v-show="showReOrderBtn(orderItem)"
                @click="goToReOrder(orderItem)"
                color="#909090"
                size="small"
                plain round
        >
          重新下单
        </Button>
        <Button v-show="orderItem.orderStatusCode==='PS'"
                @click="goToConfirm(orderItem)"
                color="#f04a18"
                size="small"
                plain round
        >
          确认收货
        </Button>
        <Button v-show="orderItem.orderStatusCode==='FS'"
                @click="goToRate(orderItem)"
                color="#f04a18"
                size="small"
                plain round
        >
          评价
        </Button>
        <Button v-show="orderItem.orderStatusCode==='FS'"
                @click="goToReFund(orderItem)"
                color="#ff7314"
                size="small"
                plain round
        >
          退款
        </Button>
        <Button @click="delOrderAlert(orderItem)"
                color="#909090"
                size="small"
                plain round
        >
          删除
        </Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ORDER_STATUS_NAME } from '../../../util/enum'
  import { Button } from 'vant'
  import { deleteOrder, reOrder, confirmOrder } from '../service'
  import moment from 'moment'

  export default {
    props: {
      orderItem: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        selected: ''
      }
    },
    components: {
      Button
    },
    methods: {
      /**
       * 显示重新下单按钮
       * @param orderItem
       */
      showReOrderBtn (orderItem) {
        return orderItem.orderStatusCode === 'OS' && (moment(orderItem.orderTimeOut).diff(new Date()) < 0)
      },
      /**
       * 显示立即支付按钮
       * @param orderItem
       */
      showPayOrderBtn (orderItem) {
        return orderItem.orderStatusCode === 'OS' && (moment(orderItem.orderTimeOut).diff(new Date()) > 0)
      },
      /**
       * @param status 订单状态名称
       */
      getOrderStatusName (status) {
        return ORDER_STATUS_NAME[status]
      },
      /**
       * 退货
       * @param val 删除的对象
       */
      goToReFund (val) {
        this.$message({
          description: '确认删除该订单？',
          onConfirm () {
            // this.delOrder(val)
          }
        })
      },
      /**
       * 删除订单提示框
       * @param orderItem 删除的对象
       */
      delOrderAlert (orderItem) {
        let _this = this
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        this.$message({
          description: '确认删除该订单？',
          onConfirm () {
            deleteOrder({
              customerGuid,
              orderNo: orderItem.orderNo
            }).then(res => {
              if (res) {
                _this.$emit('refresh')
              }
            })
          }
        })
      },
      /**
       * 跳转到支付页面
       * @param orderNo
       */
      goToPay ({orderNo}) {
        this.$router.push({name: '支付订单', query: {orderNo}})
      },
      /**
       * 重新下单
       * @param orderItem
       */
      goToReOrder (orderItem) {
        let _this = this
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        this.$message({
          description: '确认重新下单？',
          onConfirm () {
            reOrder({
              customerGuid,
              orderNo: orderItem.orderNo
            }).then(res => {
              if (res) {
                setTimeout(() => {
                  _this.$router.push({path: '/car'})
                }, 2000)
              }
            })
          }
        })
      },
      /**
       * 确认收货
       * @param orderItem
       */
      goToConfirm (orderItem) {
        let _this = this
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        let params = {
          customerGuid,
          orderNo: orderItem.orderNo
        }
        this.$message({
          description: '是否确认收货？',
          onConfirm () {
            confirmOrder(params).then(res => {
              _this.$emit('refresh')
            })
          }
        })
      },
      /**
       * 评价
       * @param orderItem
       */
      goToRate (orderItem) {
        this.$router.push({path: '/rate', query: {orderNo: orderItem.orderNo}})
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
          margin-right: 15rem/@baseFontSize;;
        }
        span:nth-of-type(2) {
          color: @priceColor;
          font-size: 28rem/@baseFontSize;
        }
      }
      .footer-btn {
        Button {
          margin-right: 5rem/@baseFontSize;
          &:last-of-type {
            margin-right: 0;
          }
        }
        .van-button__text {
          font-size: 24rem/@baseFontSize;
        }
        .van-button--small {
          min-width: 100rem/@baseFontSize;
          height: 50rem/@baseFontSize;
          padding: 0 16rem/@baseFontSize;
          line-height: 46rem/@baseFontSize;
        }
      }
    }
  }
</style>
