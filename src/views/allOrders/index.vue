<template>
  <div id="allOrders">
    <!-- 顶部菜单 -->
    <MenuSelect
      :menuItems="menus"
      @menu-selected="handleSelect"
      :selected="orderStatusCode"
    />
    <OrderList :allOrders="allOrders"
               :orderStatusCode="orderStatusCode"
               @refresh="handleSelect"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import MenuSelect from '@/common/menuSelect'
  import OrderList from './components/orderList'
  import { getOrderList } from './service'

  export default {
    components: {
      MenuSelect,
      OrderList
    },
    created () {
      let orderStatusCode = this.$route.query.type
      this.handleSelect(orderStatusCode)
    },
    methods: {
      /**
       * 获取订单列表
       */
      handleSelect (orderStatusCode) {
        this.orderStatusCode = orderStatusCode
        getOrderList({
          orderStatusCode: this.orderStatusCode
        }).then(res => {
          this.allOrders = res
        })
      }
    },
    data () {
      return {
        allOrders: [],
        orderStatusCode: '',
        menus: [
          {
            name: '全部订单',
            label: undefined
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
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  #allOrders {
    overflow: hidden;
    position: relative;
  }
</style>
