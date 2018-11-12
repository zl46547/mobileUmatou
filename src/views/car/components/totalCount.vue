<template>
  <div id="totalCount" v-if="carList.length>0">
    <div>
      <div class="checkAll">
        <div class="checkAll-btn" @click="checkAll">
          <i class="iconfont icon-uncheck" v-if="!checkAllStatustemp"></i>
          <i class="iconfont icon-checked" v-if="checkAllStatustemp"></i>
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
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  export default {
    props: {
      checkAllStatus: {
        required: true,
        default: false
      },
      lastTotalMoney: {
        required: true,
        default: 0
      },
      isCheckedList: {
        required: true,
        default: []
      },
      carList: {
        required: true,
        default: []
      }
    },
    data() {
      return {
        newCheckAllStatus: ''
      }
    },
    computed: {
      carListComp() {
        var vm = this
        return vm.carList
      },
      checkAllStatustemp() {
        var vm = this
        vm.newCheckAllStatus = vm.checkAllStatus
        return vm.checkAllStatus
      }
    },
    methods: {
      // 全选
      checkAll () {
        var vm = this
        if (vm.newCheckAllStatus) {
          vm.carList.forEach(function (e) {
            e.checked = false
          })
          vm.newCheckAllStatus = false
        } else {
          vm.carList.forEach(function (e) {
            e.checked = true
          })
          vm.newCheckAllStatus = true
        }
        vm.$emit('check-all', {carList: vm.carListComp, checkAllStatus: vm.newCheckAllStatus})
      },
      /**
       * 去结算
       */
      goToAccount () {
        var vm = this
        if (vm.isCheckedList.length <= 0) {
          Toast({
            message: '请选择需要结算的商品'
          })
          return false
        }
        vm.$store.commit('SELECT_CAR_LIST', this.isCheckedList)
        // 结算后商品不再默认选中
        this.carList.forEach(function (e) {
          e.checked = false
        })
        vm.$store.commit('CAR_LIST', this.carList)
        vm.$router.replace({name: '提交订单'})
      }
    }
  }
</script>

<style lang="less" scoped>
  #totalCount {
    width: 100%;
    height: 45px;
    background-color: #fff;
    position: fixed;
    bottom: 55px;
    left: 50%;
    max-width: 640px;
    transform: translateX(-50%);
    box-shadow: 0 -0.5px 20px rgb(221, 221, 221);
    > div {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .checkAll {
        display: flex;
        align-items: center;
        padding-left: 3%;
        .checkAll-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
          white-space: nowrap;
          .icon-uncheck {
            font-size: 1.5rem;
            color: #b1b1b1;
          }
          .icon-checked {
            font-size: 1.5rem;
            color: #00d300;
          }
          span {
            margin-left: 5px;
            margin-right: 5px;
            font-size: 1.3rem;
            padding-left: 1%;
          }
        }
        .allPrice {
          display: flex;
          align-items: baseline;
          white-space: nowrap;
          .count {
            padding-left: 5%;
            font-size: 1.38rem;
          }
          .money {
            font-size: 1.3rem;
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
        width: 25%;
        font-size: 1.1rem;
        > div {
          margin: auto
        }
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

  @media screen and (min-width: 400px) {
    #totalCount {
      height: 55px;
      > div {
        .checkAll {
          .checkAll-btn {
            .icon-uncheck {
              font-size: 1.8rem;
            }
            .icon-checked {
              font-size: 1.8rem;
            }
            span {
              font-size: 1.6rem;
            }
          }
          .allPrice {
            .count {
              font-size: 1.5rem;
            }
            .money {
              font-size: 1.4rem;
            }
          }
        }
        .count-btn {
          white-space: nowrap;
          font-size: 1.3rem;
        }
      }
    }
  }
</style>
