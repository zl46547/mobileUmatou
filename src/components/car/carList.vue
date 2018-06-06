<template>
  <div>
    <div class="carList" v-if="dataList.length>0">
      <div v-for="(item,i) in dataList" :key="i">
        <div class="checkbox">
          <div class="checkbox-left" @click="checkProduct(item)">
            <i class="icon iconfont icon-round" v-if="getCheckedItem.indexOf(item.ProductName)<0"></i>
            <i class="icon iconfont icon-roundcheck" v-if="getCheckedItem.indexOf(item.ProductName)>=0"></i>
          </div>
          <div class="checkbox-right">
            <div>
              <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/'+item.PictureId+'/200.jpeg'" alt="购物车图片">
            </div>
            <div class="img-right">
              <p>{{item.ProductName}}</p>
              <div class="content">
                <div class="price">
                  <p>{{item.PvStandard}}</p>
                  <p>¥{{item.DefaultMoney}}</p>
                </div>
                <div class="operate">
                  <div class="inputNumber">
                    <div>
                      <p @click="changeNum(-1,i)">-</p>
                    </div>
                    <div>
                      <p>{{item.buyNum}}</p></div>
                    <div>
                      <p @click="changeNum(1,i)">+</p></div>
                  </div>
                  <div class="delete">
                    <p @click="deleteItem(i)">删除</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carList-bottom">
          <p>小计：¥{{item.totalMoney}}元</p>
        </div>
      </div>
    </div>
    <!-- 购物车为空 -->
    <v-cart-empty v-if="dataList.length<=0"></v-cart-empty>
    <!-- 合计 -->
    <div class="totalCount">
      <div>
        <div class="checkAll">
          <i class="icon iconfont icon-round" v-if="!checkAllStatus" @click="checkAll"></i>
          <i class="icon iconfont icon-roundcheck" v-if="checkAllStatus" @click="checkAll"></i>
          <p>全选</p>
          <div>
            <span class="count">合计：</span>
            <span class="money">¥{{getLastTotalMoney}}</span>
          </div>
        </div>
        <div class="count-btn" @click="goToAccount">
          <div><span>去结算</span><span>（{{checkedcarsList.length}}）</span></div>
        </div>
      </div>
    </div>
    <!-- 脚部 -->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from '@/common/_footer.vue'
  import { MessageBox, Toast } from 'mint-ui'
  import cartEmpty from '@/components/car/cartEmpty.vue'

  export default {
    components: {
      'VFooter': Footer,
      'VCartEmpty': cartEmpty
    },
    mounted () {
      this.dataList = this.$store.state.car.carList
    },
    data () {
      return {
        checkAllStatus: false,
        checkedcarsList: [], // 选中的购物车
        dataList: []
      }
    },
    methods: {
      goToAccount () {
        if (this.checkedcarsList.length <= 0) {
          Toast('请先挑选商品')
          return false
        }
        this.$store.commit('SELECT_CAR_LIST', this.checkedcarsList)
        this.$router.push({name: '提交订单'})
      },
      // 删除购物车列表
      deleteItem (index) {
        MessageBox.confirm('确定执行此操作?').then(action => {
          // 删除数据源内的数据
          this.dataList.splice(index, 1)
          // 如果全部删除了，就把全选状态改为false
          if (this.dataList.length <= 0) {
            this.checkAllStatus = false
          }
          // 提交vuex，修改localStorage购物车列表数据
          this.$store.commit('CAR_LIST', this.dataList)
        }, () => {
          // 取消的内容
        })
      },
      checkAll () {
        if (this.checkAllStatus) {
          this.checkedcarsList = []
          this.checkAllStatus = false
        } else {
          // 如果购物车列表为空，则不能触发全选操作
          if (this.dataList.length <= 0) {
            this.checkAllStatus = false
            return false
          }
          // 这里不能直接写成：this.checkedcarsList = this.dataList
          // 一个对象赋值给另一个对象会存在指向性问题，两个对象指向同一块内存区域
          // 当修改一处值时，另一处也会跟着改
          this.checkedcarsList = JSON.parse(JSON.stringify(this.dataList))
          this.checkAllStatus = true
        }
      },
      /**
       * 改变购买数量
       * @param val 购物车数量+1或者是-1
       * @param index 操作的下标
       */
      changeNum (val, index) {
        var num = this.dataList[index].buyNum + val
        if (num <= 0) {
          this.dataList[index].buyNum = 1
        } else {
          this.dataList[index].buyNum += val
        }
        var totalMoney = parseInt(this.dataList[index].DefaultMoney * 100 * this.dataList[index].buyNum) / 100
        this.dataList[index].totalMoney = totalMoney
        // 提交vuex，修改localStorage购物车列表数据
        this.$store.commit('CAR_LIST', this.dataList)
      },
      /**
       * 复选框
       * @param val 当前操作的列表对象
       */
      checkProduct (val) {
        // 已被选中的列表
        var index = -1
        if (this.checkedcarsList.length > 0) {
          for (var i = 0; i < this.checkedcarsList.length; i++) {
            if ((JSON.stringify(this.checkedcarsList[i]) === (JSON.stringify(val)))) {
              index = i
              break
            }
          }
        }
        if (index >= 0) {
          // 表示已在选中列表中，此时应该是将其移除
          this.checkedcarsList.splice(index, 1)
        } else {
          this.checkedcarsList.push(val)
        }
        // 修改全选的状态
        if (this.dataList.length === this.checkedcarsList.length) {
          this.checkAllStatus = true
        } else {
          this.checkAllStatus = false
        }
      }
    },
    computed: {
      getCheckedItem () {
        var list = []
        if (this.checkedcarsList.length > 0) {
          this.checkedcarsList.forEach(function (e) {
            list.push(e.ProductName)
          })
        }
        return list
      },
      getLastTotalMoney () {
        var money = 0
        if (this.checkedcarsList.length > 0) {
          this.checkedcarsList.forEach(function (e) {
            money += e.totalMoney
          })
        }
        return parseInt(money * 100) / 100
      }
    }
  }
