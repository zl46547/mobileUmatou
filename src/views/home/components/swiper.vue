<template>
  <div v-if='adveriseList' id="adverise">
    <mt-swipe :auto="4000" :interval="4000">
      <mt-swipe-item v-for="k in adveriseList" :key="k.Id">
          <img :src="k.PicUrl" @click="goToIndexAdv(k.JumpValue)">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Swipe, SwipeItem, Toast } from 'mint-ui'
  export default {
    mounted() {
      var vm = this
      vm.getSwiperData()
    },
    components: {
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem
    },
    data() {
      return {
        adveriseList: ''
      }
    },
    methods: {
      /**
       * 获取轮播图数据
       */
      getSwiperData() {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/home/swiper.json'
        }).then((res) => {
          vm.adveriseList = res.data.Data
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
  #adverise {
    width: 100%;
    max-width: 640px;
    height:180px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  @media screen and (min-width: 400px) {
    #adverise {
      height:230px;
    }
  }
  @media screen and (min-width: 500px) {
    #adverise {
      height:280px;
    }
  }
</style>
