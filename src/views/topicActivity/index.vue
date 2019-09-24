<template>
  <div class="advertise" v-if="topicInfo">
    <Header>
      <span slot="title">优惠活动</span>
    </Header>
    <div class="content"
         ref="content"
         :style="{'background-color':bgColor}"
    >
      <div v-for="activityItem in topicInfo" :key="activityItem.uid">
        <img v-lazy="activityItem.picUrl"
             alt="typeA图片"
             v-if="activityItem.type === 'a'"
             class="type-a"
        />
        <div v-if="activityItem.type === 'b'"
             class="type-b"
        >
          <img v-lazy="item.picUrl"
               alt="typeB图片"
               @click="goTop(activityItem.list[0])"
               v-for="item in activityItem.list"
               :key="item.index"
               :style="{width:getTypeBWidth(activityItem.cols)}"
          />
        </div>
        <div v-if="activityItem.type === 'c'" class="type-c">
          <div v-if="item.entity"
               class="type-c-content"
               v-for="item in activityItem.list"
               :key="item.index"
               @click="goToDetail(item)"
          >
            <img v-lazy="item.entity.imgUrl" alt="typeC图片"/>
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
                 @click.stop="addCart(item)">
              加入购物车
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../common/navigator'
  import { getTopicActivity, handleAddGoods } from './service'
  import utils from '../../util/common'

  export default {
    created () {
      let {queryId} = this.$route.query
      this.getTopicActivityData(queryId)
    },
    components: {
      Header
    },
    beforeDestroy () {
      this.topicInfo = []
    },
    data () {
      return {
        bgColor: null,
        scrollTop: 0,
        topicInfo: [],
        pictureData: ''
      }
    },
    methods: {
      getTypeBWidth(cols) {
        switch (cols) {
          case 1:
            return '33.33%'
          default:return '100%'
        }
      },
      /**
       * 获取主题活动信息
       * @param topicId 活动id
       */
      async getTopicActivityData (topicId) {
        let res = await getTopicActivity({topicId})
        if (res) {
          let {topic_info: topicInfo, bg_color: bgColor} = res
          this.topicInfo = topicInfo
          this.bgColor = bgColor
        } else {
          setTimeout(() => {
            this.$router.go(-1)
          }, 3000)
        }
      },
      /**
       * 跳转商品详情页
       */
      goToDetail ({entity}) {
        if (entity) {
          this.$router.push({
            name: '商品详情',
            params: {productId: entity.productId}
          })
        }
      },
      /**
       * 回到顶部或跳转详情
       */
      goTop (activityItem) {
        if (activityItem.linkType === '5') {
          let dom = this.$refs.content
          utils.backToTop(dom)
        }
        if (activityItem.linkTo && activityItem.linkType !== '5') {
          this.$router.push({
            name: '商品详情',
            params: {productId: activityItem.linkTo}
          })
        }
      },
      /**
       * 加入购物车
       */
      addCart (product) {
        debugger
        let {user: {customerGuid}} = this.$store.state.login
        let data = {
          customerGuid,
          productId: product.entity.productId
        }
        handleAddGoods(data).then(res => {
          if (res) {
            this.count = res.count
          }
        })
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
      display: flex;
      flex-wrap: wrap;
      cursor: pointer;
      img {
        display: block;
      }
    }

    .type-c {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0.5rem;
      .type-c-content {
        box-sizing: border-box;
        width: 33.33%;
        padding: 0.5rem 0.2rem;
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
        .period-price {
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
