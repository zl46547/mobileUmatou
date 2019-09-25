<template>
  <div id="totalCount" v-if="cartList.length>0">
    <div class="checkAll-btn" @click="checkAll">
      <i class="iconfont" :class="{
          'icon-checkbox-blank':!checkAllStatus,
          'icon-checkbox-marked':checkAllStatus
        }"></i>
      <span>全选</span>
    </div>
    <div class="allPrice">
      <span class="label">合计：</span>
      <span class="money">¥{{lastTotalMoney}}</span>
    </div>
    <div class="count-btn" @click="goToAccount">
      <span>去结算</span><span>({{checkCount}})</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'vant'
  import {CART_LIST} from '../../../vuex/types'

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
      cartList: {
        required: true,
        default: []
      }
    },
    data() {
      return {
      }
    },
    computed: {
      checkCount() {
        return this.cartList.filter(item => item.checked).length
      }
    },
    methods: {
      // 全选
      checkAll () {
        this.$emit('check-all')
      },
      /**
       * 去结算
       */
      goToAccount () {
        let hasChecked = this.cartList.filter(item => item.checked)
        if (hasChecked.length <= 0) {
          Toast({
            message: '请选择需要结算的商品'
          })
          return false
        }
        this.$store.commit(CART_LIST, hasChecked)
        this.$router.replace({name: '提交订单'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #totalCount {
    width: 100%;
    height: 80rem/@baseFontSize;
    background-color: #fff;
    position: absolute;
    bottom: 90rem/@baseFontSize;
    left: 0;
    border-top: 1px solid rgb(221, 221, 221);
    display: flex;
    align-items: center;
    .checkAll-btn {
      width: 120rem/@baseFontSize;
      text-align: center;
      cursor: pointer;
      .iconfont{
        font-size: 30rem/@baseFontSize;
      }
      .icon-checkbox-blank {
        color: #b1b1b1;
      }
      .icon-checkbox-marked {
        color: @themeColor;
      }
      span {
        margin-left: 5rem/@baseFontSize;
        font-size: 26rem/@baseFontSize;
      }
    }
    .allPrice {
      flex: 1;
      margin-left: 10rem/@baseFontSize;
      font-size: 26rem/@baseFontSize;
      display: flex;
      align-items: baseline;
      white-space: nowrap;
      .money {
        color: @priceColor;
      }
    }
    .count-btn {
      cursor: pointer;
      background-color: @red;
      color: #fff;
      text-align: center;
      height: 100%;
      line-height: 80rem/@baseFontSize;
      width: 150rem/@baseFontSize;
      font-size: 24rem/@baseFontSize;
    }
  }
</style>
