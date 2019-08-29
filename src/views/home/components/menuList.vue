<template>
  <div id="menuList">
    <img :src="topCenterInfos[0].ImageUrl" v-if="topCenterInfos"
           @click="goToTopicActivity(topCenterInfos[0].LinkUrls[0])"/>
    <Swipe class="swiper" v-if='menuList' :autoplay="0" :show-indicators="false">
        <SwipeItem class="swiper-item">
          <div class="menuList-item" v-for="(item,index) in menuList" :key="item.Name" v-if="index<10" @click="handleSwipoer(item)">
            <img :src="item.URL" mode="aspectFit"/>
            <p class="menuName">{{item.Name}}</p>
          </div>
        </SwipeItem>
        <SwipeItem class="swiper-item">
          <div class="menuList-item" v-for="(item,index) in menuList" :key="item.Name" v-if="index>=10" @click="handleSwipoer(item)">
            <img :src="item.URL" mode="aspectFit"/>
            <p class="menuName">{{item.Name}}</p>
          </div>
        </SwipeItem>
    </Swipe>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Swipe, SwipeItem, Toast } from 'vant'
  import {getShortcutIcon} from '../service'
  export default {
    mounted() {
      this.getMenuListData()
    },
    components: {
      Swipe,
      SwipeItem
    },
    data() {
      return {
        menuList: '',
        topCenterInfos: ''
      }
    },
    methods: {
      handleSwipoer(swiperItem) {
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
      getMenuListData() {
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
      goToTopicActivity(JumpValue) {
        var vm = this
        if (JumpValue.indexOf('topics') > -1) {
          var queryId = JumpValue.replace('https://wechatx.34580.com/topics/', '')
          vm.$router.push({path: '/topicActivity', query: {queryId}})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #menuList {
    width: 100%;
    max-width: 640px;
    background-color: #fff;
    margin-bottom: 16px;
    text-align: center;
    >img{
      cursor: pointer;
    }
    .swiper {
      height: 180px;
      width: 100%;
      .swiper-item {
        display: flex;
        flex-wrap: wrap;
      }
    }
    .menuList-item {
      width: 20%;
      text-align: center;
      padding: 3% 0;
      img {
        width: 42px;
        height: 42px;
        margin: auto;
        cursor: pointer;
      }
    }
    .menuName {
      width: 100%;
      margin-top: 10px;
      font-size: 1.2rem;
    }
    > img {
      width: 90%;
      background-color: #fff;
      margin-bottom: 8px;
    }
  }
  @media screen and (min-width: 400px) {
    #menuList {
      .swiper {
        height: 200px;
      }
      .menuList-item {
        img {
          width: 50px;
          height: 50px;
        }
      }
      .menuName {
        font-size: 1.3rem;
      }
    }
  }
  @media screen and (min-width: 500px) {
    #menuList {
      .swiper {
        height: 240px;
      }
      .menuList-item {
        img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
</style>
