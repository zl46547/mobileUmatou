<template>
  <div id="allOrders">
    <div class="content">
      <!-- 顶部菜单 -->
      <v-menu-select :menuItems="menus" @menu-selected="handleSelect" :selected="selected"></v-menu-select>
      <v-order-list ref="orderList"></v-order-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MenuSelect from '@/common/menuSelect.vue'
  import OrderList from './components/orderList.vue'
  export default {
    components: {
      'VMenuSelect': MenuSelect,
      'VOrderList': OrderList
    },
    mounted () {
      var vm = this
      vm.selected = vm.$route.query.type
      vm.handleSelect(vm.selected)
    },
    methods: {
      /**
       * tab切换事件
       * @param orderStatus  订单状态
       */
      handleSelect (orderStatus) {
        var vm = this
        vm.selected = orderStatus
        vm.$refs.orderList.initData(orderStatus)
      }
    },
    data () {
      return {
        selected: 'ALL',
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
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  #allOrders {
    overflow: hidden;
    .content {
      background-color: #f2f2f2;
    }
  }
</style>
