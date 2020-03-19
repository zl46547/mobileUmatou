<template>
  <div id="product-detail">
    <Banners/>
    <!-- 脚部区域 -->
    <!--<Footer v-if="productInfo.productId"-->
            <!--:productId="productInfo.productId"-->
    <!--/>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from './components/Footer.vue'
  import Banners from './components/Banners.vue'
  import { getProductDetail } from './service'

  export default {
    components: {
      Footer,
      Banners
    },
    mounted () {
      let {numIid} = this.$route.query
      this.getProductDetailData(numIid)
    },
    data () {
      return {
        productInfo: {}// 商品详情
      }
    },
    methods: {
      /**
       * 获取商品详情
       * @param numIid
       */
      getProductDetailData (numIid) {
        getProductDetail({numIid}).then(res => {
            console.log(res)
          // this.productInfo = productInfo
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #product-detail {
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
</style>
