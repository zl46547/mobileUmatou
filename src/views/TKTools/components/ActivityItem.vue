<template>
    <div class="activity-item">
      <div @click="onModalClick">
        <img :src="detail.fileList[0].url" alt="商品"/>
        <div class="product-detail">
          <p class="product-name">{{detail.productName}}</p>
          <p class="price">
            <span>原价</span>
            <span>￥</span>
            <span>{{detail.price}}</span>
          </p>
          <p class="after-rebate-price">
            <span>到手价</span>
            <span>￥</span>
            <span>{{detail.afterRebatePrice}}</span>
          </p>
        </div>
        <div class="product-footer">查看详情</div>
      </div>
      <!--eslint-disable vue/valid-v-model-->
      <Dialog
        :width="280"
        v-model="showModal"
        :show-cancel-button="false"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
      >
        <div class="wrapper" @click="showModal = false">
          <ActivityDetail :detail="detail"/>
          <div class="close-btn"><Icon name="close"/></div>
        </div>
      </Dialog>
    </div>
</template>

<script>
  import {Icon, Dialog} from 'vant'
  import ActivityDetail from './ActivityDetail'
  export default {
    data() {
      return {
        showModal: false
      }
    },
    props: {
      detail: {
        require: true
      }
    },
    methods: {
      onModalClick() {
        this.showModal = true
      }
    },
    components: {
      ActivityDetail,
      Icon,
      Dialog: Dialog.Component
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .van-dialog{
    background-color: transparent;
    border-radius: 8px;
    margin-top: 50%;
    transform: translate(-50%,-70%);
  }
  .wrapper {
    .close-btn{
      margin-top: 1rem;
      text-align: center;
      font-size: 3rem;
      color: #fff;
    }
  }

  .activity-item{
    border-radius: 8px;
    background-color: #fff;
    box-sizing: border-box;
    width: 48%;
    margin: 1%;
    img {
      border-radius: 8px 8px 0 0;
      width: 100%;
    }
    .product-detail {
      padding: 20rem/@baseFontSize;
      padding-bottom: 0;
      .product-name {
        text-align: left;
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
        font-size: 28rem/@baseFontSize;
        word-break:break-all;
        display:-webkit-box;//对象作为伸缩盒子模型显示
        -webkit-box-orient:vertical;//设置或检索伸缩盒对象的子元素的排列方式
        -webkit-line-clamp:2;//显示行数## 标题文字 ##
      }
      .after-rebate-price,.price {
        display: flex;
        align-items: baseline;
        padding-bottom: .5rem;
        font-size: 28rem/@baseFontSize;;
        span:nth-of-type(3) {
          font-size: 34rem/@baseFontSize;;
          font-family: monospace;
        }
      }
      .after-rebate-price{
        color: @priceColor;
      }
      .price{
        color: #ddd;
        text-decoration: line-through;
      }
    }
    .product-footer {
      width: 100%;
      line-height: 3.5rem;
      height: 3.5rem;
      background-color: @priceColor;
      color: #fff;
      text-align: center;
      border-radius: 0 0 8px 8px;
      letter-spacing: 2px;
      font-size: 1.2rem;
    }
  }
</style>
