<template>
  <div class="advertise" v-if="topicActivityList">
    <Header>
      <span slot="title">优惠活动</span>
    </Header>
    <div class="content" ref="content">
      <div v-for="activityItem in topicActivityList" :key="activityItem.uid">
        <img v-lazy="activityItem.picUrl"
             alt="typeA图片"
             v-if="activityItem.type === 'a'"
             class="type-a"
        />
        <div v-if="activityItem.type === 'b'" class="type-b">
          <img v-lazy="item.picUrl"
               alt="typeB图片"
               @click="goTop(activityItem.list[0])"
               v-for="item in activityItem.list"
               :key="item.index"
          />
        </div>
        <div v-if="activityItem.type === 'c'" class="type-c">
          <div v-for="item in activityItem.list"
               :key="item.index"
               @click="goToDetail(item)"
          >
            <div v-if="item.entity" class="type-c-content">
              <img  v-lazy="item.entity.imgUrl" alt="typeC图片"/>
              <p class="title">{{item.entity.name}}</p>
              <div class="price">
                <p class="newest-price">
                  <span>¥</span>
                  <span class="period-price">{{item.entity.periodPrice}}</span>
                  <span>/{{item.entity.unit}}</span>
                </p>
                <p class="default-price">
                  <span>¥</span>
                  <span class="shihang-price">{{item.entity.shiHangPrice}}</span>
                </p>
              </div>
              <div class="add-cart-btn"
                   :style="{'background-color':activityItem.cartBgColor}"
                   @click.stop="addTocart(item)">
                加入购物车
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../common/navigator'
  import { getTopicActivity } from './service'
  import utils from '../../util/common'

  export default {
    created () {
      // this.$store.commit('SET_LOADING', true)
      let {queryId} = this.$route.query
      this.getTopicActivityData(queryId)
    },
    components: {
      Header
    },
    beforeDestroy () {
      this.topicActivityList = []
    },
    data () {
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
      async getTopicActivityData (topicId) {
        this.topicActivityList = await getTopicActivity({topicId})
      },
      /**
       * 跳转商品详情页
       */
      goToDetail ({entity}) {
        if (entity) {
          this.$router.push({name: '商品详情', params: {productId: entity.productId}})
        }
      },
      /**
       * 回到顶部
       */
      goTop (activityItem) {
        if (activityItem.linkType === '5') {
          let dom = this.$refs.content
          utils.backToTop(dom)
        }
        if (activityItem.linkTo && activityItem.linkType !== '5') {
          this.$router.push({name: '商品详情', params: {productId: activityItem.linkTo}})
        }
      },
      /**
       * 加入购物车
       * @param product
       */
      addTocart (product) {
        if (product.entity) {
          this.getProductDetailData(product.entity.productId)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/variables";

  .advertise {
    overflow: hidden;

    .content {
      margin-top: 45px;
      height: calc(100vh - 4rem);
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .type-a {
      width: 100%;
      display: block;
    }

    .type-b {
      cursor: pointer;
      img {
        width: 100%;
        display: block;
      }
    }

    .type-c {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;

      .type-c-content {
        width: 32%;
        margin: 0.85% 0.65% ;
        cursor: pointer;
        img {
          display: block;
          width: 100%;
        }
      }
    }

    .title {
      background-color: #fff;
      font-size: 1.5rem;
      padding: .8rem .5rem 0;
      text-overflow: ellipsis;
      box-sizing: border-box;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      background-color: #fff;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: .5rem;

      .newest-price {
        display: flex;
        white-space: nowrap;
        align-items: baseline;
        color: @priceColor;
        font-size: 1.25rem;
        .period-price{
          font-size: 1.3rem;
        }
      }

      .default-price {
        font-size: 1.25rem;
        color: @defaultPriceColor;
        text-decoration: line-through;
        .shihang-price {
          font-size: 1.3rem;
        }
      }
    }

    .add-cart-btn {
      cursor: pointer;
      height: 3rem;
      line-height: 3rem;
      border-radius: 0 0 .5rem .5rem;
      font-size: 1.35rem;
      color: #fff;
      text-align: center;
    }
  }
</style>
