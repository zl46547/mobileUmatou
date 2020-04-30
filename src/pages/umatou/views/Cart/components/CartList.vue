<template>
    <div class="cart-list-container">
        <div class="cart-list-wapper" v-if="groupCartList.length>0">
            <div class="group-cartList"
                 v-for="(groupItem,groupIndex) in groupCartList"
                 :key="groupIndex"
            >
                <CardItem
                        :groupItem="groupItem"
                        @handle-checkbox-click="handleCheckboxClick"
                        @del-refresh="delRefresh"
                        @change-number="changeNumber"
                />
            </div>
        </div>

        <!-- 购物车为空 -->
        <CartEmpty v-if="groupCartList.length<=0"></CartEmpty>

        <!--合计-->
        <TotalCount
                v-if="groupCartList.length>0"
                :checkAllStatus="checkAllStatus"
                :lastTotalMoney="lastTotalMoney"
                :cartList="cartList"
                @check-all="checkAll"
        ></TotalCount>
    </div>
</template>

<script type="text/ecmascript-6">
    import CartEmpty from './CartEmpty'
    import TotalCount from './TotalCount'
    import CardItem from './CartItem'
    import {getCartList, setGoodsChecked} from '../service'

    export default {
        components: {
            CardItem,
            CartEmpty,
            TotalCount
        },
        created() {
            this.initCartList()
        },
        data() {
            return {
                cartList: [] // 购物车列表
            }
        },
        methods: {
            /**
             * 获取购物车列表
             */
            initCartList() {
                getCartList().then(res => {
                    this.cartList = res
                })
            },
            /**
             * 复选框点击
             * @params checkedStatus
             * @params productId
             */
            async handleCheckboxClick({checked, productId}) {
                let res = await setGoodsChecked({checked, productId})
                if (res) {
                    this.cartList = this.cartList.map(item => {
                        if (item.productId === productId) {
                            item.checked = checked
                        }
                        return item
                    })
                }
            },
            /**
             * 全选
             */
            checkAll() {
                this.cartList = this.cartList.map(item => ({...item, checked: !this.checkAllStatus}))
            },
            /**
             * 获取分组后的总金额
             * @param groupItemList
             */
            getGroupSum(groupItemList) {
                let sum = 0
                if (groupItemList) {
                    groupItemList.forEach(item => {
                        sum = sum + item.productInfo.periodMoney * item.quantity
                    })
                }
                return sum.toFixed(2)
            },
            /**
             * 删除后刷新
             * @param productId
             */
            delRefresh(productId) {
                this.cartList = this.cartList.filter(
                    item => item.productInfo.productId !== Number(productId))
            },
            /**
             * 改变购买数量
             * @param quantity 购物车数量+1或者是-1
             * @param productId
             */
            changeNumber({quantity, productId}) {
                this.cartList = this.cartList.map(item => {
                    if (item.productId === productId) {
                        item.quantity = quantity
                    }
                    return item
                })
            }
        },
        computed: {
            /**
             * 获取总价
             * @returns {string}
             */
            lastTotalMoney() {
                let totalMoney = 0
                this.cartList.forEach(item => {
                    if (item.checked) {
                        totalMoney = totalMoney + item.productInfo.periodMoney * item.quantity
                    }
                })
                return totalMoney.toFixed(2)
            },
            /**
             * 全选状态
             * @returns {boolean}
             */
            checkAllStatus() {
                let checkedList = this.cartList.filter(item => item.checked)
                return checkedList.length === this.cartList.length
            },
            /**
             * 分组后的购物车列表
             * @returns {*}
             */
            groupCartList() {
                if (this.cartList.length <= 0) {
                    return []
                }
                return this.cartList.groupBy(item => {
                    return item.productInfo.financeCName
                }).map(groupItemList => {
                    return {
                        groupItemList,
                        groupName: groupItemList[0].productInfo.financeCName,
                        groupSum: this.getGroupSum(groupItemList)
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../../less/variables";

    .cart-list-container {
        margin: 80rem/@baseFontSize 0 100rem/@baseFontSize;
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        .cart-list-wapper {
            flex: 1;
            &::-webkit-scrollbar {
                display: none
            }

            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>
