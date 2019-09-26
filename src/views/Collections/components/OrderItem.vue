<template>
  <div class="order-item">
    <p class="title van-hairline--bottom">{{groupItem.groupName}}</p>
    <SwipeCell
      v-for="item in groupItem.groupItemList"
      :key="item.productId"
    >
      <div class="group-item van-hairline--bottom">
        <img :src="`http://picpro-sz.34580.com/sz/ImageUrl/${item.productDetail.pictureId}/120.jpeg`"
             alt="购物车图片"/>
        <div class="product-info">
          <p class="product-name">{{item.productDetail.productName}}</p>
          <p class="price">
            <span class="period-money">¥{{item.productDetail.periodMoney}}</span>
            <span class="pv-standard">{{item.productDetail.pvStandard}}</span>
          </p>
        </div>
      </div>
      <template slot="right">
        <div class="delete" @click="onDelete(item.productId)">删除</div>
      </template>
    </SwipeCell>
  </div>
</template>

<script type="text/ecmascript-6">
  import { SwipeCell } from 'vant'
  import {deleteCollect} from '../service'
  export default {
    props: {
      groupItem: {
        required: true,
        type: Object
      }
    },
    components: {
      SwipeCell
    },
    methods: {
      onDelete(productId) {
        deleteCollect(productId).then(() => {
          this.$emit('refresh')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  .order-item {
    border-radius: 5rem/@baseFontSize;
    .title {
      padding: 22rem/@baseFontSize;
      font-size: 1.35rem;
      font-weight: bold;
      color: #626262;
    }
    .group-item {
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 20rem/@baseFontSize;
      img {
        display: block;
        width: 150rem/@baseFontSize;
      }
      .product-info {
        padding-left: 1rem;
        flex: 1;
        min-width: 0;
        .product-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 1rem;
          color: #333;
          font-size: 1.65rem;
        }
        .pv-standard {
          color: #999;
          font-size: 1.4rem;
        }
        .period-money {
          margin-right: .5rem;
          color: @priceColor;
          font-size: 1.6rem;
        }
      }
    }
    .delete{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 100%;
      background-color: @red;
      color: #fff;
      font-size: 1.6rem;
    }
  }
</style>
