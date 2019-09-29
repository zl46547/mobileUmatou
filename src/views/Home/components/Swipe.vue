<template>
  <div id="adverise">
    <Swipe :autoplay="4000" @change="onChange">
      <SwipeItem v-for="k in adverseList" :key="k.Id">
          <img :src="k.PicUrl" @click="goToIndexAdv(k.JumpValue)">
      </SwipeItem>
      <div class="custom-indicator" slot="indicator">
        {{ current + 1 }}/{{adverseList.length}}
      </div>
    </Swipe>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Swipe, SwipeItem, Toast } from 'vant'
  import {getSwipper} from '../service'
  import {SCROLL_TOP} from '../../../vuex/types'

  export default {
    created() {
      this.getSwiperData()
    },
    components: {
      Swipe,
      SwipeItem
    },
    data() {
      return {
        adverseList: [],
        current: 0
      }
    },
    methods: {
      /**
       * 轮播图切换
       * @param index
       */
      onChange(index) {
        this.current = index
      },
      /**
       * 获取轮播图数据
       */
      getSwiperData() {
        getSwipper({typeCode: 1011}).then((res) => {
          this.adverseList = res
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 跳转至专题详情页
       * @param JumpValue
       */
      goToIndexAdv(JumpValue) {
        this.$store.commit(SCROLL_TOP, this.$parent.$refs.content.scrollTop)
        if (JumpValue.indexOf('topics') > -1) {
          let queryId = JumpValue.replace('https://wechatx.34580.com/topics/', '')
          this.$router.push({path: '/topicActivity', query: {queryId}})
        } else {
          Toast({
            message: '不支持该跳转'
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../less/variables";

  #adverise {
    width: 100%;
    position: relative;
    img {
      display: block;
      width: 100%;
      cursor: pointer;
    }
    .custom-indicator {
      position: absolute;
      right: 5rem/@baseFontSize;
      bottom: 5rem/@baseFontSize;
      padding: 2rem/@baseFontSize 5rem/@baseFontSize;
      color: #fff;
      font-size: 20rem/@baseFontSize;
      background: rgba(0, 0, 0, 0.1);
    }
  }
</style>
