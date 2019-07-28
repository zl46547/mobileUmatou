<template>
  <div v-if='adveriseList' id="adverise">
    <Swipe :autoplay="4000" @change="onChange">
      <SwipeItem v-for="k in adveriseList" :key="k.Id">
          <img :src="k.PicUrl" @click="goToIndexAdv(k.JumpValue)">
      </SwipeItem>
      <div class="custom-indicator" slot="indicator">
        {{ current + 1 }}/4
      </div>
    </Swipe>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Swipe, SwipeItem, Toast } from 'vant'
  export default {
    mounted() {
      var vm = this
      vm.getSwiperData()
    },
    components: {
      Swipe,
      SwipeItem
    },
    data() {
      return {
        adveriseList: '',
        current: 0
      }
    },
    methods: {
      onChange(index) {
        this.current = index
      },
      /**
       * 获取轮播图数据
       */
      getSwiperData() {
        var vm = this
        vm.$api({
          method: 'get',
          url: '/home/advertisementPhotoshoot'
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
    position: relative;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      color: #fff;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
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
