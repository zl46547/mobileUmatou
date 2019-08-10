<template>
  <div id="adverise" v-if="topicActivityList">
    <v-header>
      <span slot="title">优惠活动</span>
    </v-header>
    <div class="content">
      <div v-for="(item) in topicActivityList" :key="item.uid">
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
  import Header from '../../common/navigator.vue'
  import {getTopicActivity} from './service'

  export default {
    mounted() {
      this.$store.commit('SET_LOADING', true)
      let {queryId} = this.$route.query
      this.getTopicActivityData(queryId)
    },
    components: {
      'VHeader': Header
    },
    beforeDestroy() {
      this.topicActivityList = []
    },
    data() {
      return {
        scrollTop: 0,
        topicActivityList: [],
        pictureData: ''
      }
    },
    methods: {
      /**
       * 获取主题活动信息
       * @param topicId 活动id
       */
      async getTopicActivityData(topicId) {
        this.topicActivityList = await getTopicActivity({topicId})
      },
      goToDetail(productId) {
        if (productId) {
          this.$router.push({name: '商品详情', params: {productId}})
        }
      },
      backToTop() {
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
      goTop(item) {
        if (item.linkType === '5') {
          this.backToTop()
        }
        if (item.linkTo && item.linkType !== '5') {
          this.goToDetail(item.linkTo)
        }
      },
      /**
       * 加入购物车
       * @param product
       */
      addTocart(product) {
        if (product.entity) {
          this.getProductDetailData(product.entity.productId)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #adverise {
    overflow: hidden;

    .content {
      margin-top: 45px;
      height: calc(100vh - 45px);
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
      .content {
        margin-top: 50px;
        height: calc(100vh - 50px);
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
