<template>
  <div class="pay-way-select">
    <div class="pay-way-item van-hairline--bottom"
         v-for="item in paywayList"
         :key="item.name"
         @click="onPayWayChange(item)"
    >
      <div class="pay-way-name">
        <i class="icon iconfont"
           :class="item.icon"
           :style="{'color':item.color}"
        ></i>
        <span>{{item.name}}</span>
      </div>
      <div class="checkbox">
        <i class="iconfont icon-checkbox-marked"
           v-if="item.value === payWayChecked"></i>
        <i class="iconfont icon-checkbox-blank" v-else></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PAY_WAY} from '../../../vuex/types'

  export default {
    data() {
      return {
        payWayChecked: 0,
        paywayList: [
          {
            icon: 'icon-jinbi',
            name: '码头币支付',
            value: 0,
            color: '#ecbc01'
          },
          {
            icon: 'icon-weixinzhifu',
            name: '微信支付',
            value: 1,
            color: '#27c100'
          },
          {
            icon: 'icon-zhifubaozhifu',
            name: '支付宝支付',
            value: 2,
            color: '#1157ff'
          }
        ]
      }
    },
    methods: {
      /**
       * 支付方式
       * @param value
       */
      onPayWayChange({value}) {
        this.payWayChecked = value
        this.$store.commit(PAY_WAY, value)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .pay-way-select {
    margin-top: 20rem/@baseFontSize;
    background-color: #fff;
    .pay-way-item {
      padding: 30rem/@baseFontSize 15rem/@baseFontSize;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .pay-way-name {
        display: flex;
        align-items: center;
        font-size: 30rem/@baseFontSize;
        .iconfont {
          font-size: 40rem/@baseFontSize;
          padding-right: 20rem/@baseFontSize;
        }
      }

      .checkbox {
        cursor: pointer;
        vertical-align: middle;
        padding-right: 10rem/@baseFontSize;

        .icon-checkbox-blank {
          font-size: 36rem/@baseFontSize;
          color: #b1b1b1;
        }

        .icon-checkbox-marked {
          font-size: 36rem/@baseFontSize;
          color: @themeColor;
        }
      }
    }
  }
</style>
