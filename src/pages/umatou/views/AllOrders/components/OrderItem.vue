<template>
    <div class="order-item">
        <div class="order-no van-hairline--bottom">
            <div class="order-info">
                <span>订单编号：</span>
                <span>{{orderItem.orderNo}}</span>
            </div>
            <p class="order-status-name">{{getOrderStatusName(orderItem)}}</p>
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
                <Button v-show="isPayStatus(orderItem)"
                        @click="goToPay(orderItem)"
                        color="#f04a18"
                        size="small"
                        plain round
                >
                    立即支付
                </Button>
                <Button v-show="isOverTime(orderItem)"
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
    import {ORDER_STATUS_NAME} from '../../../../../util/enum'
    import {Button, Toast} from 'vant'
    import {deleteOrder, reOrder, confirmOrder} from '../service'
    import dayjs from 'dayjs'

    export default {
        props: {
            orderItem: {
                required: true,
                type: Object
            }
        },
        data() {
            return {
                selected: ''
            }
        },
        computed: {
            orderStatusCode() {
                return this.$store.state.order.orderStatusCode
            }
        },
        components: {
            Button
        },
        methods: {
            getOrderProducts(orderProducts) {
                return orderProducts.filter((item, index) => index < 3)
            },
            /**
             * 判断订单是否已过期
             * @param orderItem
             */
            isOverTime(orderItem) {
                return orderItem.orderStatusCode === 'OS' && (dayjs(orderItem.orderTimeOut).diff(new Date()) < 0)
            },
            /**
             * 判断订单是否可支付
             * @param orderItem
             */
            isPayStatus(orderItem) {
                return orderItem.orderStatusCode === 'OS' && (dayjs(orderItem.orderTimeOut).diff(new Date()) > 0)
            },

            /**
             * 订单状态名称
             * @param orderItem
             */
            getOrderStatusName(orderItem) {
                if (this.isOverTime(orderItem)) {
                    return '已过期'
                }
                return ORDER_STATUS_NAME[orderItem.orderStatusCode]
            },
            /**
             * 退货
             */
            goToReFund() {
                this.$message({
                    description: '确认退货？',
                    onConfirm() {
                        Toast.fail('功能未开发')
                    }
                })
            },
            /**
             * 删除订单提示框
             * @param orderItem 删除的对象
             */
            delOrderAlert(orderItem) {
                this.$message({
                    description: '确认删除该订单？',
                    onConfirm: () => {
                        deleteOrder({
                            orderNo: orderItem.orderNo
                        }).then(res => {
                            if (res) {
                                Toast.success('删除成功')
                                this.$store.dispatch('queryOrdersAction', this.orderStatusCode)
                            }
                        })
                    }
                })
            },
            /**
             * 跳转到支付页面
             * @param orderNo
             */
            goToPay({orderNo}) {
                this.$router.push({name: '支付订单', query: {orderNo}})
            },
            /**
             * 重新下单
             * @param orderItem
             */
            goToReOrder(orderItem) {
                this.$message({
                    description: '确认重新下单？',
                    onConfirm: () => {
                        reOrder({
                            orderNo: orderItem.orderNo
                        }).then(res => {
                            if (res) {
                                setTimeout(() => {
                                    this.$router.push({path: '/cart'})
                                }, 1500)
                            }
                        })
                    }
                })
            },
            /**
             * 确认收货
             * @param orderItem
             */
            goToConfirm(orderItem) {
                let params = {
                    orderNo: orderItem.orderNo
                }
                this.$message({
                    description: '是否确认收货？',
                    onConfirm: () => {
                        confirmOrder(params).then(() => {
                            Toast.success('收货成功')
                            this.$store.dispatch('queryOrdersAction', this.orderStatusCode)
                        })
                    }
                })
            },
            /**
             * 评价
             * @param orderItem
             */
            goToRate(orderItem) {
                this.$router.push({path: '/rate', query: {orderNo: orderItem.orderNo}})
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../../less/variables";

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
            .order-image {
                white-space: nowrap;
                flex: 1;
                overflow-x: auto;
                img {
                    width: 140rem/@baseFontSize;
                    padding: 16rem/@baseFontSize;
                }
            }
            .order-count {
                width: 6rem;
                font-size: 30rem/@baseFontSize;
                display: flex;
                align-items: center;
                justify-content: flex-end;
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
                    font-size: 30rem/@baseFontSize;
                    margin-right: 15rem/@baseFontSize;;
                }
                span:nth-of-type(2) {
                    color: @priceColor;
                    font-size: 30rem/@baseFontSize;
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
