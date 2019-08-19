<template>
  <div id="cars">
    <div class="groupCarList" v-if="groupCarList.length>0">
      <div class="carList" v-for="(groupItem,groupIndex) in groupCarList" :key="groupIndex">
        <CardItem
          :groupItem="groupItem"
          @handle-checkbox-click="handleCheckboxClick"
          @del-refresh="delRefresh"
          @change-number="changeNumber"
        />
      </div>
    </div>

    <!-- 购物车为空 -->
    <CartEmpty v-if="groupCarList.length<=0"></CartEmpty>

     <!--合计-->
    <TotalCount
      :checkAllStatus="checkAllStatus"
      :lastTotalMoney="lastTotalMoney"
      :carList="carList"
      @check-all="checkAll"
    ></TotalCount>
  </div>
</template>

<script type="text/ecmascript-6">
  import CartEmpty from './cartEmpty'
  import TotalCount from './totalCount'
  import CardItem from './carItem'
  import {getCartList} from '../service'

  export default {
    components: {
      CardItem,
      CartEmpty,
      TotalCount
    },
    mounted() {
      let {user: {customerGuid}} = this.$store.state.login
      if (!customerGuid) {
        return false
      }
      this.getCarList(customerGuid)
    },
    data() {
      return {
        carList: [] // 购物车列表
      }
    },
    methods: {
      /**
       * 获取购物车列表
       */
      async getCarList(customerGuid) {
        this.carList = await getCartList({customerGuid})
      },
      /**
       * 复选框点击
       * @params checkedStatus
       * @params productId
       */
      handleCheckboxClick({checkedStatus, productId}) {
        this.carList = this.carList.map(item => {
          if (item.productId === productId) {
            item.checked = checkedStatus
          }
          return item
        })
      },
      /**
       * 全选
       */
      checkAll() {
        this.carList = this.carList.map(item => ({...item, checked: !this.checkAllStatus}))
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
        this.carList = this.carList.filter(
          item => item.productInfo.productId !== Number(productId))
      },
      /**
       * 改变购买数量
       * @param quantity 购物车数量+1或者是-1
       * @param productId
       */
      changeNumber({quantity, productId}) {
        this.carList = this.carList.map(item => {
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
        this.carList.forEach(item => {
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
        let checkedList = this.carList.filter(item => item.checked)
        return checkedList.length === this.carList.length
      },
      /**
       * 分组后的购物车列表
       * @returns {*}
       */
      groupCarList() {
        return this.carList.groupBy(item => {
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
  #cars {
    overflow: hidden;
    margin-top: 45px;

    .groupCarList {
      margin: 0 10px;
      height: calc(100vh - 145px);

      &::-webkit-scrollbar {
        display: none
      }

      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }

  @media screen and (min-width: 400px) {
    #cars {
      margin-top: 50px;

      .groupCarList {
        margin: 0 18px;
        height: calc(100vh - 160px);
      }
    }
  }
</style>
