<template>
  <div id="menuList">
    <img :src="topCenterInfos[0].ImageUrl" v-if="topCenterInfos"
           @click="goToIndexAdv(topCenterInfos[0].LinkUrls[0])"/>
    <swiper class="swiper" v-if='menuList' :auto="0">
        <swiper-item class="swiper-item">
          <div class="menuList-item" v-for="(item,index) in menuList" :key="item.Name" v-if="index<10" @click="handleSwipoer">
            <img :src="item.URL" mode="aspectFit"/>
            <p class="menuName">{{item.Name}}</p>
          </div>
        </swiper-item>
        <swiper-item class="swiper-item">
          <div class="menuList-item" v-for="(item,index) in menuList" :key="item.Name" v-if="index>=10" @click="handleSwipoer">
            <img :src="item.URL" mode="aspectFit"/>
            <p class="menuName">{{item.Name}}</p>
          </div>
        </swiper-item>
    </swiper>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Swipe, SwipeItem, Toast } from 'mint-ui'
  export default {
    mounted() {
      var vm = this
      vm.getMenuListData()
    },
    components: {
      'swiper': Swipe,
      'swiper-item': SwipeItem
    },
    data() {
      return {
        menuList: '',
        topCenterInfos: ''
      }
    },
    methods: {
      handleSwipoer() {
        Toast({
          message: '该功能暂未开发'
        })
      },
      getMenuListData() {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/shihang/index/command/shortcutIconRequest.json'
        }).then((res) => {
            vm.menuList = res.data.Data.ShortcutIcons
            vm.topCenterInfos = res.data.Data.TopCenterInfos
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * 跳转至广告详情页
       * @param JumpValue
       */
      goToIndexAdv(JumpValue) {
        var vm = this
        if (JumpValue.indexOf('topics') > -1) {
          var queryId = JumpValue.replace('https://wechatx.34580.com/topics/', '')
          vm.$router.push({path: '/indexAdv', query: {queryId}})
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
      font-size: 0.3rem;
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
        font-size: 1.2rem;
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