</script>

<style lang="less" scoped>
  .carList {
    &::-webkit-scrollbar {
      display: none
    }
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    width: 100vw;
    height: 72vh;
    margin-top: 1px;
    > div {
      margin-bottom: 2vh;
      background-color: #fff;
      box-shadow: 0px 2px 6px #bfbfbf;
      .checkbox {
        display: table;
        justify-content: flex-start;
        padding: 2vh 0;
        width: 100%;
        .checkbox-left {
          padding: 0 2vw;
          display: table-cell;
          vertical-align: middle;
          .icon-round {
            font-size: 6vw;
          }
          .icon-roundcheck {
            font-size: 6vw;
            color: #00d300;
          }
        }
        .checkbox-right {
          margin: 2vw;
          display: flex;
          img {
            width: 25vw;
            height: 25vw;
            padding: 2vw;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .img-right {
            padding: 0 5vw;
            width: 100%;
            > p {
              text-overflow: ellipsis;
              padding-bottom: 3vw;
              color: #333;
              font-size: 4vw;
            }
            .content {
              display: table;
              width: 100%;
              .price {
                width: 20vw;
                display: table-cell;
                vertical-align: middle;
              }
              .price p:nth-of-type(1) {
                color: #999;
                font-size: 4vw;
              }
              .price p:nth-of-type(2) {
                color: #f05423;
                font-size: 5vw;
              }
              .operate {
                width: 100%;
                .inputNumber {
                  display: flex;
                  justify-content: flex-end;
                  background-color: #fff;
                  div {
                    display: flex;
                    font-size: 4vw;
                    width: 7vw;
                    height: 7vw;
                    border: 1px solid #cccccc;
                    p {
                      margin: auto;
                    }
                  }
                  div:nth-of-type(1) {
                    border-radius: 4px 0 0 4px
                  }
                  div:nth-of-type(2) {
                    width: 8vw;
                  }
                  div:nth-of-type(3) {
                    border-radius: 0 4px 4px 0
                  }
                }
                .delete {
                  margin-top: 1vh;
                  float: right;
                  cursor: pointer;
                  p {
                    padding: 1vh 0vw;
                    text-align: center;
                    color: #fff;
                    width: 20vw;
                    background-color: red;
                    border-radius: 4px;
                  }
                }
              }
            }
          }
        }
      }
      .carList-bottom {
        height: 7vh;
        border-top: 1px solid #ccc;
        color: #f05423;
        display: flex;
        align-items: center;
        p {
          font-size: 4vw;
          padding: 0 12vw
        }
      }
    }
  }

  .totalCount {
    background-color: #fefefe;
    width: 100vw;
    height: 9vh;
    > div {
      display: flex;
      justify-content: space-between;
      .checkAll {
        margin: auto 0;
        display: table;
        padding-left: 2vw;
        .icon-round {
          font-size: 6vw;
          display: table-cell;
          vertical-align: bottom
        }
        .icon-roundcheck {
          display: table-cell;
          vertical-align: bottom;
          font-size: 6vw;
          color: #00d300;
        }
        p {
          padding: 0 5vw 0 3vw;
          display: table-cell;
          vertical-align: bottom
        }
        > div {
          display: table;
          .count {
            font-size: 6vw;
            display: table-cell;
            vertical-align: middle
          }
          .money {
            font-size: 5vw;
            color: #ff2b1c;
            display: table-cell;
            vertical-align: bottom
          }
        }
      }
      .count-btn {
        cursor: pointer;
        background-color: #ff822a;
        color: #fff;
        height: 9vh;
        display: flex;
        text-align: center;
        padding: 0 4vw;
        > div {
          margin: auto
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .carList {
      height: 578px;
      width: 768px;
      > div {
        margin-bottom: 10px;
        .checkbox {
          padding: 20px 0;
          .checkbox-left {
            padding: 0 10px;
            .icon-round {
              font-size: 30px;
            }
            .icon-roundcheck {
              font-size: 30px;
            }
          }
          .checkbox-right {
            margin: 10px;
            img {
              width: 120px;
              height: 120px;
              padding: 10px;
            }
            .img-right {
              padding: 0 25px;
              > p {
                padding-bottom: 15px;
                font-size: 24px;
              }
              .content {
                .price {
                  width: 100px;
                }
                .price p:nth-of-type(1) {
                  font-size: 20px;
                }
                .price p:nth-of-type(2) {
                  font-size: 25px;
                }
                .operate {
                  .inputNumber {
                    div {
                      font-size: 20px;
                      width: 35px;
                      height: 35px;
                    }
                    div:nth-of-type(2) {
                      width: 40px;
                    }
                  }
                  .delete {
                    margin-top: 10px;
                    p {
                      padding: 10px 0vw;
                      width: 100px;
                    }
                  }
                }
              }
            }
          }
        }
        .carList-bottom {
          height: 70px;
          p {
            padding: 0px 80px;
            font-size: 24px;
          }
        }
      }
    }

    .totalCount {
      width: 768px;
      height: 50px;
      > div {
        .checkAll {
          padding-left: 10px;
          .icon-round {
            font-size: 30px;
          }
          .icon-roundcheck {
            font-size: 30px;
          }
          p {
            padding: 0 25px 0 15px;
          }
          > div {
            .count {
              font-size: 30px;
            }
            .money {
              font-size: 25px;
            }
          }
        }
        .count-btn {
          height: 75px;
          padding: 0 50px;
        }
      }
    }
  }
</style>
