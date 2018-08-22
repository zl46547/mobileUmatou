<template>
  <div id="car">
    <div class="carList" v-if="dataList.length>0">
      <div v-for="(item,i) in dataList" :key="i">
        <div class="checkbox">
          <div class="checkbox-left" @click="checkProduct(i)">
            <i class="icon iconfont icon-round" v-if="!item.checked"></i>
            <i class="icon iconfont icon-roundcheck" v-if="item.checked"></i>
          </div>
          <div class="checkbox-right">
            <div class="image">
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
                    <div @click="changeNum(-1,i)">
                      <p>-</p>
                    </div>
                    <div>
                      <p>{{item.buyNum}}</p></div>
                    <div @click="changeNum(1,i,$event)">
                      <p>+</p></div>
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
    <div class="totalCount" v-if="dataList.length>0">
      <div>
        <div class="checkAll">
          <div class="checkAll-btn" v-if="this.dataList.length>0" @click="checkAll">
            <i class="icon iconfont icon-round" v-if="!checkAllStatus"></i>
            <i class="icon iconfont icon-roundcheck" v-if="checkAllStatus"></i>
            <span>全选</span>
          </div>
          <div class="allPrice">
            <span class="count">合计：</span>
            <span class="money">¥{{lastTotalMoney}}</span>
          </div>
        </div>
        <div class="count-btn" @click="goToAccount">
          <div><span>去结算</span><span>（{{isCheckedList.length}}）</span></div>
        </div>
      </div>
    </div>
    <!-- 脚部 -->
    <v-footer></v-footer>
    <!-- 购物车 -->
    <v-fix-car ref="ball" v-if="dataList.length>0"></v-fix-car>
    <!-- 提示框 -->
    <v-message v-if="showMessage" @is-comfirm="isComfirmDel">
      <p slot="title" class="message-title">确认删除订单</p>
      <p slot="description" class="message-description">删除后订单无法还原,是否继续操作？</p>
    </v-message>
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from '@/common/_footer.vue'
  import { Toast } from 'mint-ui'
  import cartEmpty from '@/components/car/cartEmpty.vue'
  import fixCar from '@/components/car/fixCar.vue'
  import Message from '@/common/_message.vue'

  export default {
    components: {
      'VFooter': Footer,
      'VFixCar': fixCar,
      'VMessage': Message,
      'VCartEmpty': cartEmpty
    },
    mounted () {
      this.dataList = this.$store.state.car.carList
      this.whetherIsCheckAll()
    },
    data () {
      return {
        checkAllStatus: false,
        showMessage: false, // 提示框
        delIndex: '', // 删除的对象的索引
        checkedcarsList: [], // 选中的购物车
        dataList: []
      }
    },
    methods: {
      goToAccount () {
        var vm = this
        if (vm.isCheckedList.length <= 0) {
          Toast('请先挑选商品')
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
        this.dataList.forEach(function (e) {
          e.checked = false
        })
        this.$store.commit('CAR_LIST', this.dataList)
        this.$router.replace({name: '提交订单'})
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
          this.dataList.splice(vm.delIndex, 1)
          // 如果全部删除了，就把全选状态改为false
          if (this.dataList.length <= 0) {
            this.checkAllStatus = false
          }
          // 提交vuex，修改localStorage购物车列表数据
          this.$store.commit('CAR_LIST', this.dataList)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      },
      // 删除购物车列表
      deleteItem (index) {
        var vm = this
        vm.showMessage = true
        vm.delIndex = index
      },
      checkAll () {
        if (this.checkAllStatus) {
          this.dataList.forEach(function (e) {
            e.checked = false
          })
          this.checkAllStatus = false
        } else {
          this.dataList.forEach(function (e) {
            e.checked = true
          })
          this.checkAllStatus = true
        }
      },
      /**
       * 改变购买数量
       * @param val 购物车数量+1或者是-1
       * @param index 操作的下标
       * @param event click事件
       */
      changeNum (val, index, event) {
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
        if (event) {
          this.$refs.ball.drop(event.target)
        }
      },
      /**
       * 复选框
       * @param val 当前操作的列表对象
       */
      checkProduct (i) {
        this.dataList[i].checked = !this.dataList[i].checked
        this.whetherIsCheckAll()
      },
      /**
       * 判断全选的状态
       */
      whetherIsCheckAll () {
        // 修改全选的状态
        var notCheckedList = this.dataList.where(function (t) {
          return t.checked === false
        })
        if (notCheckedList.length <= 0) {
          this.checkAllStatus = true
        } else {
          this.checkAllStatus = false
        }
      }
    },
    computed: {
      isCheckedList () {
        var checkedList = this.dataList.where(function (t) {
          return t.checked === true
        })
        return checkedList
      },
      lastTotalMoney () {
        var money = 0
        if (this.isCheckedList.length > 0) {
          money = this.isCheckedList.sum(function (t) {
            return Math.round(t.totalMoney * 10) / 10
          })
        }
        return parseInt(money * 10) / 10
      }
    }
  }
</script>

<style lang="less" scoped>
  #car {
    overflow: hidden;
    .carList {
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      width: 100vw;
      height: calc(100vh - 180px);;
      margin-top: 60px;
      > div {
        &:last-of-type {
          margin-bottom: 0;
        }
        margin-bottom: 2vh;
        background-color: #fff;
        box-shadow: 0 1px 6px #d7d7d7;
        .checkbox {
          display: flex;
          align-items: center;
          width: 100%;
          .checkbox-left {
            width: 10%;
            text-align: center;
            cursor: pointer;
            .icon-round {
              font-size: 1.8rem;
            }
            .icon-roundcheck {
              font-size: 1.8rem;
              color: #00d300;
            }
          }
          .checkbox-right {
            width: 90%;
            display: flex;
            align-items: center;
            .image {
              width: 30%;
              padding: 1vw;
              /*border: 1px solid #ccc;*/
              /*border-radius: 5px;*/
              img {
                width: 100%;
              }
            }
            .img-right {
              margin: 8% 3%;
              width: 64%;
              > p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-bottom: 3vh;
                color: #333;
                font-size: 1.4rem;
              }
              .content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .price {
                  p {
                    &:nth-of-type(1) {
                      color: #999;
                      font-size: 1.4rem;
                    }
                    &:nth-of-type(2) {
                      color: #f05423;
                      font-size: 1.5rem;
                    }
                  }
                }
                .operate {
                  .inputNumber {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    div {
                      display: flex;
                      font-size: 1.4rem;
                      width: 8vw;
                      height: 8vw;
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
                    font-size: 1.1rem;
                    float: right;
                    cursor: pointer;
                    p {
                      padding: 1vh 0;
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
            font-size: 1.4rem;
            padding: 0 12vw
          }
        }
      }
    }

    .totalCount {
      width: 100vw;
      height: 60px;
      background-color: #fff;
      position: fixed;
      bottom: 60px;
      left: 50%;
      margin-left: -50%;
      box-shadow: 0 -0.5px 20px rgb(221, 221, 221);
      > div {
        height: 100%;
        display: flex;
        justify-content: space-between;
        .checkAll {
          display: flex;
          align-items: center;
          padding-left: 2vw;
          .checkAll-btn {
            cursor: pointer;
            .icon-round {
              font-size: 1.8rem
            }
            .icon-roundcheck {
              font-size: 1.8rem;
              color: #00d300;
            }
            span {
              font-size: 1.5rem;
              padding-left: 1vw;
            }
          }
          .allPrice {
            display: flex;
            align-items: baseline;
            .count {
              padding-left: 5vw;
              font-size: 1.6rem;
            }
            .money {
              font-size: 1.5rem;
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
          height: 100%;
          display: flex;
          text-align: center;
          padding: 0 4vw;
          font-size:1rem;
          > div {
            margin: auto
          }
        }
      }
    }
  }

  @media screen and (min-width: 640px) {
    #car {
      .el-message-box {
        width: 450px;
      }

      .carList {
        width: 640px;
        > div {
          margin-bottom: 10px;
          .checkbox {
            .checkbox-left {
              .icon-round {
                font-size: 2rem;
              }
              .icon-roundcheck {
                font-size: 2rem;
              }
            }
            .checkbox-right {
              .image {
                padding: 5px;
              }
              .img-right {
                > p {
                  font-size: 1.6rem;
                }
                .content {
                  .price {
                    p {
                      &:nth-of-type(1) {
                        font-size: 1.6rem;
                      }
                      &:nth-of-type(2) {
                        font-size: 1.7rem;
                      }
                    }
                  }
                  .operate {
                    .inputNumber {
                      div {
                        font-size: 1.6rem;
                        width: 30px;
                        height: 30px;
                      }
                      div:nth-of-type(2) {
                        width: 40px;
                      }
                    }
                    .delete {
                      margin-top: 1vh;
                      font-size: 1.3rem;
                      p {
                        padding: 1vh 0;
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
              padding: 0 105px;
              font-size: 1.6rem;
            }
          }
        }
      }

      .totalCount {
        width: 640px;
        margin-left: -320px;
        > div {
          .checkAll {
            .checkAll-btn {
              .icon-round {
                font-size: 2rem;
              }
              .icon-roundcheck {
                font-size: 2rem;
              }
              span {
                font-size: 1.7rem;
                padding-left: 10px;
              }
            }
            .allPrice {
              .count {
                padding-left: 35px;
                font-size: 1.8rem;
              }
              .money {
                font-size: 1.7rem;
              }
            }
          }
          .count-btn {
            padding: 0 50px;
            font-size:1.2rem;
          }
        }
      }
    }
  }
</style>
