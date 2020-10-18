<template>
    <div id="menuList">
        <img class="top-center-infos" :src="topCenterInfos[0].ImageUrl"
             v-if="topCenterInfos"
             @click="goToTopicActivity(topCenterInfos[0].LinkUrls[0])"/>
        <Swipe class="swiper"
               v-if='menuList'
               :autoplay="0"
               :show-indicators="false"
        >
            <SwipeItem class="swiper-item">
                <template>
                    <div class="menuList-item"
                         v-for="item in getPreMenuList"
                         :key="item.Name"
                         @click="handleSwipoer(item)"
                    >
                        <img :src="item.URL"/>
                        <p class="menu-name">{{item.Name}}</p>
                    </div>
                </template>
            </SwipeItem>
            <SwipeItem class="swiper-item">
                <div class="menuList-item"
                     v-for="item in getAfterMenuList"
                     :key="item.Name"
                     @click="handleSwipoer(item)"
                >
                    <img :src="item.URL"/>
                    <p class="menu-name">{{item.Name}}</p>
                </div>
            </SwipeItem>
        </Swipe>
    </div>
</template>
<script type="text/ecmascript-6">
  import { Swipe, SwipeItem, Toast } from 'vant'
  import { getShortcutIcon } from '../service'
  import { SCROLL_TOP } from '../../../vuex/types'

  export default {
    mounted () {
      this.getMenuListData()
    },
    computed: {
      getPreMenuList () {
        return this.menuList.filter((item, index) => index < 10)
      },
      getAfterMenuList () {
        return this.menuList.filter((item, index) => index >= 10)
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    data () {
      return {
        menuList: '',
        topCenterInfos: ''
      }
    },
    methods: {
      handleSwipoer (swiperItem) {
        switch (swiperItem.Name) {
          case '每日领券':
            this.$router.push('/getCoupons')
            break
          default:
            Toast({
              message: '该功能暂未开发'
            })
        }
      },
      getMenuListData () {
        getShortcutIcon().then((res) => {
          this.menuList = res.ShortcutIcons
          this.topCenterInfos = res.TopCenterInfos
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 跳转至广告详情页
       * @param JumpValue
       */
      goToTopicActivity (JumpValue) {
        this.$store.commit(SCROLL_TOP, this.$parent.$refs.content.scrollTop)
        if (JumpValue.indexOf('topics') > -1) {
          let queryId = JumpValue.replace('https://wechatx.34580.com/topics/', '')
          this.$router.push({path: '/topicActivity', query: {queryId}})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../../../../../less/variables";

    #menuList {
        width: 100%;
        background-color: #fff;
        margin-bottom: 20rem/@baseFontSize;
        text-align: center;
        .top-center-infos {
            cursor: pointer;
            width: 90%;
            background-color: #fff;
            margin-bottom: 8rem/@baseFontSize;
        }
        .swiper-item {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
        .menuList-item {
            width: 20%;
            text-align: center;
            padding: 3% 0;
            img {
                width: 82rem/@baseFontSize;
                height: 82rem/@baseFontSize;
                margin: auto;
                cursor: pointer;
            }
        }
        .menu-name {
            width: 100%;
            margin-top: 20rem/@baseFontSize;
            font-size: 24rem/@baseFontSize;
        }
    }
</style>
