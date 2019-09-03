<template>
  <div id="categoryDetail" v-if="categoryDetailData">
    <Header></Header>
    <div class="category-detail-content">
      <div v-for="k in categoryDetailData" :key="k.ProductName" class="detail-item" @click="goToDetail(k.ProductId)">
        <img :src="'http://picpro-sz.34580.com/sz/ImageUrl/' +k.PictureId+ '/500.jpeg'" alt="分类详情"/>
        <div class="product-detail">
          <p class="productName productDes">{{k.ProductName}}</p>
          <p class="priceDeatil">{{k.PvStandard}}</p>
          <div class="addCart">
            <p class="periodMoney"><span>￥</span><span>{{k.PeriodMoney}}</span></p>
            <div @click.stop="addCart(k)" class="addCart-icon">
              <span class="iconfont icon-gouwuche"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../common/header/index.vue'
  import { Toast } from 'vant'
  import {getCategoryDetail} from './service'
  export default {
    mounted() {
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
      goToDetail(productId) {
        var vm = this
        vm.$router.push({name: '商品详情', params: {productId}})
      },
      /**
       * 获取分类详细数据
       */
      getCategoryDetail(params) {
        getCategoryDetail(params).then((res) => {
          if (res) {
            this.categoryDetailData = res.SourceData
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 加入购物车
       * @param val
       */
      addCart(val) {
        // addCartUtil.addCart(res.data.data.Data.ProductInfo)
        Toast({
          message: '加入购物车成功！'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #categoryDetail {
    background-color: #ebebeb;
    width: 100%;
    overflow: hidden;
    .category-detail-content {
      margin-top: 55px;
      height: calc(100vh - 55px);
      display: flex;
      flex-wrap: wrap;
      &::-webkit-scrollbar {
        display: none
      }
      overflow-y: scroll;
      .detail-item {
        width: 48%;
        margin: 1%;
        img {
          width: 100%;
        }
      }
    }
    .product-detail {
      background-color: #fff;
      padding: 10px;
      padding-bottom: 0;
      .productDes {
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
      }
      .productName {
        font-size: 1.3rem;
      }
      .priceDeatil {
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999899;
        font-size: 1.25rem;
      }
      .addCart{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 5px;
        .periodMoney {
          display: flex;
          align-items: baseline;
          color: #f05423;
          span:nth-of-type(1){
            font-size: 1rem;
          }
          span:nth-of-type(2){
            font-size: 1.7rem;
            font-family: monospace;
          }
        }
        .addCart-icon {
          width: 25px;
          height: 25px;
          border: 1px solid #ccc;
          border-radius: 50%;
          display: flex;
          margin: 2%;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          .icon-gouwuche {
            font-size: 1.3rem;
            margin: auto;
            color: #e55b2f;
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
    .icon-gouwuche:before {
      content: "\e735";
    }
  }

  @media screen and (min-width: 400px) {
    #categoryDetail {
      .category-detail-content {
        margin-top: 60px;
        height: calc(100vh - 60px);
      }
      .product-detail {
        .productName {
          font-size: 1.35rem;
        }
        .price {
          .priceDeatil {
            .pvStandard {
              font-size: 1.3rem;
            }
            .periodMoney {
              font-size: 1.4rem;
            }
          }
          .addCart {
            .icon-gouwuche {
              font-size: 1.35rem;
            }
          }
        }
      }
    }
  }
</style>
