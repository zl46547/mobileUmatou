<template>
  <div id="adverise" v-if="advData">
    <v-header>
      <span slot="title">优惠活动</span>
    </v-header>
    <div class="content">
      <div v-for="(item) in advData" :key="item.uid">
        <div v-if="item.type === 'a'" class="typeA">
          <img v-lazy="item.picUrl" alt="typeA图片"/>
        </div>
        <div v-if="item.type === 'b'" class="typeB">
          <div v-for="(k) in item.list" :key="k.index">
            <img v-lazy="k.picUrl" alt="typeB图片" @click="goTop(item.list[0])"/>
          </div>
        </div>
        <div v-if="item.type === 'c'" class="typeC">
          <div class="typeC-content" v-for="(k) in item.list" :key="k.index">
            <img v-lazy="k.entity.imgUrl" alt="typeC图片" @click="goToDetail(k.entity.productId)"/>
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
                <span>¥&nbsp;{{k.entity.shiHangPrice}}</span>
              </div>
            </div>
            <div class="addCart-btn" :style="{'background-color':item.cartBgColor}" @click="addTocart(k)">
              <div class="addCart-btn-text">加入购物车</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import addCartUtil from '../../util/addCart'
  import Header from '../../common/navigator.vue'
  import {Toast} from 'mint-ui'
  import axios from 'axios'

  export default {
    mounted() {
      var vm = this
      vm.$store.commit('SET_LOADING', true)
      let {queryId} = vm.$route.query
      vm.getAdvisementData(queryId)
    },
    components: {
      'VHeader': Header
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
      async getAdvisementData(topicId) {
        let vm = this
        let advData = await vm.getAdvData(topicId)
        let barCodeList = vm.getBarCodeList(advData)
        let picData = await vm.getPictureData(barCodeList)
        vm.formatProductEntity(advData, picData)
      },
      getAdvData(topicId) {
        return new Promise((resolve, reject) => {
          this.$api({
            method: 'get',
            url: `/topicInfo/getTopicIds`,
            params: {topicId}
          }).then((res) => {
            if (res.data.data.topic_info) {
              let advData = res.data.data.topic_info
              resolve(advData)
            }
          })
        })
      },
      getBarCodeList(advData) {
        // 取出类型为C的对象
        let typeC = advData.filter(item => item.type === 'c')
        let allList = []
        // 取出对象中所有的list
        typeC.forEach(function (e) {
          allList = allList.union(e.list)
        })
        return allList.select(function (e) {
          return e.barCode
        })
      },
      /**
       * 根据barCodeList获取所有图片
       * @param barCodeList
       */
      getPictureData(barCodeList) {
        return new Promise((resolve, reject) => {
          let barCodes = JSON.stringify(barCodeList)
          this.$api({
            method: 'get',
            url: `/topicInfo/getProduct`,
            params: {barCodes}
          }).then((result) => {
            let pictureData = result.data.data
            resolve(pictureData)
          })
        })
      },
      /**
       * 封装商品详情
       */
      formatProductEntity(advData, pictureData) {
        let vm = this
        advData.forEach(function (item) {
          if (item.type === 'c') {
            item.list.forEach(function (e) {
              let entity = vm.getProductEntity(e.barCode, pictureData)
              if (entity) {
                e['entity'] = entity
              }
            })
          }
        })
        vm.advData = advData
        vm.$store.commit('SET_LOADING', false)
      },
      /**
       * 获取产品实例
       */
      getProductEntity(barCode, pictureData) {
        let productEntity = ''
        if (pictureData.length > 0) {
          let picture = pictureData.where(function (e) {
            return e.barCode === barCode
          })
          if (picture.length <= 0) {
            return null
          }
          productEntity = JSON.parse(JSON.stringify(picture[0]))
          productEntity['imgUrl'] = `http://picpro-sz.34580.com/sz/ImageUrl/${productEntity.pictureId}/400.jpg`
        }
        return productEntity
      },
      goToDetail(productId) {
        var vm = this
        if (productId) {
          vm.$router.push({name: '商品详情', params: {productId}})
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
      goTop (item) {
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
      // getAdvData(topicId) {
      //   var vm = this
      //   vm.$api({
      //     method: 'get',
      //     url: `/topicInfo/getTopicIds`,
      //     params: {topicId}
      //   }).then((res) => {
      //     if (res.data) {
      //       let {topic_info} = res.data.data
      //     }
          // if (res.data) {
          //   vm.advData = res.data
          //   vm.$store.commit('SET_LOADING', false)
          // }
      //   })
      // },
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
        axios({
          method: 'get',
          url: 'http://zl46547.coding.me/markdown/shihang/productDetail/content/' + productId + '.json'
        }).then((res) => {
          addCartUtil.addCart(res.data.data.Data.ProductInfo)
          Toast({
            message: '加入购物车成功'
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #adverise {
    overflow: hidden;
    .content{
      margin-top: 45px;
      height:calc(100vh - 45px);
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .typeA {
      img {
        width: 100%;
      }
    }
    .typeB {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      > div {
        width: 100%;
        img {
          width: 100%;
          display: block;
        }
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
          cursor: pointer;
        }
      }
    }
    .title {
      font-size: 1.2rem;
      padding: 3% 3% 0 3%;
      text-overflow: ellipsis;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 3% 4%;
      .newestPrice {
        display: flex;
        white-space: nowrap;
        align-items: baseline;
        color: #ff718e;
        font-size: 1.25rem;
        span:nth-of-type(2) {
          font-size: 1.3rem;
        }
      }
      .defaultPrice {
        span {
          font-size: 1.25rem;
          color: #aaa;
          text-decoration: line-through;
        }
      }
    }
    .addCart-btn {
      display: flex;
      height: 38px;
      width: 100%;
      cursor: pointer;
      border-radius: 0 0 10px 10px;
      .addCart-btn-text {
        font-size: 1.35rem;
        color: #fff;
        margin: auto;
      }
    }
  }

  @media screen and (min-width: 400px) {
    #adverise {
      .content{
        margin-top: 50px;
        height:calc(100vh - 50px);
      }
      .title {
        font-size: 1.3rem;
        padding: 6% 6% 0 6%;
      }
      .price {
        padding: 6% 8%;
        .newestPrice {
          font-size: 1.3rem;
          span:nth-of-type(2) {
            font-size: 1.35rem;
          }
        }
        .defaultPrice {
          span {
            font-size: 1.3rem;
          }
        }
      }
      .addCart-btn {
        height: 45px;
        .addCart-btn-text {
          font-size: 1.35rem;
        }
      }
    }
  }

  @media screen and (min-width: 500px) {
    #adverise {
      .addCart-btn {
        height: 55px;
      }
    }
  }
</style>
