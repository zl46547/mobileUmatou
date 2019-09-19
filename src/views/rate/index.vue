<template>
  <div id="rate">
    <Header>
      <span slot="title">评价商品</span>
    </Header>
    <div class="top-rate van-hairline--bottom">
      <div v-for="item in rateList"
           :key="item.label"
           :class="{'active':formData.productRate === item.value}"
           @click="formData.productRate = item.value"
      >
        <i class="iconfont" :class="item.icon"></i>
        <span class="label">{{item.label}}</span>
      </div>
    </div>
    <Field placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买它的人吧"
           type="textarea"
           v-model="formData.describe"
           rows="4"
    />
    <div class="rate-star">
      <div class="title van-hairline--bottom">店铺评分</div>
      <div class="rate-star-item">
        <span class="label">描述相符:</span>
        <Rate v-model="formData.describeFitRate"/>
      </div>
      <div class="rate-star-item">
        <span class="label">物流服务:</span>
        <Rate v-model="formData.logisticsRate"/>
      </div>
      <div class="rate-star-item">
        <span class="label">服务态度:</span>
        <Rate v-model="formData.serviceRate"/>
      </div>
    </div>
    <footer @click="submitRate">
      发表评论
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Field, Rate } from 'vant'
  import Header from '@/common/navigator'
  import {rateOrder} from './service'

  export default {
    components: {
      Rate,
      Header,
      Field
    },
    data () {
      return {
        rateList: [
          {
            label: '好评',
            value: 1,
            icon: 'icon-haoping'
          },
          {
            label: '中评',
            value: 2,
            icon: 'icon-zhongping'
          },
          {
            label: '差评',
            value: 3,
            icon: 'icon-chaping'
          }
        ],
        formData: {
          describe: '',
          productRate: 1,
          describeFitRate: 1,
          logisticsRate: 1,
          serviceRate: 1
        }
      }
    },
    methods: {
      /**
       * 提交订单
       * @returns {boolean}
       */
      submitRate () {
        let {user: {customerGuid}} = this.$store.state.login
        if (!customerGuid) {
          return false
        }
        let {orderNo} = this.$route.query
        let params = {
          customerGuid,
          orderNo,
          ...this.formData
        }
        rateOrder(params).then(res => {
          if (res) {
            setTimeout(() => {
              this.$router.replace({name: '用户页'})
            }, 1500)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #rate {
    /*background-color: #f2f2f2;*/
    overflow: hidden;
    height: 100vh;
    width: 100%;
    .top-rate {
      margin-top: 80rem/@baseFontSize;
      background-color: #fff;
      padding: 30rem/@baseFontSize 34rem/@baseFontSize 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ccc;
      .iconfont {
        font-size: 34rem/@baseFontSize;
        cursor: pointer;
      }
      .label {
        font-size: 28rem/@baseFontSize;
        cursor: pointer;
      }
      .active {
        color: @themeColor;
      }
    }
    .rate-star {
      margin-top: 20rem/@baseFontSize;
      background-color: #fff;
      .title {
        font-size: 30rem/@baseFontSize;
        padding: 20rem/@baseFontSize 24rem/@baseFontSize;
      }
      .rate-star-item {
        display: flex;
        align-items: center;
        .label {
          font-size: 24rem/@baseFontSize;
          padding: 22rem/@baseFontSize 24rem/@baseFontSize;
        }
      }
    }
    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      cursor: pointer;
      color: #fff;
      font-size: 24rem/@baseFontSize;
      height: 80rem/@baseFontSize;
      line-height: 80rem/@baseFontSize;
      text-align: center;
      background-color: @themeColor;
    }
    .van-rate__icon{
      font-size: 34rem/@baseFontSize;
    }
  }
</style>
