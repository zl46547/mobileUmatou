<template>
  <div class="main">
    <el-menu :default-active="selected" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">商品</el-menu-item>
      <el-menu-item index="2">详情</el-menu-item>
      <el-menu-item index="3">评价</el-menu-item>
    </el-menu>

    <div v-if="selected == 1 && responseData">
      <v-banners :response="responseData"></v-banners>
      <v-price :response="responseData"></v-price>
      <v-service :response="responseData"></v-service>
      <v-rate :rateResponse="rateResponse" @showimg="showbigimg" @to-detail-rate="toDetailRate"></v-rate>
      <v-footer :response="responseData"></v-footer>
      <div v-if="showImageObj" @click="closeImageObj">
        <div class="bigImg">
          <div>
            <img :src="showImageObj.imageList[showImageObj.index]" alt="">
          </div>
        </div>
      </div>
    </div>
    <div v-if="selected == 2 && responseData" class="detail">
      <v-detail :responseData="responseData"></v-detail>
      <v-footer :response="responseData"></v-footer>
    </div>
    <div v-if="selected == 3 && rateResponse">
      <v-rate-detail :rateResponse="rateResponse" @showimg="showbigimg"></v-rate-detail>
      <v-footer :response="responseData"></v-footer>
      <div v-if="showImageObj" @click="closeImageObj">
        <div class="bigImg">
          <div>
            <img :src="showImageObj.imageList[showImageObj.index]" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import Banners from '../components/productDetail/banners.vue'
  import Price from '../components/productDetail/price.vue'
  import Service from '../components/productDetail/service.vue'
  import Rate from '../components/productDetail/rate.vue'
  import Footer from '../components/productDetail/footer.vue'

  import RateDetail from '../components/productDetail/rateDetail.vue'
  import Detail from '../components/productDetail/detail.vue'
  export default {
    components: {
      'VBanners': Banners,
      'VPrice': Price,
      'VService': Service,
      'VRate': Rate,
      'VFooter': Footer,
      'VDetail': Detail,
      'VRateDetail': RateDetail
    },
    data () {
      return {
        showImageObj: '',
        selected: '1', // navbar切换
        rateResponse: [],
        responseData: ''
      }
    },
    mounted () {
      var bannersId = this.$route.params.id
      this.bannersId = bannersId
      this.$api({
        method: 'get',
        url: '/shihang/productDetail/content/' + bannersId + '.json'
      }).then((res) => {
        this.responseData = res.data.data.Data
      }).catch((error) => {
        console.log(error)
      })
      // 请求评论内容
      this.$api({
        method: 'get',
        url: '/shihang/productDetail/rate/' + bannersId + '.json'
      }).then((res) => {
        this.rateResponse = res.data.data.Data.SourceData
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      handleSelect (val) {
        this.selected = val
      },
      showbigimg (val) {
        this.showImageObj = val
      },
      closeImageObj () {
        this.showImageObj = ''
      },
      toDetailRate (val) {
        this.selected = val
      }
    }
  }
</script>

<style lang="less" scoped>

  ul.el-menu-demo.el-menu--horizontal.el-menu {
    position: fixed;
    width: 100%;
    z-index: 9;
  }

  li.el-menu-item {
    text-align: center;
    width: 33%;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid #8BC34A;
    color: #8BC34A;
    font-size: 4vw;
  }

  .detail{
  }

  li.el-menu-item[data-v-31ad9208] {
    text-align: center;
    width: 33%;
    font-size: 4vw;
  }

  .bigImg {
    z-index: 99;
    overflow: hidden;
    width: 100vw;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: rgba(3, 3, 3, 0.5);
    > div {
      display: flex;
      width: 100vw;
      height: 100vw;
      background-color: red;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        margin: auto;
        width: 100%;
        height: 100vw;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .main {
      width: 768px;
      ul.el-menu-demo.el-menu--horizontal.el-menu {
        width: 768px;
      }
      .el-menu--horizontal > .el-menu-item.is-active {
        font-size: 18px;
      }
      li.el-menu-item[data-v-31ad9208] {
        font-size: 18px;
      }
      .el-carousel__container {
        position: relative;
        height: 500px;
      }
      .bigImg {
        width: 768px;
        > div {
          width: 768px;;
          height: 768px;;
          img {
            margin: auto;
            width: 768px;
            height: 768px;
          }
        }
      }
    }
  }

</style>
