<template>
  <div class="order-list">
    <div class="order"
         v-for="(groupItem,groupIndex) in groupOrderList"
         :key="groupIndex">
      <OrderItem :groupItem="groupItem" @refresh="getCollectionList"/>
    </div>
    <Empty v-if="groupOrderList.length === 0"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderItem from './OrderItem'
  import Empty from './Empty'
  import {getsearchCollect} from '../service'
  export default {
    components: {
      OrderItem,
      Empty
    },
    created () {
      this.getCollectionList()
    },
    data () {
      return {
        groupOrderList: []
      }
    },
    methods: {
      getCollectionList() {
        getsearchCollect().then(res => {
          if (res.length > 0) {
            this.getGroupOrderList(res)
          } else {
            this.groupOrderList = []
          }
        })
      },
      /**
       * 获取分组后的购物车列表
       */
      getGroupOrderList (orderList) {
        this.groupOrderList = orderList.groupBy(item => {
          return item.productDetail.financeCName
        }).map(groupItemList => {
          return {
            groupItemList,
            groupName: groupItemList[0].productDetail.financeCName
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../less/variables";

  .order-list {
    .order{
      margin: 0 auto 1rem;
      box-shadow: 0 .1rem 5rem #d7d7d7;
      background-color: #fff;
      border-radius: .5rem;
      &:first-of-type {
        margin-top: 1rem;
      }
    }
  }
</style>
