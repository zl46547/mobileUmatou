<template>
  <div class="rate">
    <div class="statistics-wapper" v-if="statisticsData.length>0">
      <div class="statistics-container"
           ref="statisticsContainer"
      >
        <div class="tag-item"
             :class="{'active':activeTag===item.tag}"
             v-for="item in statisticsData"
             :key="item.tag"
             @click="handleTagClick(item)"
        >
          <span class="tag">{{item.tag}}</span>
          <span class="count">{{item.count}}</span>
        </div>
      </div>
      <i class="iconfont"
         :class="{'icon-arrow-down':!pullDown,'icon-arrow-up':pullDown}"
         @click="changeShowStatus"></i>
    </div>
    <div v-if="rateData"
         class="rate-container"
         ref="rateContainer"
    >
      <List
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadMore"
      >
        <div v-for="(item,i) in rateData" :key="i">
          <RateItem :rateItem="item"></RateItem>
        </div>
      </List>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getRateList, getRateStatistics } from '../service'
  import { List, Cell } from 'vant'
  import RateItem from './RateItem'
  import dayjs from 'dayjs'
  import utils from '../../../util/common'

  export default {
    created () {
      let {productId} = this.$route.params
      this.getStatistics({productId})
    },
    components: {
      RateItem,
      List,
      Cell
    },
    data () {
      return {
        dayjs,
        activeTag: '全部',
        pullDown: false, // 基础数据下拉状态
        finished: false,
        loading: false,
        pageIndex: 0,
        rateData: [],
        statisticsData: []
      }
    },
    methods: {
      changeShowStatus() {
        if (this.pullDown) {
          this.$refs.statisticsContainer.style.maxHeight = '2.6rem'
        } else {
          this.$refs.statisticsContainer.style.maxHeight = '10rem'
        }
        this.pullDown = !this.pullDown
      },
      /**
       * 选中的tag
       */
      handleTagClick (item) {
        this.activeTag = item.tag
        this.finished = false
        this.pageIndex = 0
        let {productId} = this.$route.params
        this.getCommentList({productId, tag: item.tag})
        let dom = this.$refs.rateContainer
        utils.backToTop(dom)
      },
      /**
       * 获取评论基础数据
       * @param productId
       */
      async getStatistics (productId) {
        let statistics = await getRateStatistics(productId)
        if (statistics) {
          let {allCommentCount,
            withPictureCount,
            commentTagCollection
          } = statistics
          let statisticsData = [
            {
              tag: '全部',
              count: this.formatCount(allCommentCount)
            },
            {
              tag: '晒图',
              count: this.formatCount(withPictureCount)
            }
          ]
          if (commentTagCollection) {
            commentTagCollection.forEach(item => {
              item.count = this.formatCount(item.count)
              statisticsData.push(item)
            })
            this.statisticsData = statisticsData
          }
        }
      },
      /**
       * 格式化数量
       * @param count
       */
      formatCount (count) {
        return count > 10000 ? `${(count / 10000).toFixed(2)}万` : count
      },
      loadMore () {
        let {productId} = this.$route.params
        this.pageIndex = this.pageIndex + 1
        this.getCommentList({productId, tag: this.activeTag, pageIndex: this.pageIndex})
      },
      /**
       * 获取评论列表
       * @param productId
       * @param tag
       * @param pageIndex
       */
      async getCommentList ({productId, tag = '全部', pageIndex = 1}) {
        let commentDto = await getRateList({productId, tag, pageIndex})
          if (!commentDto) {
            return false
          }
          if (pageIndex === 1) {
            this.rateData = commentDto.sourceData
          } else {
            this.rateData = this.rateData.union(commentDto.sourceData)
          }
          // 加载状态结束
          this.loading = false
          if (!commentDto.hasNextPage) {
            this.finished = true
          }
      }
    }
  }
</script>

<style lang="less" scoped>

  .rate {
    margin-top: 4rem;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none
    }
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
    .statistics-wapper{
      .iconfont{
        margin-top: 0.5rem;
        display: block;
        width: 100%;
        text-align: center;
        cursor: pointer;
        font-size: 1.5rem;
      }
    }
    .statistics-container {
      transition: all 0.3s ease-in;
      overflow: auto;
      max-height: 2.6rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 1rem;
      padding-bottom: 0;
      .tag-item {
        cursor: pointer;
        height: 2.6rem;
        line-height: 2.6rem;
        font-size: 1.2rem;
        border-radius: 1rem;
        margin-right: .4rem;
        margin-bottom: .6rem;
        padding: 0 1rem;
        background-color: rgba(73, 170, 52, 0.12);
        .tag {
          margin-right: .4rem;
        }
      }
      .active {
        color: #fff;
        background-image: linear-gradient(90deg, #25c949, #49aa34);
      }
    }
    .rate-container {
      flex: 1;
      overflow-y: auto;
    }
  }
</style>
