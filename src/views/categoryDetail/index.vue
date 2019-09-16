<template>
  <div id="category-detail">
    <Header></Header>
    <div class="category-detail-content">
      <div class="detail-item"
           v-for="item in categoryDetailData"
           :key="item.ProductName"
           @click="goToDetail(item.ProductId)"
      >
        <img :src="`http://picpro-sz.34580.com/sz/ImageUrl/${item.PictureId}/500.jpeg`" alt="分类详情"/>
        <div class="product-detail">
          <p class="product-name">{{item.ProductName}}</p>
          <p class="product-standard">{{item.PvStandard}}</p>
          <div class="product-footer">
            <p class="period-money">
              <span>￥</span>
              <span>{{item.PeriodMoney}}</span>
            </p>
            <i class="iconfont icon-cart"
               @click.stop="addCart(item.ProductId)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../common/header/index.vue'
  import { getCategoryDetail, addGoods } from './service'

  export default {
    created () {
      let {categoryIds} = this.$route.query
      if (categoryIds) {
        this.getCategoryDetail({categoryIds})
      }
    },
    data () {
      return {
        categoryDetailData: []
      }
    },
    components: {
      Header
    },
    methods: {
      /**
       * 跳转商品详情页面
       * @param productId
       */
      goToDetail (productId) {
        this.$router.push({name: '商品详情', params: {productId}})
      },
      /**
       * 获取分类详细数据
       */
      getCategoryDetail (params) {
        getCategoryDetail(params).then((res) => {
          if (res) {
            this.categoryDetailData = res.SourceData
          }
        })
      },
      /**
       * 加入购物车
       * @param productId
       */
      addCart (productId) {
        let {
          login: {user: {customerGuid}}
        } = this.$store.state
        if (!customerGuid) {
          return false
        }
        addGoods({
          productId,
          customerGuid
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  #category-detail {
    .category-detail-content {
      margin-top: 100rem/@baseFontSize;
      height: calc(100vh - 5rem);
      display: flex;
      flex-wrap: wrap;
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: auto;
      .detail-item {
        border-radius: 5rem/@baseFontSize;
        background-color: #fff;
        box-sizing: border-box;
        width: 48%;
        margin: 1%;
        img {
          width: 100%;
        }
        .product-detail {
          padding: 20rem/@baseFontSize;
          padding-bottom: 0;
          .product-name {
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            font-size: 26rem/@baseFontSize;
          }
          .product-standard {
            color: #999899;
            font-size: 24rem/@baseFontSize;
          }
          .product-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 10rem/@baseFontSize;
            .period-money {
              display: flex;
              align-items: baseline;
              color: @priceColor;
              span:nth-of-type(1) {
                font-size: 20rem/@baseFontSize;;
              }
              span:nth-of-type(2) {
                font-size: 28rem/@baseFontSize;;
                font-family: monospace;
              }
            }
            .icon-cart {
              width: 40rem/@baseFontSize;
              height: 40rem/@baseFontSize;
              line-height: 40rem/@baseFontSize;
              text-align: center;
              border: 1px solid #ccc;
              border-radius: 50%;
              display: block;
              cursor: pointer;
              font-size: 22rem/@baseFontSize;;
              color: @priceColor;
            }
          }
        }
      }
    }
  }
</style>
