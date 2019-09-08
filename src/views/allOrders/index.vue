<template>
  <div id="allOrders">
    <div class="content">
      <!-- 顶部菜单 -->
      <MenuSelect :menuItems="menus"
                  @menu-selected="handleSelect"
                  :selected="selected"
      />
      <OrderList ref="orderList"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MenuSelect from '@/common/menuSelect.vue'
  import OrderList from './components/orderList.vue'

  export default {
    components: {
      MenuSelect,
      OrderList
    },
    mounted () {
      this.selected = this.$route.query.type
      this.handleSelect(this.selected)
    },
    methods: {
      /**
       * tab切换事件
       * @param orderStatus  订单状态
       */
      handleSelect (orderStatus) {
        this.selected = orderStatus
        this.$refs.orderList.initData()
      }
    },
    data () {
      return {
        selected: '',
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
    .content {
      background-color: #f2f2f2;
    }
  }
</style>
