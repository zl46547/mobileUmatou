<template>
  <div id="cars">
    <div class="groupCarList" v-if="groupCarList.length>0">
      <div class="carList" v-for="(groupItem,groupIndex) in groupCarList" :key="groupIndex">
        <CardItem
          :groupItem="groupItem"
          @handle-checkbox-click="handleCheckboxClick"
          @del-refresh="delRefresh"
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
      // this.getGroupCarList()
      // this.whetherIsCheckAll()
    },
    data() {
      return {
        showMessage: false, // 提示框
        delIndex: '', // 删除的对象的索引
        checkedcarsList: [], // 选中的购物车
        carList: [], // 购物车列表
        groupCarList: [] // 分组后的购物车列表
      }
    },
    methods: {
      /**
       * 获取购物车列表
       */
      async getCarList(customerGuid) {
        this.carList = await getCartList({customerGuid})
        this.getGroupCarList()
      },
      /**
       * 获取分组后的购物车列表
       */
      getGroupCarList() {
        this.groupCarList = this.carList.groupBy(item => {
          return item.productInfo.financeCName
        }).map(groupItemList => {
          return {
            groupItemList,
            groupName: groupItemList[0].productInfo.financeCName,
            groupSum: this.getGroupSum(groupItemList)
          }
        })
      },
      /**
       * 复选框点击
       * @params checkedStatus
       * @params productId
       */
      handleCheckboxClick({checkedStatus, productId}) {
        this.groupCarList = this.groupCarList.map(groupItem => {
          return {
            ...groupItem,
            groupItemList: groupItem.groupItemList.map(item => {
              if (item.productId === productId) {
                item = {...item, checked: checkedStatus}
              }
              return item
            })
          }
        })
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
        this.getGroupCarList()
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
        this.getGroupCarList()
        // this.whetherIsCheckAll()
      },
      /**
       * 改变购买数量
       * @param val 购物车数量+1或者是-1
       * @param productId
       */
      changeNum(val, productId) {
        let index = -1
        for (let i = 0; i < this.carList.length; i++) {
          if (this.carList[i].ProductId === productId) {
            index = i
          }
        }
        let num = this.carList[index].buyNum += val
        if (num <= 0) {
          num = 1
        }
        this.carList[index].buyNum = num
        this.carList[index].totalMoney = (num * this.carList[index].PeriodMoney).toFixed(2)
        this.getGroupCarList()
        // 提交vuex，修改localStorage购物车列表数据
        this.$store.commit('CAR_LIST', this.carList)
      },

      /**
       * 判断全选的状态
       */
      // whetherIsCheckAll() {
      //   // 修改全选的状态
      //   let checkedList = this.carList.filter(item => item.checked)
      //   this.checkAllStatus = checkedList.length === this.carList.length
      // },
      /**
       * 去结算
       */
      goToAccount() {
        // if (this.isCheckedList.length <= 0) {
        //   Toast({
        //     message: '请先挑选商品'
        //   })
        //   return false
        // }
        // let token = this.$store.state.login.token
        // let flag = true
        // if (!token) {
        //   flag = false// 未登录
        // }
        // let currentData = new Date().getTime()
        // let subtractTime = currentData - token
        // if (subtractTime > 2 * 60 * 60 * 1000) {
        //   flag = false // 登录超时
        // }
        // if (!flag) {
        //   this.$router.push({
        //     path: '/login'
        //   })
        //   return false
        // }
        // this.$store.commit('SELECT_CAR_LIST', this.isCheckedList)
        // // 结算后商品不再默认选中
        // this.carList.forEach(function (e) {
        //   e.checked = false
        // })
        // this.$store.commit('CAR_LIST', this.carList)
        // this.$router.replace({name: '提交订单'})
      }
    },
    computed: {
      checkAllStatus() {
        let checkedList = this.carList.filter(item => item.checked)
        return checkedList.length === this.carList.length
      },
    //   /**
    //    * 获取被选中的列表
    //    */
    //   isCheckedList() {
        // let checkedList = this.carList.where(function (t) {
        //   return t.checked === true
        // })
        // return checkedList
      // },
      /**
       * 获取总价
       * @returns {string}
       */
      lastTotalMoney() {
        let totalMoney = 0
        this.carList.forEach(item => {
          if (item.checked) {
            totalMoney = totalMoney + item.productInfo.periodMoney
          }
        })
        return totalMoney.toFixed(2)
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
