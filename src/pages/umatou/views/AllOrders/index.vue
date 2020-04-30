<template>
    <div id="allOrders">
        <Tabs swipeable
              @change="handleSelect"
              :active="orderStatusCode"
        >
            <Tab title="全部订单" name="ALL">
                <TabContent/>
            </Tab>
            <Tab title="待付款" name="OS">
                <TabContent/>
            </Tab>
            <Tab title="待收货" name="PS">
                <TabContent/>
            </Tab>
            <Tab title="待评价" name="FS">
                <TabContent/>
            </Tab>
            <Tab title="轻松退" name="RF">
                <TabContent/>
            </Tab>
        </Tabs>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Tab,Tabs} from 'vant'
    import TabContent from './components/TabContent'

    export default {
        components: {
            TabContent,
            Tab,
            Tabs
        },
        created() {
            let orderStatusCode = this.$route.query.type
            this.handleSelect(orderStatusCode)
        },
        computed:{
            orderStatusCode(){
                return this.$store.state.order.orderStatusCode
            }
        },
        methods: {
            /**
             * 获取订单列表
             */
            handleSelect(orderStatusCode) {
                if(orderStatusCode === 'ALL'){
                    orderStatusCode = null
                }
                this.$store.dispatch('queryOrdersAction',orderStatusCode)
            }
        },
        data() {
            return {
                allOrders: []
            }
        }
    }
</script>
