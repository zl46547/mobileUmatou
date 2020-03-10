<template>
  <div class="activity-item">
    <div @click="toDetail">
      <img :src="detail.pict_url" alt="商品"/>
      <div class="product-detail">
        <p class="product-name">{{detail.title}}</p>
        <div class="product-price-info">
          <div class="price">
            <p class="zk-final-price">
              <span>￥</span>
              <span>{{detail.zk_final_price}}</span>
            </p>
            <p class="reserve-price">
              <span>￥</span>
              <span>{{detail.reserve_price}}</span>
            </p>
          </div>
          <div class="coupon" v-if="detail.coupon_info">
            <p class="coupon-label">券</p>
            <p class="coupon-value">{{detail.coupon_info | formatCouponValue}}</p>
          </div>
        </div>
      </div>
      <div class="product-footer">查看详情</div>
    </div>
  </div>
</template>

<script>
  import {Icon} from 'vant'
  import * as types from '../../../vuex/types'

  export default {
    data() {
      return {}
    },
    filters: {
      formatCouponValue(value) {
        let startIndex = value.indexOf('减') + 1
        return value.substring(startIndex, value.length - 1)
      }
    },
    props: {
      detail: {
        require: true
      }
    },
    methods: {
      toDetail() {
        let scrollTop = this.$parent.$refs.activityContent.scrollTop
        this.$store.commit(types.SCROLL_TOP, scrollTop)
        this.$router.push({
          name: '淘客商品详情',
          query: {numIid: this.detail.num_iid}
        })
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .van-dialog {
    background-color: transparent;
    border-radius: 8px;
    margin-top: 50%;
    transform: translate(-50%, -70%);
  }

  .wrapper {
    .close-btn {
      margin-top: 1rem;
      text-align: center;
      font-size: 3rem;
      color: #fff;
    }
  }

  .activity-item {
    border-radius: 8px;
    background-color: #fff;
    box-sizing: border-box;
    width: 48%;
    margin: 1%;
    img {
      border-radius: 8px 8px 0 0;
      width: 100%;
      height: 20rem;
    }
    .product-detail {
      padding: .5rem;
      .product-name {
        text-align: left;
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
        font-size: 28rem/@baseFontSize;
        word-break: break-all;
        display: -webkit-box; //对象作为伸缩盒子模型显示
        -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
        -webkit-line-clamp: 2; //显示行数## 标题文字 ##
      }
      .product-price-info{
        margin-top: .5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: baseline;
          font-size: 1rem;
          span{
            margin: 0;
          }
          .zk-final-price {
            color: @priceColor;
            margin-right: .5rem;
            display: flex;
            align-items: baseline;
            span:nth-of-type(2){
              font-size: 1.4rem;
            }
          }
          .reserve-price {
            display: flex;
            color: #aaa;
            text-decoration: line-through;
          }
        }
        .coupon{
          display: flex;
          border: 1px solid @priceColor;
          border-radius: 3px;
          height: 1.8rem;
          line-height: 1.8rem;
          font-size: 1.3rem;
          .coupon-label{
            background-color: #fe4800;
            color: #fff;
            padding: 0 5px;
          }
          .coupon-value{
            color: #fe4800;
            padding: 0 5px;
          }
        }
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
