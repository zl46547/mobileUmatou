<template>
  <div id="allOrders">
    <!-- 顶部菜单 -->
    <MenuSelect
      :menuItems="menus"
      @menu-selected="handleSelect"
      :selected="orderStatusCode"
    />
    <transition name="fade" mode="out-in">
        <div class="order-container" v-if="!loading">
          <OrderList :allOrders="allOrders"
                     :orderStatusCode="orderStatusCode"
                     @refresh="handleSelect"
          />
          <Empty v-if="allOrders.length<=0"></Empty>
        </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import MenuSelect from '@/common/menuSelect'
  import Empty from './components/empty'
  import OrderList from './components/orderList'
  import { getOrderList } from './service'

  export default {
    components: {
      Empty,
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
        this.loading = true
        this.orderStatusCode = orderStatusCode
        getOrderList({
          orderStatusCode: this.orderStatusCode
        }).then(res => {
          this.allOrders = res
          this.loading = false
        })
      }
    },
    data () {
      return {
        loading: false,
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
    height: 100%;
    overflow: hidden;
    .order-container{
      margin-top: 4rem;
      height: calc(100vh - 4rem);
      &::-webkit-scrollbar {
        display: none;
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .fade-enter-active,.fade-leave-active {
      transition: all .5s ease-in;
    }
    .fade-enter, .slide-fade-leave-to {
      /*transform: translateX(10%);*/
      opacity: 0;
    }
  }
</style>
