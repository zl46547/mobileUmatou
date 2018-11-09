<template>
  <div id="adverise" v-if="advData">
    <div v-for="(item) in advData" :key="item.uid">
      <div v-if="item.type === 'a'" class="typeA">
        <img :src="item.picUrl" alt="" mode="widthFix"/>
      </div>
      <div v-if="item.type === 'b'" class="typeB">
        <img :src="k.picUrl" alt="typeB图片" mode="widthFix" v-for="(k) in item.list" :key="k.index"
             @click="goTop(item.list[0])"/>
      </div>
      <div v-if="item.type === 'c'" class="typeC">
        <div class="typeC-content" v-for="(k) in item.list" :key="k.index">
          <img :src="k.entity.imgUrl" alt="typeC图片" mode="widthFix" @click="goToDetail(k.entity.productId)"/>
          <div class="title" @click="goToDetail(k.entity.productId)">
            {{k.entity.name}}
          </div>
          <div class="price" @click="goToDetail(k.entity.productId)">
            <div class="newestPrice">
              <span>¥</span>
              <span>{{k.entity.periodPrice}}</span>
              <span>/{{k.entity.unit}}</span>
            </div>
            <div class="defaultPrice">
              <span>¥&nbsp;{{k.entity.marketPrice}}</span>
            </div>
          </div>
          <div class="addCart-btn" :style="{'background-color':item.cartBgColor}" @click="addTocart(k)">
            <div class="addCart-btn-text">加入购物车</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import addCartUtil from '../../util/addCart'
  import { Toast } from 'mint-ui'
  export default {
    mounted() {
      var vm = this
      vm.$store.commit('SET_LOADING', true)
      let {queryId} = vm.$route.query
      vm.getAdvData(queryId)
    },
    beforeDestroy() {
      var vm = this
      vm.advData = ''
    },
    data() {
      return {
        scrollTop: 0,
        advData: '',
        pictureData: ''
      }
    },
    methods: {
      goToDetail(productId) {
        var vm = this
        if (productId) {
          vm.$router.push({path: '/detail', query: {productId}})
        }
      },
      backToTop () {
        let timer = setInterval(() => {
          var top = document.getElementsByClassName('content')[0].scrollTop
          let speed = Math.ceil(top / 5)
          document.getElementsByClassName('content')[0].scrollTop = top - speed
          if (top === 0) {
            clearInterval(timer)
          }
        }, 20)
      },
      /**
       * 回到顶部
       */
      goTop: function (item) {
        var vm = this
        if (item.linkType === '5') {
          vm.backToTop()
        }
        if (item.linkTo && item.linkType !== '5') {
          vm.goToDetail(item.linkTo)
        }
      },
      /**
       * 获取广告数据
       */
      getAdvData(queryId) {
        var vm = this
        vm.$api({
          method: 'get',
          url: `/shihang/index/adv/${queryId}.json/`
        }).then((res) => {
          if (res.data) {
            vm.advData = res.data
            vm.$store.commit('SET_LOADING', false)
          }
        })
      },
      /**
       * 加入购物车
       * @param product
       */
      addTocart (product) {
        var vm = this
        if (product.entity) {
          vm.getProductDetailData(product.entity.productId)
        }
      },
      /**
       * 获取商品详细信息
       */
      getProductDetailData(productId) {
        var vm = this
        vm.request({
          url: 'https://api1.34580.com/sz/Products/ProductDetailRequest',
          data: {
            sourcetype: 9,
            id: productId
          },
          success: function (res) {
            addCartUtil.addCart(res.data.Data.ProductInfo)
            Toast({
              message: '加入购物车成功'
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #adverise {
    .typeA {
      img {
        width: 100%;
      }
    }
    .typeB {
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        width: 100%;
      }
    }
    .typeC {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      .typeC-content {
        width: 32%;
        padding: 0 0.65%;
        margin-bottom: 10px;
        img {
          width: 100%;
        }
      }
    }
    .title {
      font-size: 14px;
      text-overflow: ellipsis;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 0 2vw 1vh 2vw;
      .newestPrice {
        display: flex;
        white-space: nowrap;
        align-items: baseline;
        color: #ff718e;
        font-size: 0.25rem;
        text:nth-of-type(2) {
          font-size: 0.3rem;
        }
      }
      .defaultPrice {
        text {
          font-size: 0.25rem;
          color: #aaa;
          text-decoration: line-through;
        }
      }
    }
    .addCart-btn {
      display: flex;
      height: 6vh;
      width: 100%;
      cursor: pointer;
      border-radius: 0 0 10px 10px;
      .addCart-btn-text {
        font-size: 0.35rem;
        color: #fff;
        margin: auto;
      }
    }
  }
</style>
