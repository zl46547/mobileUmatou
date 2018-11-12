<template>
  <div id="cars">
    <div class="groupCarList" v-if="groupCarList.length>0">
      <div class="carList" v-for="(groupItem,groupIndex) in groupCarList" :key="groupIndex">
        <div class="title">{{groupItem.financeCName}}</div>
        <div class="group-item" v-for="(item,itemIndex) in groupItem.groupCarItem" :key="itemIndex">
          <div class="checkbox">
            <div class="checkbox-left" @click="checkProduct(groupIndex,itemIndex)">
              <i class="iconfont icon-uncheck" v-if="!item.checked"></i>
              <i class="iconfont icon-checked" v-if="item.checked"></i>
            </div>
            <div class="checkbox-right">
              <div class="image">
                <img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/'+item.PictureId+'/200.jpeg'" alt="购物车图片"/>
              </div>
              <div class="product-info">
                <p>{{item.ProductName}}</p>
                <div class="content">
                  <div class="price">
                    <p>{{item.PvStandard}}</p>
                    <p>¥{{item.PeriodMoney}}</p>
                  </div>
                  <div class="operate">
                    <div class="inputNumber">
                      <div @click="changeNum(-1,item.ProductId)">
                        <p>-</p>
                      </div>
                      <div>
                        <p>{{item.buyNum}}</p>
                      </div>
                      <div @click="changeNum(1,item.ProductId)">
                        <p>+</p>
                      </div>
                    </div>
                    <div class="delete">
                      <p @click="deleteItem(item.ProductId)">删除</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carList-bottom">
          <p>小计：¥{{groupItem.sumMoney}}元</p>
        </div>
      </div>
    </div>

    <!-- 购物车为空 -->
    <v-cart-empty v-if="groupCarList.length<=0"></v-cart-empty>

    <!-- 合计 -->
    <v-total-count
      :checkAllStatus="checkAllStatus"
      :lastTotalMoney="lastTotalMoney"
      :isCheckedList="isCheckedList"
      :carList="carList"
      @check-all="checkAll"
    ></v-total-count>

    <!-- 提示框 -->
    <v-message v-if="showMessage" @is-comfirm="isComfirmDel">
      <p slot="title">确认删除订单</p>
      <p slot="description">删除后订单无法还原,是否继续操作？</p>
    </v-message>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartEmpty from './cartEmpty.vue'
  import TotalCount from './totalCount.vue'
  import Message from '@/common/message.vue'
  import { Toast } from 'mint-ui'

  export default {
    components: {
      'VMessage': Message,
      'VCartEmpty': cartEmpty,
      'VTotalCount': TotalCount
    },
    mounted () {
      var vm = this
      vm.getGroupCarList()
      this.whetherIsCheckAll()
    },
    data () {
      return {
        checkAllStatus: false, // 全选状态
        showMessage: false, // 提示框
        delIndex: '', // 删除的对象的索引
        checkedcarsList: [], // 选中的购物车
        carList: [], // 购物车列表
        groupCarList: [] // 分组后的购物车列表
      }
    },
    methods: {
      /**
       * 获取分组后的购物车列表
       */
      getGroupCarList() {
        var vm = this
        vm.carList = vm.$store.state.car.carList
        var groupCarListTempl = vm.carList.groupBy(function (t) {
          return t.FinanceCName
        })
        var groupCarList = []
        groupCarListTempl.forEach(function (groupCarItem) {
          var sumMoney = groupCarItem.select(function (e) {
            return e.PeriodMoney * e.buyNum
          }).sum()
          groupCarList.push({
            groupCarItem: groupCarItem,
            sumMoney: sumMoney.toFixed(2),
            financeCName: groupCarItem[0].FinanceCName
          })
        })
        vm.groupCarList = groupCarList
      },
      /**
       * 确认删除
       * @param val 删除的对象
       */
      isComfirmDel(val) {
        var vm = this
        vm.showMessage = false
        if (val) {
          // 删除数据源内的数据
          vm.carList.splice(vm.delIndex, 1)
          // 如果全部删除了，就把全选状态改为false
          if (vm.carList.length <= 0) {
            vm.checkAllStatus = false
          }
          // 提交vuex，修改localStorage购物车列表数据
          vm.$store.commit('CAR_LIST', vm.carList)
          // 刷新数据
          vm.getGroupCarList()
          Toast({
            message: '删除成功'
          })
          vm.whetherIsCheckAll()
        }
      },
      // 删除购物车列表
      deleteItem (productId) {
        var vm = this
        vm.showMessage = true
        var index = -1
        for (var i = 0; i < vm.carList.length; i++) {
          if (vm.carList[i].ProductId === productId) {
            index = i
          }
        }
        vm.delIndex = index
      },
      // 全选
      checkAll(val) {
        var vm = this
        vm.carList = val.carList
        vm.checkAllStatus = val.checkAllStatus
      },
      /**
       * 改变购买数量
       * @param val 购物车数量+1或者是-1
       * @param productId
       */
      changeNum (val, productId) {
        var vm = this
        var index = -1
        for (var i = 0; i < vm.carList.length; i++) {
          if (vm.carList[i].ProductId === productId) {
            index = i
          }
        }
        var num = vm.carList[index].buyNum += val
        if (num <= 0) {
          num = 1
        }
        vm.carList[index].buyNum = num
        vm.carList[index].totalMoney = (num * vm.carList[index].PeriodMoney).toFixed(2)
        vm.getGroupCarList()
        // 提交vuex，修改localStorage购物车列表数据
        vm.$store.commit('CAR_LIST', this.carList)
      },
      /**
       * 复选框
       * @param groupIndex
       * @param itemIndex
       */
      checkProduct (groupIndex, itemIndex) {
        this.groupCarList[groupIndex].groupCarItem[itemIndex].checked = !this.groupCarList[groupIndex].groupCarItem[itemIndex].checked
        this.whetherIsCheckAll()
      },
      /**
       * 判断全选的状态
       */
      whetherIsCheckAll () {
        // 修改全选的状态
        var notCheckedList = this.carList.where(function (t) {
          return t.checked === false
        })
        if (notCheckedList.length <= 0) {
          this.checkAllStatus = true
        } else {
          this.checkAllStatus = false
        }
      },
      /**
       * 去结算
       */
      goToAccount () {
        var vm = this
        if (vm.isCheckedList.length <= 0) {
          Toast({
            message: '请先挑选商品'
          })
          return false
        }
        var token = vm.$store.state.login.token
        var flag = true
        if (!token) {
          flag = false// 未登录
        }
        var currentData = new Date().getTime()
        var subtractTime = currentData - token
        if (subtractTime > 2 * 60 * 60 * 1000) {
          flag = false // 登录超时
        }
        if (!flag) {
          vm.$router.push({
            path: '/login'
          })
          return false
        }
        this.$store.commit('SELECT_CAR_LIST', this.isCheckedList)
        // 结算后商品不再默认选中
        this.carList.forEach(function (e) {
          e.checked = false
        })
        this.$store.commit('CAR_LIST', this.carList)
        this.$router.replace({name: '提交订单'})
      }
    },
    computed: {
      /**
       * 获取被选中的列表
       */
      isCheckedList () {
        var checkedList = this.carList.where(function (t) {
          return t.checked === true
        })
        return checkedList
      },
      /**
       * 获取总价
       * @returns {string}
       */
      lastTotalMoney () {
        var totalMoney = 0
        if (this.isCheckedList.length > 0) {
          totalMoney = this.isCheckedList.sum(function (t) {
            return t.PeriodMoney * t.buyNum
          })
        }
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
    .carList {
      width: 100%;
      box-shadow: 0 1px 6px #d7d7d7;
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
      &:first-of-type {
        margin-top: 10px;
      }
      .title {
        padding: 12px;
        font-size: 1.35rem;
        font-weight: bold;
        color: #626262;
        font-family: "Microsoft JhengHei";
        border-bottom: 1px solid #ddd;
      }
      .group-item {
        border-bottom: 1px solid #eee;
        background-color: #fff;
        .checkbox {
          display: flex;
          align-items: center;
          width: 100%;
          .checkbox-left {
            width: 10%;
            text-align: center;
            cursor: pointer;
            .icon-uncheck {
              font-size: 1.5rem;
              color: #b1b1b1;
            }
            .icon-checked {
              font-size: 1.5rem;
              color: #00d300;
            }
          }
          .checkbox-right {
            width: 90%;
            display: flex;
            align-items: center;
            .image {
              width: 100px;
              padding: 20px 10px;
              img {
                width: 100%;
              }
            }
            .product-info {
              width: calc(100% - 120px);
              padding-right: 10px;
              > p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 5px;
                color: #333;
                font-size: 1.35rem;
              }
              .content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .price {
                  p {
                    &:nth-of-type(1) {
                      color: #999;
                      font-size: 1.3rem;
                    }
                    &:nth-of-type(2) {
                      color: #f05423;
                      font-size: 1.4rem;
                    }
                  }
                }
                .operate {
                  .inputNumber {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    border: 1px solid #cccccc;
                    div {
                      font-size: 1.2rem;
                      width:25px;
                      border-right: 1px solid #cccccc;
                      &:last-of-type {
                        border: none;
                      }
                      p {
                        height: 28px;
                        line-height: 28px;
                        text-align: center;
                      }
                    }
                    div:nth-of-type(1) {
                      border-radius: 4px 0 0 4px
                    }
                    div:nth-of-type(2) {
                      width:35px;
                      p {
                        font-size: 1.2rem;
                      }
                    }
                    div:nth-of-type(3) {
                      border-radius: 0 4px 4px 0
                    }
                  }
                  .delete {
                    margin-top: 1vh;
                    font-size: 1.3rem;
                    float: right;
                    cursor: pointer;
                    p {
                      padding: 5px 0;
                      text-align: center;
                      color: #fff;
                      width:80px;
                      background-color: red;
                      border-radius: 4px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .carList-bottom {
        border-radius: 5px;
        color: #f05423;
        display: flex;
        align-items: center;
        p {
          font-size: 1.35rem;
          padding: 14px 12%;
        }
      }
    }

    @font-face {
      font-family: 'iconfont';
      src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    .iconfont {
      font-family: "iconfont";
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-uncheck:before {
      content: "\e70f";
    }

    .icon-checked:before {
      content: "\e626";
    }
  }
  @media screen and (min-width: 400px) {
    #cars {
      margin-top: 50px;
      .groupCarList {
        margin: 0 18px;
        height: calc(100vh - 160px);
      }
      .carList {
        margin-bottom: 18px;
        &:first-of-type {
          margin-top: 18px;
        }
        .title {
          padding: 16px;
          font-size: 1.55rem;
        }
        .group-item {
          .checkbox {
            .checkbox-left {
              .icon-uncheck {
                font-size: 1.8rem;
              }
              .icon-checked {
                font-size: 1.8rem;
              }
            }
            .checkbox-right {
              .product-info {
                > p {
                  font-size: 1.55rem;
                }
                .content {
                  .price {
                    p {
                      &:nth-of-type(1) {
                        font-size: 1.5rem;
                      }
                      &:nth-of-type(2) {
                        font-size: 1.6rem;
                      }
                    }
                  }
                  .operate {
                    .inputNumber {
                      div {
                        font-size: 1.4rem;
                        p {
                          height: 30px;
                          line-height: 30px;
                        }
                      }
                      div:nth-of-type(2) {
                        p {
                          font-size: 1.4rem;
                        }
                      }
                    }
                    .delete {
                      font-size: 1.4rem;
                    }
                  }
                }
              }
            }
          }
        }
        .carList-bottom {
          p {
            font-size: 1.55rem;
          }
        }
      }
    }
  }
</style>
