<template>
    <div class="tab-content">
        <Empty v-if="allOrders.length<=0"></Empty>
        <OrderList :allOrders="allOrders" v-else/>
    </div>
</template>

<script type="text/ecmascript-6">
    import Empty from './Empty'
    import OrderList from './OrderList'

    export default {
        components: {
            Empty,
            OrderList
        },
        methods: {},
        computed: {
            allOrders(){
                return this.$store.state.order.allOrders
            }
        }
    }
</script>

<style lang="less" scoped>
    .tab-content {
        height: calc(100vh - 44px);
        &::-webkit-scrollbar {
            display: none;
        }
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
</style>
