<template>
  <div id="product-detail">
    <Tabs v-model="active" swipeable color="#57bc2f">
      <Tab title="商品" >
        <Product :productInfo="productInfo"
                 :productInfoServices="productInfoServices"
                 :productActivities="productActivities"
        />
      </Tab>
      <Tab title="详情">
        <Detail :productInfo="productInfo"/>
      </Tab>
      <Tab title="评价" >
        <RateDetail/>
      </Tab>
    </Tabs>
    <!-- 脚部区域 -->
    <Footer v-if="productInfo.productId"
            :productId="productInfo.productId"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import Product from './components/Product'
  import Footer from './components/Footer.vue'
  import RateDetail from './components/RateDetail'
  import Detail from './components/Detail.vue'
  import { getProductDetail } from './service'
  import {Tabs,Tab} from 'vant'

  export default {
    components: {
      Tabs,
      Tab,
      Product,
      Footer,
      Detail,
      RateDetail
    },
    mounted () {
      let {productId} = this.$route.params
      this.getProductDetailData(productId)
    },
    data () {
      return {
        active:'商品',
        productInfo: {}, // 商品详情
        productInfoServices: '', // 商品服务
        productActivities: '', // 商品活动
      }
    },
    methods: {
      /**
       * 获取商品详情
       * @param ssuId
       */
      async getProductDetailData (ssuId) {
        this.$showLoading()
        try {
          let res = await getProductDetail({ssuId})
          let {productInfo, productInfoServiceList, productActivityList} = res
          this.productInfo = productInfo
          this.productInfo.fullDescription = productInfo.fullDescription.match(/http.*?jpg/g)
          this.productInfoServices = productInfoServiceList
          this.productActivities = productActivityList
        }catch (e) {
          console.log(e)
        }finally {
          this.$hideLoading()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #product-detail {
    background-color: #fff;
  }
</style>
