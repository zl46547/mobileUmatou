<template>
  <div id="rate">
    <div class="statistics-container van-hairline--bottom">
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
    <div v-if="rateData" class="rate-container">
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
  import Star from '@/common/star.vue'
  import {getRateList, getRateStatistics} from '../service'
  import { List, Cell } from 'vant'
  import RateItem from './rateItem'
  import moment from 'moment'

  export default {
    mounted() {
      let {productId} = this.$route.params
      this.getStatistics({productId})
    },
    components: {
      'VStar': Star,
      RateItem,
      List,
      Cell
    },
    data() {
      return {
        moment,
        activeTag: '全部',
        finished: false,
        loading: false,
        pageIndex: 0,
        rateData: [],
        statisticsData: []
      }
    },
    methods: {
      /**
       * 选中的tag
       */
      handleTagClick(item) {
        this.activeTag = item.tag
        let {productId} = this.$route.params
        this.getCommentList({productId, tag: item.tag})
        document.getElementsByClassName('rate-container')[0].scrollTop = 0
      },
      /**
       * 获取评论基础数据
       * @param productId
       */
      async getStatistics(productId) {
        let statistics = await getRateStatistics(productId)
        if (statistics) {
          let statisticsData = [
            {
              tag: '全部',
              count: this.formatCount(statistics.allCommentCount)
            },
            {
              tag: '晒图',
              count: this.formatCount(statistics.withPictureCount)
            }
          ]
          statistics.commentTagCollection.forEach(item => {
            item.count = this.formatCount(item.count)
            statisticsData.push(item)
          })
          this.statisticsData = statisticsData
        }
      },
      /**
       * 格式化数量
       * @param count
       */
      formatCount(count) {
        return count > 10000 ? `${(count / 10000).toFixed(2)}万` : count
      },
      loadMore() {
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
      async getCommentList({productId, tag = '全部', pageIndex = 1}) {
        try {
          let commentDto = await getRateList({productId, tag, pageIndex})
          if (!commentDto) {
            return false
          }
          if (pageIndex === 1) {
            this.rateData = commentDto.sourceData
          } else {
            this.rateData = this.rateData.union(commentDto.sourceData)
          }
          if (!commentDto.hasNextPage) {
            this.finished = true
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #rate {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    .statistics-container{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 1rem;
      .tag-item{
        font-size: 1.2rem;
        border-radius: 1rem;
        margin-right: .4rem;
        margin-bottom: .6rem;
        padding: .3rem 1rem;
        background-color: rgba(73, 170, 52, 0.12);
        .tag{
          margin-right: .4rem;
        }
      }
      .active{
        color: #fff;
        background-image: linear-gradient(90deg,#25c949,#49aa34);
      }
    }
    .rate-container{
      flex: 1;
      overflow-y: auto;
    }
  }
</style>
